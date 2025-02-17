/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import React, {useMemo} from 'react';
import DetailedPageLayout from '@components/Ieatta/detailedPage/DetailedPageLayout';
import {usePersonalDetails} from '@components/OnyxProvider';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import {buildReviews} from '@libs/FirebaseIeatta/list/builder/review';
import CONST from '@src/CONST';
import type {IFBEvent, IFBPeopleInEvent, IFBRecipe, IFBRestaurant, IFBReview} from '@src/types/firebase';
import type {ReviewsListNavigationProps} from './types';

type BaseReviewScreenProps = ReviewsListNavigationProps & {
    fetchMoreReviews: () => void;
    relatedId: string;
    reviewType: string;
    reviews: IFBReview[];
    shouldShowLoading?: boolean;
    loadingContent?: React.ReactNode;
};

// eslint-disable-next-line react/prop-types
function BaseReviewScreen({navigation, fetchMoreReviews, relatedId, reviewType, reviews, shouldShowLoading = false, loadingContent = null}: BaseReviewScreenProps) {
    const personalDetails = usePersonalDetails() ?? CONST.EMPTY_OBJECT;
    const {isSmallScreenWidth} = useResponsiveLayout();

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundPage = false;

    const rowsData = useMemo(
        () =>
            buildReviews(isSmallScreenWidth, {
                shownAsReviewList: true,
                relatedId,
                reviewType,
                reviews,
            }),
        [isSmallScreenWidth, relatedId, reviewType, reviews],
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

export default BaseReviewScreen;

BaseReviewScreen.displayName = 'BaseReviewScreen';
