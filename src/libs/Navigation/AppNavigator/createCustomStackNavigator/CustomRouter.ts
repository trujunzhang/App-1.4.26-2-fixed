import type {NavigationState, PartialState, RouterConfigOptions, StackNavigationState} from '@react-navigation/native';
import {StackRouter} from '@react-navigation/native';
import type {ParamListBase} from '@react-navigation/routers';
import NAVIGATORS from '@src/NAVIGATORS';
import SCREENS from '@src/SCREENS';
import type {ResponsiveStackNavigatorRouterOptions} from './types';

type State = NavigationState | PartialState<NavigationState>;

const isAtLeastOneCentralPaneNavigatorInState = (state: State): boolean => !!state.routes.find((route) => route.name === NAVIGATORS.CENTRAL_PANE_NAVIGATOR);

const getTopMostRestaurantIDFromRHP = (state: State): string => {
    if (!state) {
        return '';
    }

    const topmostRightPane = state.routes.filter((route) => route.name === NAVIGATORS.RIGHT_MODAL_NAVIGATOR).at(-1);

    if (topmostRightPane?.state) {
        return getTopMostRestaurantIDFromRHP(topmostRightPane.state);
    }

    const topmostRoute = state.routes.at(-1);

    if (topmostRoute?.state) {
        return getTopMostRestaurantIDFromRHP(topmostRoute.state);
    }

    if (topmostRoute?.params && 'restaurantId' in topmostRoute.params && typeof topmostRoute.params.restaurantId === 'string' && topmostRoute.params.restaurantId) {
        return topmostRoute.params.restaurantId;
    }

    return '';
};
/**
 * Adds restaurant route without any specific restaurantId to the state.
 * The restaurant screen will self set proper restaurantId param based on the helper function findLastAccessedRestaurant (look at RestaurantScreenWrapper for more info)
 *
 * @param state - react-navigation state
 */
const addCentralPaneNavigatorRoute = (state: State) => {
    const restaurantId = getTopMostRestaurantIDFromRHP(state);
    const centralPaneNavigatorRoute = {
        name: NAVIGATORS.CENTRAL_PANE_NAVIGATOR,
        state: {
            routes: [
                {
                    name: SCREENS.RESTAURANT,
                    params: {
                        restaurantId,
                    },
                },
            ],
        },
    };
    state.routes.splice(1, 0, centralPaneNavigatorRoute);
    // eslint-disable-next-line no-param-reassign, @typescript-eslint/non-nullable-type-assertion-style
    (state.index as number) = state.routes.length - 1;
};

function CustomRouter(options: ResponsiveStackNavigatorRouterOptions) {
    const stackRouter = StackRouter(options);

    return {
        ...stackRouter,
        getRehydratedState(partialState: StackNavigationState<ParamListBase>, {routeNames, routeParamList, routeGetIdList}: RouterConfigOptions): StackNavigationState<ParamListBase> {
            // Make sure that there is at least one CentralPaneNavigator (RestaurantScreen by default) in the state if this is a wide layout
            if (!isAtLeastOneCentralPaneNavigatorInState(partialState) && !options.getIsSmallScreenWidth()) {
                // If we added a route we need to make sure that the state.stale is true to generate new key for this route

                // eslint-disable-next-line no-param-reassign
                (partialState.stale as boolean) = true;
                addCentralPaneNavigatorRoute(partialState);
            }
            const state = stackRouter.getRehydratedState(partialState, {routeNames, routeParamList, routeGetIdList});
            return state;
        },
    };
}

export default CustomRouter;
