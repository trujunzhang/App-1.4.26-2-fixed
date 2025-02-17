/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {StackScreenProps} from '@react-navigation/stack';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useCallback} from 'react';
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import {usePagination} from 'react-firebase-pagination-hooks';
import {DetailedPageSkeletonView} from '@components/Ieatta/components/SkeletonViews';
import {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {FirebaseReviewQuery} from '@libs/FirebaseIeatta/services/review-query';
import {emptyReviewTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import Variables from '@styles/variables';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBReview} from '@src/types/firebase';
import BaseReviewScreen from './BaseReviewScreen';
import type {ReviewsListNavigationProps} from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
type ReviewScreenProps = ReviewsListNavigationProps & {};

function ReviewScreen({route, navigation}: ReviewScreenProps) {
    const relatedId = lodashGet(route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const reviewType = lodashGet(route, 'params.reviewType', ReviewType.Unknown);

    /**
     |--------------------------------------------------
     | List(reviews)
     |--------------------------------------------------
     */
    const reviewQuery = React.useCallback(() => {
        return new FirebaseReviewQuery({
            relatedId,
            reviewType,
        }).buildForReview();
    }, [relatedId, reviewType]);

    const [reviewsSnapshot, {loaded: loadedReviews, loadingMore: loadingMoreReviews, hasMore: hasMoreReview, loadMore: loadMoreReviews}, errorForReviews] = usePagination(reviewQuery(), {
        limit: Variables.paginationLimitInDetailedReviews,
    });

    const reviews: IFBReview[] = _.map(reviewsSnapshot, (item) => item.data() as IFBReview) || [];

    // console.log('');
    // console.log('================================');
    // console.log(`reviews on the web: ${reviews.length}`);
    // console.log('================================');
    // console.log('');

    // eslint-disable-next-line rulesdir/prefer-early-return
    const fetchMoreReviews = useCallback(() => {
        if (!loadingMoreReviews && hasMoreReview) {
            loadMoreReviews();
        }
    }, [hasMoreReview, loadMoreReviews, loadingMoreReviews]);

    return (
        <BaseReviewScreen
            key={reviewType + relatedId}
            navigation={navigation}
            route={route}
            relatedId={relatedId}
            reviewType={reviewType}
            reviews={reviews}
            shouldShowLoading={!loadedReviews}
            loadingContent={<DetailedPageSkeletonView />}
            fetchMoreReviews={fetchMoreReviews}
        />
    );
}

ReviewScreen.displayName = 'ReviewScreen';

export default ReviewScreen;
