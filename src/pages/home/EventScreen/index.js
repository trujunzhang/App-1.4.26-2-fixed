import React, {useCallback, useState} from 'react';
import {useCollection, useCollectionOnce, useDocumentData} from 'react-firebase-hooks/firestore';
import {usePagination} from 'react-firebase-pagination-hooks';
import _ from 'underscore';
import ReportActionsSkeletonView from '@components/ReportActionsSkeletonView';
import {FBCollections, ReviewType} from '@libs/Firebase/constant';
import {getEventID} from '@libs/Firebase/helper/EventUtils';
import {defaultSortObject} from '@libs/Firebase/review-sort';
import {queryEventOrMenuInRestaurant, queryForPeopleInEvents, querySingle} from '@libs/Firebase/services/firebase-query';
import {FirebaseReviewQuery} from '@libs/Firebase/services/review-query';
import {toRecipeDictInRestaurant} from '@libs/ieatta/eventUtils';
import Variables from '@styles/variables';
import CONST from '@src/CONST';
import BaseEventScreen from './BaseEventScreen';
import {defaultProps, propTypes} from './propTypes';

function EventScreen({route, navigation, isSidebarLoaded}) {
    const [reviewSortType, setReviewSortType] = React.useState(defaultSortObject.tag);
    const [reviewSearch, setReviewSearch] = React.useState('');

    /**
     |--------------------------------------------------
     | Single(Event)
     |--------------------------------------------------
     */
    const eventId = getEventID(route);
    const [event, loadingForEvent, errorForEvent] = useDocumentData(
        querySingle({
            path: FBCollections.Events,
            id: eventId,
        }),
    );
    /**
     |--------------------------------------------------
     | Single(Restaurant)
     |--------------------------------------------------
     */
    const restaurantId = event !== undefined ? event.restaurantId : CONST.IEATTA_MODEL_ID_EMPTY;
    const [restaurant, loadingForRestaurant, errorForRestaurant] = useDocumentData(
        querySingle({
            path: FBCollections.Restaurants,
            id: restaurantId,
        }),
    );

    /**
     |--------------------------------------------------
     | List(recipes)
     |--------------------------------------------------
     */
    const [recipesSnapshot, loader] = useCollectionOnce(
        queryEventOrMenuInRestaurant({
            path: FBCollections.Recipes,
            restaurantId,
        }),
    );

    const recipesInRestaurant = recipesSnapshot === undefined ? [] : _.map(recipesSnapshot.docs, (item) => item.data());
    const recipeDictInRestaurant = toRecipeDictInRestaurant(recipesInRestaurant);

    /**
     |--------------------------------------------------
     | List(PeopleInEvents)
     |--------------------------------------------------
     */
    const [peopleInEventsSnapshot] = useCollection(
        queryForPeopleInEvents({
            restaurantId,
            eventId,
        }),
    );

    const peopleInEvents = peopleInEventsSnapshot === undefined ? [] : _.map(peopleInEventsSnapshot.docs, (item) => item.data());

    /**
     |--------------------------------------------------
     | List(reviews)
     |--------------------------------------------------
     */
    const reviewQuery = React.useCallback(() => {
        return new FirebaseReviewQuery({
            relatedId: eventId,
            reviewType: ReviewType.Event,
            reviewSortType,
            reviewSearch,
        }).buildForReview();
    }, [eventId, reviewSortType, reviewSearch]);

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
        <BaseEventScreen
            fetchMoreReviews={fetchMoreReviews}
            eventId={eventId}
            navigation={navigation}
            restaurant={restaurant}
            event={event}
            recipeDictInRestaurant={recipeDictInRestaurant}
            peopleInEvents={peopleInEvents}
            reviews={reviews}
            shouldShowLoading={loadingForEvent}
            loadingContent={<ReportActionsSkeletonView />}
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

EventScreen.propTypes = propTypes;
EventScreen.defaultProps = defaultProps;
EventScreen.displayName = 'EventScreen';

export default EventScreen;
