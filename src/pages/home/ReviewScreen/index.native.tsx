/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {useObject, useQuery} from '@realm/react';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useCallback, useState} from 'react';
import {ReviewType} from '@libs/FirebaseIeatta/constant';
import type {RestartScreenNavigationProps} from '@libs/FirebaseIeatta/helper/RestaurantUtils';
import {getRestaurantID} from '@libs/FirebaseIeatta/helper/RestaurantUtils';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import Variables from '@styles/variables';
import CONST from '@src/CONST';
import type {IFBEvent, IFBRestaurant, IFBReview} from '@src/types/firebase';
import BaseReviewScreen from './BaseReviewScreen';
import type {ReviewsListNavigationProps} from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
type ReviewScreenProps = ReviewsListNavigationProps & {};

function ReviewScreen({route, navigation}: ReviewScreenProps) {
    const relatedId = lodashGet(route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const reviewType = lodashGet(route, 'params.reviewType', ReviewType.Unknown);

    const [currentIndex, setCurrentIndex] = useState<number>(Variables.paginationLimitInDetailedReviews);

    const reviewsInRealm = useQuery(RealmCollections.Reviews, RealmQuery.queryForRealmReviews({relatedId, reviewType})).slice(0, currentIndex);

    const reviews: IFBReview[] = toRealmModelList<IFBReview>(reviewsInRealm);

    // Log.info('');
    // Log.info('================================');
    // Log.info(`reviews: ${reviews.length}`);
    // Log.info(`eventsInRestaurant: ${JSON.stringify(eventsInRestaurant[0])}`)
    // Log.info(`reviewsInRestaurant: ${JSON.stringify(reviews[0])}`);
    // Log.info('================================');
    // Log.info('');

    const fetchMoreReviews = useCallback(() => {
        setCurrentIndex((prevIndex: number) => {
            return prevIndex + Variables.paginationLimitInDetailedReviews;
        });
    }, []);

    return (
        <BaseReviewScreen
            key={reviewType + relatedId}
            navigation={navigation}
            route={route}
            relatedId={relatedId}
            reviewType={reviewType}
            reviews={reviews}
            fetchMoreReviews={fetchMoreReviews}
        />
    );
}

ReviewScreen.displayName = 'ReviewScreen';

export default ReviewScreen;
