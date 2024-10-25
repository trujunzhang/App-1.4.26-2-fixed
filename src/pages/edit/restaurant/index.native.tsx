import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useObject, useQuery} from '@realm/react';
import _ from 'lodash';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {defaultProps, propTypes} from '@components/OptionsSelector/optionsSelectorPropTypes';
import {FBCollections} from '@libs/Firebase/constant';
import getCurrentPosition from '@libs/getCurrentPosition';
import {emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBRestaurant} from '@src/types/firebase';
import BaseEditRestaurantPage from './BaseEditRestaurantPage';

type EditRestartNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.RESTAURANT>;

type EditRestaurantPageProps = EditRestartNavigationProps & {};

function EditRestaurantPage(props: EditRestaurantPageProps) {
    const restaurantId = lodashGet(props.route, 'params.restaurantId', emptyRestaurantTag);

    const [currentPosition, setCurrentPosition] = useState<{latitude: number; longitude: number}>(CONST.DEFAULT_LOCATION);
    const hasAskedForLocationPermission = useRef(false);
    /**
      |--------------------------------------------------
      | Single(Restaurant)
      |--------------------------------------------------
      */
    const restaurantInRealm = useObject<IFBRestaurant>(RealmCollections.Restaurants, restaurantId);
    const restaurant: IFBRestaurant | undefined = _.isNull(restaurantInRealm) === false ? (restaurantInRealm as IFBRestaurant) : undefined;

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

EditRestaurantPage.displayName = 'EditRestaurantPage';

export default EditRestaurantPage;
