import type {StackScreenProps} from '@react-navigation/stack';
import {useObject} from '@realm/react';
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {ReviewType} from '@libs/Firebase/constant';
import {emptyReviewTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBReview} from '@src/types/firebase';
import BaseEditReviewPage from './BaseEditReviewPage';

type EditReviewNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.REVIEW>;

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
    const reviewInRealm = useObject<IFBReview>(RealmCollections.Reviews, reviewId);
    const review: IFBReview | undefined = _.isNull(reviewInRealm) === false ? (reviewInRealm as IFBReview) : undefined;

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
