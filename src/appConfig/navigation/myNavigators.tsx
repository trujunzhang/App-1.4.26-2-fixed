// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import {createModalStackNavigator} from '@libs/Navigation/AppNavigator/ModalStackNavigators';
import type {CentralPaneName} from '@libs/Navigation/types';
import withPrepareCentralPaneScreen from '@src/components/withPrepareCentralPaneScreen';
import SCREENS from '@src/SCREENS';
import type ReactComponentModule from '@src/types/utils/ReactComponentModule';
import type {RightIeattaNavigatorParamList} from './types';

const RightIeattaStackNavigator = createModalStackNavigator<RightIeattaNavigatorParamList>({
    [SCREENS.RIGHT_IEATTA.RESTAURANT]: () => require<ReactComponentModule>('@pages/edit/restaurant').default,
    [SCREENS.RIGHT_IEATTA.EVENT]: () => require<ReactComponentModule>('@pages/edit/event').default,
    [SCREENS.RIGHT_IEATTA.RECIPE]: () => require<ReactComponentModule>('@pages/edit/recipe').default,
    [SCREENS.RIGHT_IEATTA.PHOTO]: () => require<ReactComponentModule>('@pages/edit/photo').default,
    [SCREENS.RIGHT_IEATTA.REVIEW]: () => require<ReactComponentModule>('@pages/edit/review').default,
    [SCREENS.RIGHT_IEATTA.REVIEWS_LIST]: () => require<ReactComponentModule>('@pages/home/ReviewScreen').default,
    [SCREENS.RIGHT_IEATTA.ADD_RECIPES_IN_EVENT]: () => require<ReactComponentModule>('@pages/add/AddRecipesInEventPage').default,
    [SCREENS.RIGHT_IEATTA.ADD_USERS_IN_EVENT]: () => require<ReactComponentModule>('@pages/add/AddUsersInEventPage').default,
    [SCREENS.RIGHT_IEATTA.ADD_WAITERS_IN_EVENT]: () => require<ReactComponentModule>('@pages/add/AddWaitersInEventPage').default,
    [SCREENS.RIGHT_IEATTA.TAKE_PHOTO]: () => require<ReactComponentModule>('@pages/photos/takePhoto').default,
    [SCREENS.RIGHT_IEATTA.LOCAL_PHOTOS]: () => require<ReactComponentModule>('@pages/photos/local').default,
});

type Screens = Partial<Record<CentralPaneName, () => React.ComponentType>>;

const IEATTA_CENTRAL_PANE_SCREENS = {
    [SCREENS.RESTAURANT]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@pages/home/RestaurantScreen').default),
    [SCREENS.EVENT]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@pages/home/EventScreen').default),
    [SCREENS.RECIPE]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@pages/home/RecipeScreen').default),
} satisfies Screens;

export {RightIeattaStackNavigator, IEATTA_CENTRAL_PANE_SCREENS};
