import {useObject, useQuery} from '@realm/react';
import _ from 'lodash';
import React, {useCallback, useState} from 'react';
import {ReviewType} from '@libs/Firebase/constant';
import type {RestartScreenNavigationProps} from '@libs/Firebase/helper/RestaurantUtils';
import {getRestaurantID} from '@libs/Firebase/helper/RestaurantUtils';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import Variables from '@styles/variables';
import type {IFBEvent, IFBRestaurant, IFBReview} from '@src/types/firebase';
import BaseRestaurantScreen from './BaseRestaurantScreen';

// eslint-disable-next-line @typescript-eslint/ban-types
type RestaurantScreenProps = RestartScreenNavigationProps & {};

function RestaurantScreen({route, navigation}: RestaurantScreenProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(Variables.paginationLimitInDetailedReviews);

    const restaurantId = getRestaurantID(route);

    const restaurantInRealm = useObject<IFBRestaurant>(RealmCollections.Restaurants, restaurantId);
    const restaurant: IFBRestaurant | undefined = _.isNull(restaurantInRealm) === false ? (restaurantInRealm as IFBRestaurant) : undefined;

    const events = useQuery<IFBEvent[]>(RealmCollections.Events, (array) => {
        return array.filtered('restaurantId == $0', restaurantId);
    });
    const eventsInRestaurant: IFBEvent[] = toRealmModelList<IFBEvent>(events);

    const reviewsInRealm = useQuery(RealmCollections.Reviews, (array) => {
        return array.filtered('restaurantId == $0 && reviewType == $1', restaurantId, ReviewType.Restaurant);
    }).slice(0, currentIndex);

    const reviews: IFBReview[] = toRealmModelList<IFBReview>(reviewsInRealm);

    // Log.info('');
    // Log.info('================================');
    // Log.info(`reviews: ${reviews.length}`);
    // Log.info(`eventsInRestaurant: ${JSON.stringify(eventsInRestaurant[0])}`)
    // Log.info(`reviewsInRestaurant: ${JSON.stringify(reviews[0])}`);
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
        <BaseRestaurantScreen
            navigation={navigation}
            route={route}
            fetchMoreReviews={fetchMoreReviews}
            restaurantId={restaurantId}
            restaurant={restaurant}
            eventsInRestaurant={{events: eventsInRestaurant, loadingForEvents: false}}
            reviews={reviews}
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

RestaurantScreen.displayName = 'RestaurantScreen';

export default RestaurantScreen;
