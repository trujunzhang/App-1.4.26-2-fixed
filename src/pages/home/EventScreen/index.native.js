import {useObject, useQuery} from '@realm/react';
import React, {useCallback, useState} from 'react';
import {ReviewType} from '@libs/Firebase/constant';
import {getEventID} from '@libs/Firebase/helper/EventUtils';
import {toRecipeDictInRestaurant} from '@libs/ieatta/eventUtils';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toPeopleInEventsList, toRecipesList, toReviewsList} from '@libs/Realm/helpers/realmTypeHelper';
import Variables from '@styles/variables';
import CONST from '@src/CONST';
import BaseEventScreen from './BaseEventScreen';
import {defaultProps, propTypes} from './propTypes';

function EventScreen({route, navigation, isSidebarLoaded}) {
    const [currentIndex, setCurrentIndex] = useState(Variables.paginationLimitInDetailedReviews);

    /**
   |--------------------------------------------------
   | Single(Event)
   |--------------------------------------------------
   */
    const eventId = getEventID(route);
    const event = useObject(RealmCollections.Events, eventId);

    /**
   |--------------------------------------------------
   | Single(Restaurant)
   |--------------------------------------------------
   */
    const restaurantId = event !== undefined ? event.restaurantId : CONST.IEATTA_MODEL_ID_EMPTY;
    const restaurant = useObject(RealmCollections.Restaurants, restaurantId);

    /**
    |--------------------------------------------------
    | List(PeopleInEvents)
    |--------------------------------------------------
    */
    const peopleInEventsInRealm = useQuery(RealmCollections.PeopleInEvent, (array) => {
        return array.filtered('restaurantId == $0 && eventId == $1', restaurantId, eventId);
    });
    const peopleInEvents = toPeopleInEventsList(peopleInEventsInRealm);

    /**
   |--------------------------------------------------
   | List(recipes)
   |--------------------------------------------------
   */
    const recipesInRestaurantInRealm = useQuery(RealmCollections.Recipes, (array) => {
        return array.filtered('restaurantId == $0', restaurantId);
    });

    const recipesInRestaurant = toRecipesList(recipesInRestaurantInRealm);
    const recipeDictInRestaurant = toRecipeDictInRestaurant(recipesInRestaurant);

    /**
   |--------------------------------------------------
   | List(reviews)
   |--------------------------------------------------
   */
    const reviewsInRealm = useQuery(RealmCollections.Reviews, (array) => {
        return array.filtered('eventId  == $0 && reviewType == $1', eventId, ReviewType.Event);
    }).slice(0, currentIndex);

    const reviews = toReviewsList(reviewsInRealm);

    // Log.info('');
    // Log.info('================================');
    // Log.info(`reviews: ${reviews.length}`);
    // Log.info(`eventsInEvent: ${JSON.stringify(eventsInEvent[0])}`)
    // Log.info(`reviewsInEvent: ${JSON.stringify(reviews[0])}`);
    // Log.info('================================');
    // Log.info('');

    const onReviewSearchChanged = useCallback((text) => {}, []);
    const onReviewSortChanged = useCallback((sortType) => {}, []);
    const fetchMoreReviews = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            return prevIndex + Variables.paginationLimitInDetailedReviews;
        });
    }, []);

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
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

EventScreen.propTypes = propTypes;
EventScreen.defaultProps = defaultProps;
EventScreen.displayName = 'EventScreen';

export default EventScreen;
