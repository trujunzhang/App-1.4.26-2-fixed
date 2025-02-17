/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import React, {useMemo} from 'react';
import DetailedPageLayout from '@components/Ieatta/detailedPage/DetailedPageLayout';
import {usePersonalDetails} from '@components/OnyxProvider';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import type {EventScreenNavigationProps} from '@libs/FirebaseIeatta/helper/EventUtils';
import {buildEventRows} from '@libs/FirebaseIeatta/list/builder/event';
import type {IReviewOnSearchAndSortChanged} from '@libs/FirebaseIeatta/list/types/rows/review';
import CONST from '@src/CONST';
import type {IFBEvent, IFBPeopleInEvent, IFBRecipe, IFBRestaurant, IFBReview} from '@src/types/firebase';

type BaseEventScreenProps = EventScreenNavigationProps &
    IReviewOnSearchAndSortChanged & {
        fetchMoreReviews: () => void;
        eventId: string;
        event: IFBEvent | undefined;
        restaurant: IFBRestaurant | undefined;
        recipeDictInRestaurant: Record<string, IFBRecipe>;
        peopleInEvents: IFBPeopleInEvent[];
        reviews: IFBReview[];
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
    const {isSmallScreenWidth} = useResponsiveLayout();

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

export default BaseEventScreen;

BaseEventScreen.displayName = 'BaseEventScreen';
