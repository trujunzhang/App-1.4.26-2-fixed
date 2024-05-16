import {useEffect} from 'react';
import type {OnyxCollection, OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import usePermissions from '@hooks/usePermissions';
// import * as RestaurantUtils from '@libs/RestaurantUtils';
import * as App from '@userActions/App';
import ONYXKEYS from '@src/ONYXKEYS';
// import type {Policy, Restaurant, RestaurantMetadata} from '@src/types/onyx';
import type {RestaurantScreenWrapperProps} from './RestaurantScreenWrapper';

type RestaurantScreenIDSetterComponentProps = {
    /** Whether user is a new user */
    isFirstTimeNewIeattaUser: OnyxEntry<boolean>;
};

type RestaurantScreenIDSetterProps = RestaurantScreenIDSetterComponentProps & RestaurantScreenWrapperProps;

/**
 * Get the most recently accessed restaurant for the user
 */
// const getLastAccessedRestaurantID = (
//     restaurants: OnyxCollection<Restaurant>,
//     ignoreDefaultRooms: boolean,
//     policies: OnyxCollection<Policy>,
//     isFirstTimeNewIeattaUser: OnyxEntry<boolean>,
//     openOnAdminRoom: boolean,
//     restaurantMetadata: OnyxCollection<RestaurantMetadata>,
// ): string | undefined => {
//     const lastRestaurant = RestaurantUtils.findLastAccessedRestaurant(restaurants, ignoreDefaultRooms, policies, !!isFirstTimeNewIeattaUser, openOnAdminRoom, restaurantMetadata);
//     return lastRestaurant?.restaurantId;
// };

// This wrapper is reponsible for opening the last accessed restaurant if there is no restaurantId specified in the route params
function RestaurantScreenIDSetter({route, navigation, isFirstTimeNewIeattaUser = false}: RestaurantScreenIDSetterProps) {
    const {canUseDefaultRooms} = usePermissions();
    // eslint-disable-next-line rulesdir/prefer-early-return
    useEffect(() => {
        // Don't update if there is a restaurantId in the params already
        if (route?.params?.restaurantId) {
            // const restaurantActionID = route?.params?.restaurantActionID;
            const regexValidRestaurantActionID = new RegExp(/^\d*$/);
            // if (restaurantActionID && !regexValidRestaurantActionID.test(restaurantActionID)) {
            // navigation.setParams({restaurantActionID: ''});
            // }
            App.confirmReadyToOpenApp();
            return;
        }

        // If there is no restaurantId in route, try to find last accessed and use it for setParams
        // const restaurantId = getLastAccessedRestaurantID(restaurants, !canUseDefaultRooms, policies, isFirstTimeNewIeattaUser, !!restaurants?.params?.openOnAdminRoom, restaurantMetadata);

        // It's possible that restaurants aren't fully loaded yet
        // in that case the restaurantId is undefined
        // if (restaurantId) {
        //     navigation.setParams({restaurantId: String(restaurantId)});
        // } else {
        App.confirmReadyToOpenApp();
        // }
    }, [route, navigation, canUseDefaultRooms, isFirstTimeNewIeattaUser]);

    // The RestaurantScreen without the restaurantId set will display a skeleton
    // until the restaurantId is loaded and set in the route param
    return null;
}

RestaurantScreenIDSetter.displayName = 'RestaurantScreenIDSetter';

export default withOnyx<RestaurantScreenIDSetterProps, RestaurantScreenIDSetterComponentProps>({
    isFirstTimeNewIeattaUser: {
        key: ONYXKEYS.NVP_IS_FIRST_TIME_NEW_EXPENSIFY_USER,
        initialValue: false,
    },
})(RestaurantScreenIDSetter);
