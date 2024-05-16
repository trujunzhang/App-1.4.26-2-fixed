import {useObject, useQuery} from '@realm/react';
import React, {useCallback, useState} from 'react';
import {ReviewType} from '@libs/Firebase/constant';
import {getRestaurantID} from '@libs/Firebase/helper/RestaurantUtils';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toEventsList, toReviewsList} from '@libs/Realm/helpers/realmTypeHelper';
import Variables from '@styles/variables';
import BaseRestaurantScreen from './BaseRestaurantScreen';
import {defaultProps, propTypes} from './propTypes';

function RestaurantScreen({route, navigation}) {
    const [currentIndex, setCurrentIndex] = useState(Variables.paginationLimitInDetailedReviews);

    const restaurantId = getRestaurantID(route);

    const restaurant = useObject(RealmCollections.Restaurants, restaurantId);

    const events = useQuery(RealmCollections.Events, (array) => {
        return array.filtered('restaurantId == $0', restaurantId);
    });
    const eventsInRestaurant = toEventsList(events);

    const reviewsInRealm = useQuery(RealmCollections.Reviews, (array) => {
        return array.filtered('restaurantId == $0 && reviewType == $1', restaurantId, ReviewType.Restaurant);
    }).slice(0, currentIndex);

    const reviews = toReviewsList(reviewsInRealm);

    // Log.info('');
    // Log.info('================================');
    // Log.info(`reviews: ${reviews.length}`);
    // Log.info(`eventsInRestaurant: ${JSON.stringify(eventsInRestaurant[0])}`)
    // Log.info(`reviewsInRestaurant: ${JSON.stringify(reviews[0])}`);
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
        <BaseRestaurantScreen
            fetchMoreReviews={fetchMoreReviews}
            restaurantId={restaurantId}
            navigation={navigation}
            restaurant={restaurant}
            events={eventsInRestaurant}
            reviews={reviews}
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

RestaurantScreen.propTypes = propTypes;
RestaurantScreen.defaultProps = defaultProps;
RestaurantScreen.displayName = 'RestaurantScreen';

export default RestaurantScreen;
