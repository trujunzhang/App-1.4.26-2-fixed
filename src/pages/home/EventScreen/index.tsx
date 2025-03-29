/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React, {useCallback} from 'react';
import {useCollection, useDocumentData} from 'react-firebase-hooks/firestore';
import {usePagination} from 'react-firebase-pagination-hooks';
import {DetailedPageSkeletonView} from '@components/Ieatta/components/SkeletonViews';
import {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import type {EventScreenNavigationProps} from '@libs/FirebaseIeatta/helper/EventUtils';
import {getEventID} from '@libs/FirebaseIeatta/helper/EventUtils';
import {defaultSortObject} from '@libs/FirebaseIeatta/review-sort';
import {printFirebaseError} from '@libs/FirebaseIeatta/services/firebase-error-helper';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {FirebaseReviewQuery} from '@libs/FirebaseIeatta/services/review-query';
import {toRecipeDictInRestaurant} from '@libs/ieatta/eventUtils';
import Variables from '@styles/variables';
import CONST from '@src/CONST';
import type {IFBEvent, IFBPeopleInEvent, IFBRecipe, IFBRestaurant, IFBReview} from '@src/types/firebase';
import BaseEventScreen from './BaseEventScreen';

// eslint-disable-next-line @typescript-eslint/ban-types
type EventScreenProps = EventScreenNavigationProps & {};

function EventScreen({route, navigation}: EventScreenProps) {
    const [reviewSortType, setReviewSortType] = React.useState(defaultSortObject.tag);
    const [reviewSearch, setReviewSearch] = React.useState('');

    /**
     |--------------------------------------------------
     | Single(Event)
     |--------------------------------------------------
     */
    const eventId = getEventID(route);
    const [event, loadingForEvent, errorForEvent] = useDocumentData<IFBEvent>(
        FirebaseQuery.querySingle({
            path: FBCollections.Events,
            id: eventId,
        }),
    );
    printFirebaseError(FBCollections.Events, errorForEvent);
    /**
     |--------------------------------------------------
     | Single(Restaurant)
     |--------------------------------------------------
     */
    const restaurantId = event !== undefined ? event.restaurantId : CONST.IEATTA_MODEL_ID_EMPTY;
    const [restaurant, loadingForRestaurant, errorForRestaurant] = useDocumentData<IFBRestaurant>(
        FirebaseQuery.querySingle({
            path: FBCollections.Restaurants,
            id: restaurantId,
        }),
    );
    printFirebaseError(FBCollections.Restaurants, errorForRestaurant);

    /**
     |--------------------------------------------------
     | List(recipes)
     |--------------------------------------------------
     */
    const [recipesSnapshot, loadingForRecipes, errorForRecipes] = useCollection(
        FirebaseQuery.queryEventOrMenuInRestaurant({
            path: FBCollections.Recipes,
            restaurantId,
        }),
    );
    printFirebaseError(FBCollections.Recipes, errorForRecipes);

    const recipesInRestaurant = recipesSnapshot === undefined ? [] : _.map(recipesSnapshot.docs, (item) => item.data() as IFBRecipe);
    const recipeDictInRestaurant = toRecipeDictInRestaurant(recipesInRestaurant);

    /**
     |--------------------------------------------------
     | List(PeopleInEvents)
     |--------------------------------------------------
     */
    const [peopleInEventsSnapshot, loadingForPeopleInEvents, errorForPeopleInEvents] = useCollection<IFBPeopleInEvent>(
        FirebaseQuery.queryForPeopleInEvents({
            restaurantId,
            eventId,
        }),
    );
    printFirebaseError(FBCollections.PeopleInEvent, errorForPeopleInEvents);

    const peopleInEvents = peopleInEventsSnapshot === undefined ? [] : _.map(peopleInEventsSnapshot.docs, (item) => item.data() as unknown as IFBPeopleInEvent);

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

    printFirebaseError(FBCollections.Reviews, errorForReviews);

    const reviews = _.map(reviewsSnapshot, (item) => item.data() as IFBReview) || [];

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
        <BaseEventScreen
            route={route}
            navigation={navigation}
            fetchMoreReviews={fetchMoreReviews}
            eventId={eventId}
            restaurant={restaurant}
            event={event}
            recipeDictInRestaurant={recipeDictInRestaurant}
            peopleInEvents={peopleInEvents}
            reviews={reviews}
            shouldShowLoading={loadingForEvent}
            loadingContent={<DetailedPageSkeletonView />}
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

EventScreen.displayName = 'EventScreen';

export default EventScreen;
