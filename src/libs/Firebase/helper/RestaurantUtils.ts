import type {StackScreenProps} from '@react-navigation/stack';
import lodashGet from 'lodash/get';
import {FBCollections} from '@libs/Firebase/constant';
import type {CentralPaneNavigatorParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';

type RestartScreenNavigationProps = StackScreenProps<CentralPaneNavigatorParamList, typeof SCREENS.RESTAURANT>;

/**
 * Get the currently viewed restaurant ID as number
 *
 * @param route
 * @param route.params
 * @param route.params.restaurantId
 * @returns
 */
function getRestaurantID(route: RestartScreenNavigationProps['route']) {
    // The restaurant ID is used in an onyx key. If it's an empty string, onyx will return
    // a collection instead of an individual report.
    // We can't use the default value functionality of `lodash.get()` because it only
    // provides a default value on `undefined`, and will return an empty string.
    // Placing the default value outside of `lodash.get()` is intentional.
    return String(lodashGet(route, 'params.restaurantId', CONST.IEATTA_MODEL_ID_EMPTY));
}

// eslint-disable-next-line import/prefer-default-export
export {getRestaurantID};
export type {RestartScreenNavigationProps};
