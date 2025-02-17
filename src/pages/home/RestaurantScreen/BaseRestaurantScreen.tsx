// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import React, {useMemo} from 'react';
import DetailedPageLayout from '@components/Ieatta/detailedPage/DetailedPageLayout';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import type {RestartScreenNavigationProps} from '@libs/FirebaseIeatta/helper/RestaurantUtils';
import type {BuildEventsInRestaurantParams} from '@libs/FirebaseIeatta/list/builder/restaurant';
import {buildRestaurantRows} from '@libs/FirebaseIeatta/list/builder/restaurant';
import type {IReviewOnSearchAndSortChanged} from '@libs/FirebaseIeatta/list/types/rows/review';
import type {IFBRestaurant, IFBReview} from '@src/types/firebase';

type BaseRestaurantScreenProps = RestartScreenNavigationProps &
    IReviewOnSearchAndSortChanged & {
        fetchMoreReviews: () => void;
        restaurantId: string;
        restaurant: IFBRestaurant | undefined;
        // events: IFBEvent[];
        eventsInRestaurant: BuildEventsInRestaurantParams;
        reviews: IFBReview[];
        shouldShowLoading?: boolean;
        loadingContent?: React.ReactNode;
    };

function BaseRestaurantScreen({
    navigation,
    fetchMoreReviews,
    restaurantId,
    restaurant,
    // events,
    eventsInRestaurant,
    reviews,
    shouldShowLoading = false,
    loadingContent = null,
    onReviewSortChanged,
    onReviewSearchChanged,
}: BaseRestaurantScreenProps) {
    const {isSmallScreenWidth} = useResponsiveLayout();

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundPage = _.isUndefined(restaurant) && !shouldShowLoading;

    const rowsData = useMemo(
        () =>
            buildRestaurantRows(isSmallScreenWidth, {
                restaurantId,
                restaurant,
                // events,
                eventsInRestaurant,
                reviews,
                reviewChanged: {
                    onReviewSortChanged,
                    onReviewSearchChanged,
                },
            }),
        [isSmallScreenWidth, restaurantId, restaurant, eventsInRestaurant, reviews, onReviewSortChanged, onReviewSearchChanged],
    );

    return (
        <DetailedPageLayout
            shouldShowNotFoundPage={shouldShowNotFoundPage}
            rowsData={rowsData}
            fetchMoreReviews={fetchMoreReviews}
            navigation={navigation}
            shouldShowLoading={shouldShowLoading}
            loadingContent={loadingContent}
        />
    );
}

export default BaseRestaurantScreen;
BaseRestaurantScreen.displayName = 'BaseRestaurantScreen';
