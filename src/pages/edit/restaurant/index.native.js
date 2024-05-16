import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useObject, useQuery} from '@realm/react';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FBCollections} from '@libs/Firebase/constant';
import getCurrentPosition from '@libs/getCurrentPosition';
import {emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import {RealmCollections} from '@libs/Realm/constant';
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

    const [currentPosition, setCurrentPosition] = useState(CONST.DEFAULT_LOCATION);
    const hasAskedForLocationPermission = useRef(false);
    /**
      |--------------------------------------------------
      | Single(Restaurant)
      |--------------------------------------------------
      */
    const restaurant = useObject(RealmCollections.Restaurants, restaurantId);

    useFocusEffect(
        useCallback(() => {
            if (hasAskedForLocationPermission.current) {
                return;
            }

            hasAskedForLocationPermission.current = true;
            getCurrentPosition(
                (params) => {
                    const currentCoords = {longitude: params.coords.longitude, latitude: params.coords.latitude};
                    setCurrentPosition(currentCoords);
                },
                () => {},
            );
        }, []),
    );

    return (
        <BaseEditRestaurantPage
            key={lodashGet(restaurant, 'uniqueId', emptyRestaurantTag)}
            restaurantId={restaurantId}
            restaurant={restaurant}
            isNewModel={restaurantId === CONST.IEATTA_EDIT_MODEL_NEW}
            userLocation={currentPosition}
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
