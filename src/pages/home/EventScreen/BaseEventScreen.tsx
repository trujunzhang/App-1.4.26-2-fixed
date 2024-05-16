/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line no-restricted-imports
import type {NavigationProp} from '@react-navigation/native';
import React, {useMemo} from 'react';
import _ from 'underscore';
import DetailedPageData from '@components/Ieatta/detailedPage/DetailedPageData';
import {usePersonalDetails} from '@components/OnyxProvider';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {buildEventRows} from '@libs/Firebase/list/builder/event';
import type {IReviewOnSearchAndSortChanged} from '@libs/Firebase/list/types/rows/review';
import type {RootStackParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type {IFBEvent, IFBPeopleInEvent, IFBRecipe, IFBRestaurant, IFBReview} from '@src/types/firebase';

type BaseEventScreenProps = IReviewOnSearchAndSortChanged & {
    fetchMoreReviews: () => void;
    eventId: string;
    event: IFBEvent;
    restaurant: IFBRestaurant | undefined;
    recipeDictInRestaurant: Record<string, IFBRecipe>;
    peopleInEvents: IFBPeopleInEvent[];
    reviews: IFBReview[];
    navigation: NavigationProp<RootStackParamList>;
    shouldShowLoading?: boolean;
    loadingContent?: React.ReactNode;
};

// eslint-disable-next-line react/prop-types
function BaseEventScreen({
    fetchMoreReviews,
    eventId,
    event,
    restaurant,
    recipeDictInRestaurant,
    peopleInEvents,
    reviews,
    navigation,
    shouldShowLoading = false,
    loadingContent = null,
    onReviewSortChanged,
    onReviewSearchChanged,
}: BaseEventScreenProps) {
    const personalDetails = usePersonalDetails() ?? CONST.EMPTY_OBJECT;
    const {isSmallScreenWidth} = useWindowDimensions();

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundPage = _.isUndefined(event) && !shouldShowLoading;

    const rowsData = useMemo(
        () =>
            buildEventRows(isSmallScreenWidth, {
                personalDetails,
                eventId,
                event,
                restaurant,
                recipeDictInRestaurant,
                peopleInEvents,
                reviews,
                reviewChanged: {
                    onReviewSortChanged,
                    onReviewSearchChanged,
                },
            }),
        [isSmallScreenWidth, personalDetails, eventId, event, restaurant, recipeDictInRestaurant, peopleInEvents, reviews, onReviewSortChanged, onReviewSearchChanged],
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

export default BaseEventScreen;

BaseEventScreen.displayName = 'BaseEventScreen';
