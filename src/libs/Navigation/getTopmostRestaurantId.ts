import type {NavigationState, PartialState} from '@react-navigation/native';
import NAVIGATORS from '@src/NAVIGATORS';
import SCREENS from '@src/SCREENS';
import type {RootStackParamList} from './types';

// This function is in a separate file than Navigation.js to avoid cyclic dependency.

/**
 * Find the last visited restaurant screen in the navigation state and get the id of it.
 *
 * @param state - The react-navigation state
 * @returns - It's possible that there is no restaurant screen
 */
function getTopmostRestaurantId(state: NavigationState | NavigationState<RootStackParamList> | PartialState<NavigationState>): string | undefined {
    if (!state) {
        return;
    }

    const topmostCentralPane = state.routes.filter((route) => route.name === NAVIGATORS.CENTRAL_PANE_NAVIGATOR).at(-1);
    if (!topmostCentralPane) {
        return;
    }

    const directRestaurantParams = topmostCentralPane.params && 'params' in topmostCentralPane.params && topmostCentralPane?.params?.params;
    const directRestaurantIdParam = directRestaurantParams && 'restaurantId' in directRestaurantParams && directRestaurantParams?.restaurantId;

    if (!topmostCentralPane.state && !directRestaurantIdParam) {
        return;
    }

    if (directRestaurantIdParam) {
        return directRestaurantIdParam;
    }

    const topmostRestaurant = topmostCentralPane.state?.routes.filter((route) => route.name === SCREENS.RESTAURANT).at(-1);
    if (!topmostRestaurant) {
        return;
    }

    const topmostRestaurantId = topmostRestaurant.params && 'restaurantId' in topmostRestaurant.params && topmostRestaurant.params?.restaurantId;
    if (typeof topmostRestaurantId !== 'string') {
        return;
    }

    return topmostRestaurantId;
}

export default getTopmostRestaurantId;
