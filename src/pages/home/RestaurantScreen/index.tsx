/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React, {useCallback} from 'react';
import {useCollectionOnce, useDocumentData} from 'react-firebase-hooks/firestore';
import {usePagination} from 'react-firebase-pagination-hooks';
import {DetailedPageSkeletonView} from '@components/Ieatta/components/SkeletonViews';
import {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import type {RestartScreenNavigationProps} from '@libs/FirebaseIeatta/helper/RestaurantUtils';
import {getRestaurantID} from '@libs/FirebaseIeatta/helper/RestaurantUtils';
import {defaultSortObject} from '@libs/FirebaseIeatta/review-sort';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {FirebaseReviewQuery} from '@libs/FirebaseIeatta/services/review-query';
import Variables from '@styles/variables';
import type {IFBEvent, IFBRestaurant, IFBReview} from '@src/types/firebase';
import BaseRestaurantScreen from './BaseRestaurantScreen';

// eslint-disable-next-line @typescript-eslint/ban-types
type RestaurantScreenProps = RestartScreenNavigationProps & {};

function RestaurantScreen({route, navigation}: RestaurantScreenProps) {
    const [reviewSortType, setReviewSortType] = React.useState(defaultSortObject.tag);
    // const [reviewSortType, setReviewSortType] = React.useState(SortTag.HIGHEST_RATED);
    const [reviewSearch, setReviewSearch] = React.useState('');

    const restaurantId = getRestaurantID(route);
    /**
     |--------------------------------------------------
     | Single(Restaurant)
     |--------------------------------------------------
     */
    const [restaurant, loadingForRestaurant, errorForRestaurant] = useDocumentData<IFBRestaurant>(
        FirebaseQuery.querySingle({
            path: FBCollections.Restaurants,
            id: restaurantId,
        }),
    );

    /**
     |--------------------------------------------------
     | List(events)
     |--------------------------------------------------
     */
    const [eventSnapshot, loadingForEvents] = useCollectionOnce<IFBEvent>(
        FirebaseQuery.queryEventOrMenuInRestaurant({
            path: FBCollections.Events,
            restaurantId,
        }),
    );

    const events: IFBEvent[] = _.isEmpty(eventSnapshot) ? [] : _.map(eventSnapshot.docs, (item) => item.data());

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

    const reviews: IFBReview[] = _.map(reviewsSnapshot, (item) => item.data() as IFBReview) || [];

    // console.log('');
    // console.log('================================');
    // console.log(`reviews on the web: ${reviews.length}`);
    // console.log('================================');
    // console.log('');

    const onReviewSearchChanged = useCallback((text: string) => {
        setReviewSearch(text);
    }, []);
    const onReviewSortChanged = useCallback((sortType: string) => {
        setReviewSortType(sortType);
    }, []);

    // eslint-disable-next-line rulesdir/prefer-early-return
    const fetchMoreReviews = useCallback(() => {
        if (!loadingMoreReviews && hasMoreReview) {
            loadMoreReviews();
        }
    }, [hasMoreReview, loadMoreReviews, loadingMoreReviews]);

    return (
        <BaseRestaurantScreen
            navigation={navigation}
            route={route}
            restaurantId={restaurantId}
            restaurant={restaurant}
            eventsInRestaurant={{events, loadingForEvents}}
            reviews={reviews}
            shouldShowLoading={loadingForRestaurant}
            loadingContent={<DetailedPageSkeletonView />}
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
            fetchMoreReviews={fetchMoreReviews}
        />
    );
}

RestaurantScreen.displayName = 'RestaurantScreen';

export default RestaurantScreen;
