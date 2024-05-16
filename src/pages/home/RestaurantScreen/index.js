import React, {useCallback, useState} from 'react';
import {useCollectionOnce, useDocumentData} from 'react-firebase-hooks/firestore';
import {usePagination} from 'react-firebase-pagination-hooks';
import _ from 'underscore';
import ReportActionsSkeletonView from '@components/ReportActionsSkeletonView';
import {FBCollections, ReviewType} from '@libs/Firebase/constant';
import {getRestaurantID} from '@libs/Firebase/helper/RestaurantUtils';
import {defaultSortObject, SortTag} from '@libs/Firebase/review-sort';
import {queryEventOrMenuInRestaurant, querySingle} from '@libs/Firebase/services/firebase-query';
import {FirebaseReviewQuery} from '@libs/Firebase/services/review-query';
import Variables from '@styles/variables';
import BaseRestaurantScreen from './BaseRestaurantScreen';
import {defaultProps, propTypes} from './propTypes';

function RestaurantScreen({route, navigation, isSidebarLoaded}) {
    const [reviewSortType, setReviewSortType] = React.useState(defaultSortObject.tag);
    // const [reviewSortType, setReviewSortType] = React.useState(SortTag.HIGHEST_RATED);
    const [reviewSearch, setReviewSearch] = React.useState('');

    const restaurantId = getRestaurantID(route);
    /**
     |--------------------------------------------------
     | Single(Restaurant)
     |--------------------------------------------------
     */
    const [restaurant, loadingForRestaurant, errorForRestaurant] = useDocumentData(
        querySingle({
            path: FBCollections.Restaurants,
            id: restaurantId,
        }),
    );

    /**
     |--------------------------------------------------
     | List(events)
     |--------------------------------------------------
     */
    const [eventSnapshot, loader] = useCollectionOnce(
        queryEventOrMenuInRestaurant({
            path: FBCollections.Events,
            restaurantId,
        }),
    );

    const events = _.isEmpty(eventSnapshot) ? [] : _.map(eventSnapshot.docs, (item) => item.data());

    /**
     |--------------------------------------------------
     | List(reviews)
     |--------------------------------------------------
     */
    const reviewQuery = React.useCallback(() => {
        return new FirebaseReviewQuery({
            relatedId: restaurantId,
            reviewType: ReviewType.Restaurant,
            reviewSortType,
            reviewSearch,
        }).buildForReview();
    }, [restaurantId, reviewSortType, reviewSearch]);

    const [reviewsSnapshot, {loaded, loadingMore: loadingMoreReviews, hasMore: hasMoreReview, loadMore: loadMoreReviews}, errorForReviews] = usePagination(reviewQuery(), {
        limit: Variables.paginationLimitInDetailedReviews,
    });

    const reviews = _.map(reviewsSnapshot, (item) => item.data()) || [];

    // console.log('');
    // console.log('================================');
    // console.log(`reviews on the web: ${reviews.length}`);
    // console.log('================================');
    // console.log('');

    const onReviewSearchChanged = useCallback((text) => {
        setReviewSearch(text);
    }, []);
    const onReviewSortChanged = useCallback((sortType) => {
        setReviewSortType(sortType);
    }, []);

    // eslint-disable-next-line rulesdir/prefer-early-return
    const fetchMoreReviews = useCallback(() => {
        if (loadingMoreReviews === false && hasMoreReview) {
            loadMoreReviews();
        }
    }, [hasMoreReview, loadMoreReviews, loadingMoreReviews]);

    return (
        <BaseRestaurantScreen
            fetchMoreReviews={fetchMoreReviews}
            restaurantId={restaurantId}
            navigation={navigation}
            restaurant={restaurant}
            events={events}
            reviews={reviews}
            shouldShowLoading={loadingForRestaurant}
            loadingContent={<ReportActionsSkeletonView />}
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

RestaurantScreen.propTypes = propTypes;
RestaurantScreen.defaultProps = defaultProps;
RestaurantScreen.displayName = 'RestaurantScreen';

export default RestaurantScreen;
