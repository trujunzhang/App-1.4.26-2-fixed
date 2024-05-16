import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import {FBCollections} from '@libs/Firebase/constant';
import {querySingle} from '@libs/Firebase/services/firebase-query';
import {emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import CONST from '@src/CONST';
import BaseEditRestaurantPage from './BaseEditRestaurantPage';

const propTypes = {
    /** The route object passed to this page from the navigator */
    route: PropTypes.shape({
        /** Each parameter passed via the URL */
        params: PropTypes.shape({
            /** The policyID that is being configured */
            restaurantId: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

const defaultProps = {};

function EditRestaurantPage(props) {
    const restaurantId = lodashGet(props.route, 'params.restaurantId', emptyRestaurantTag);
    /**
      |--------------------------------------------------
      | Single(Restaurant)
      |--------------------------------------------------
      */
    const [restaurant, loadingForRestaurant, errorForRestaurant] = useDocumentDataOnce(
        querySingle({
            path: FBCollections.Restaurants,
            id: restaurantId,
        }),
    );

    return (
        <BaseEditRestaurantPage
            key={lodashGet(restaurant, 'uniqueId', emptyRestaurantTag)}
            restaurantId={restaurantId}
            restaurant={restaurant}
            isNewModel={restaurantId === CONST.IEATTA_EDIT_MODEL_NEW}
        />
    );
}

EditRestaurantPage.propTypes = propTypes;
EditRestaurantPage.defaultProps = defaultProps;
EditRestaurantPage.displayName = 'EditRestaurantPage';

// export default compose(
// withNetwork()
// )(EditRestaurantPage);

export default EditRestaurantPage;
