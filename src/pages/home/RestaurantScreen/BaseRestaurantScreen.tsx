import type {NavigationProp} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {clearTestState} from 'realm';
// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import DetailedPageData from '@components/Ieatta/detailedPage/DetailedPageData';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {buildRestaurantRows} from '@libs/Firebase/list/builder/restaurant';
import type {IReviewOnSearchAndSortChanged} from '@libs/Firebase/list/types/rows/review';
import type {RootStackParamList} from '@libs/Navigation/types';
import type {IFBEvent, IFBRestaurant, IFBReview} from '@src/types/firebase';

type BaseRestaurantScreenProps = IReviewOnSearchAndSortChanged & {
    fetchMoreReviews: () => void;
    restaurantId: string;
    restaurant: IFBRestaurant | undefined;
    events: IFBEvent[];
    reviews: IFBReview[];
    navigation: NavigationProp<RootStackParamList>;
    shouldShowLoading?: boolean;
    loadingContent?: React.ReactNode;
};

// eslint-disable-next-line react/prop-types
function BaseRestaurantScreen({
    fetchMoreReviews,
    restaurantId,
    restaurant,
    events,
    reviews,
    navigation,
    shouldShowLoading = false,
    loadingContent = null,
    onReviewSortChanged,
    onReviewSearchChanged,
}: BaseRestaurantScreenProps) {
    const {isSmallScreenWidth} = useWindowDimensions();

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundPage = _.isUndefined(restaurant) && !shouldShowLoading;

    const rowsData = useMemo(
        () =>
            buildRestaurantRows(isSmallScreenWidth, {
                restaurantId,
                restaurant,
                events,
                reviews,
                reviewChanged: {
                    onReviewSortChanged,
                    onReviewSearchChanged,
                },
            }),
        [isSmallScreenWidth, restaurantId, restaurant, events, reviews, onReviewSortChanged, onReviewSearchChanged],
    );

    return (
        <DetailedPageData
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
