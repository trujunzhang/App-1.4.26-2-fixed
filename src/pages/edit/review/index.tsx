/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {StackScreenProps} from '@react-navigation/stack';
import lodashGet from 'lodash/get';
import React from 'react';
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {emptyReviewTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBReview} from '@src/types/firebase';
import BaseEditReviewPage from './BaseEditReviewPage';

type EditReviewNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.REVIEW>;

// eslint-disable-next-line @typescript-eslint/ban-types
type EditReviewPageProps = EditReviewNavigationProps & {};

function EditReviewPage(props: EditReviewPageProps) {
    const reviewId = lodashGet(props.route, 'params.reviewId', emptyReviewTag);
    const relatedId = lodashGet(props.route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const reviewType = lodashGet(props.route, 'params.reviewType', ReviewType.Unknown);
    /**
      |--------------------------------------------------
      | Single(Review)
      |--------------------------------------------------
      */
    const [review, loadingForReview, errorForReview] = useDocumentDataOnce<IFBReview>(
        FirebaseQuery.querySingle({
            path: FBCollections.Reviews,
            id: reviewId,
        }),
    );

    return (
        <BaseEditReviewPage
            key={lodashGet(review, 'uniqueId', emptyReviewTag)}
            review={review}
            relatedId={relatedId}
            reviewType={reviewType}
            isNewModel={reviewId === CONST.IEATTA_EDIT_MODEL_NEW}
        />
    );
}

EditReviewPage.displayName = 'EditReviewPage';

export default EditReviewPage;
