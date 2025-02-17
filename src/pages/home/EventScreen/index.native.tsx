/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {useObject, useQuery} from '@realm/react';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React, {useCallback, useState} from 'react';
import {ReviewType} from '@libs/FirebaseIeatta/constant';
import type {EventScreenNavigationProps} from '@libs/FirebaseIeatta/helper/EventUtils';
import {getEventID} from '@libs/FirebaseIeatta/helper/EventUtils';
import {toRecipeDictInRestaurant} from '@libs/ieatta/eventUtils';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import Variables from '@styles/variables';
import CONST from '@src/CONST';
import type {IFBEvent, IFBPeopleInEvent, IFBRecipe, IFBRestaurant, IFBReview} from '@src/types/firebase';
import BaseEventScreen from './BaseEventScreen';

// eslint-disable-next-line @typescript-eslint/ban-types
type EventScreenProps = EventScreenNavigationProps & {};

function EventScreen({route, navigation}: EventScreenProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(Variables.paginationLimitInDetailedReviews);

    /**
     |--------------------------------------------------
     | Single(Event)
     |--------------------------------------------------
     */
    const eventId = getEventID(route);
    const eventInRealm = useObject<IFBEvent>(RealmCollections.Events, eventId);
    const event: IFBEvent | undefined = _.isNull(eventInRealm) === false ? (eventInRealm as IFBEvent) : undefined;

    /**
     |--------------------------------------------------
     | Single(Restaurant)
     |--------------------------------------------------
     */
    const restaurantId = event !== undefined ? event.restaurantId : CONST.IEATTA_MODEL_ID_EMPTY;
    const restaurantInRealm = useObject<IFBRestaurant>(RealmCollections.Restaurants, restaurantId);
    const restaurant: IFBRestaurant | undefined = _.isNull(restaurantInRealm) === false ? (restaurantInRealm as IFBRestaurant) : undefined;

    /**
     |--------------------------------------------------
     | List(PeopleInEvents)
     |--------------------------------------------------
     */
    const peopleInEventsInRealm = useQuery<IFBPeopleInEvent>(
        RealmCollections.PeopleInEvent,
        (array) => {
            return array.filtered('restaurantId == $0 && eventId == $1', restaurantId, eventId);
        },
        [restaurantId, eventId],
    );
    const peopleInEvents: IFBPeopleInEvent[] = toRealmModelList<IFBPeopleInEvent>(peopleInEventsInRealm);

    /**
     |--------------------------------------------------
     | List(recipes)
     |--------------------------------------------------
     */
    const recipesInRestaurantInRealm = useQuery<IFBRecipe>(
        RealmCollections.Recipes,
        (array) => {
            return array.filtered('restaurantId == $0', restaurantId);
        },
        [restaurantId],
    );

    const recipesInRestaurant: IFBRecipe[] = toRealmModelList<IFBRecipe>(recipesInRestaurantInRealm);
    const recipeDictInRestaurant = toRecipeDictInRestaurant(recipesInRestaurant);

    /**
     |--------------------------------------------------
     | List(reviews)
     |--------------------------------------------------
     */
    const reviewsInRealm = useQuery<IFBReview>(RealmCollections.Reviews, RealmQuery.queryForRealmReviews({relatedId: eventId, reviewType: ReviewType.Event})).slice(0, currentIndex);

    const reviews: IFBReview[] = toRealmModelList<IFBReview>(reviewsInRealm);

    // Log.info('');
    // Log.info('================================');
    // Log.info(`reviews: ${reviews.length}`);
    // Log.info(`eventsInEvent: ${JSON.stringify(eventsInEvent[0])}`)
    // Log.info(`reviewsInEvent: ${JSON.stringify(reviews[0])}`);
    // Log.info('================================');
    // Log.info('');

    const onReviewSearchChanged = useCallback((text: string) => {}, []);
    const onReviewSortChanged = useCallback((sortType: string) => {}, []);
    const fetchMoreReviews = useCallback(() => {
        setCurrentIndex((prevIndex: number) => {
            return prevIndex + Variables.paginationLimitInDetailedReviews;
        });
    }, []);

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
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

EventScreen.displayName = 'EventScreen';

export default EventScreen;
