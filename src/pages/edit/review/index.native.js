import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useObject, useQuery} from '@realm/react';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FBCollections, ReviewType} from '@libs/Firebase/constant';
import getCurrentPosition from '@libs/getCurrentPosition';
import {emptyReviewTag} from '@libs/ieatta/editFormUtils';
import {RealmCollections} from '@libs/Realm/constant';
import CONST from '@src/CONST';
import BaseEditReviewPage from './BaseEditReviewPage';

const propTypes = {
    /** The route object passed to this page from the navigator */
    route: PropTypes.shape({
        /** Each parameter passed via the URL */
        params: PropTypes.shape({
            /** The policyID that is being configured */
            reviewId: PropTypes.string,
            relatedId: PropTypes.string,
            reviewType: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

const defaultProps = {};

function EditReviewPage(props) {
    const reviewId = lodashGet(props.route, 'params.reviewId', emptyReviewTag);
    const relatedId = lodashGet(props.route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const reviewType = lodashGet(props.route, 'params.reviewType', ReviewType.Restaurant);

    /**
      |--------------------------------------------------
      | Single(Review)
      |--------------------------------------------------
      */
    const review = useObject(RealmCollections.Reviews, reviewId);

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

EditReviewPage.propTypes = propTypes;
EditReviewPage.defaultProps = defaultProps;
EditReviewPage.displayName = 'EditReviewPage';

// export default compose(
// withNetwork()
// )(EditReviewPage);

export default EditReviewPage;
