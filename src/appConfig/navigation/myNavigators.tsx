// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import getIsNarrowLayout from '@libs/getIsNarrowLayout';
import {createModalStackNavigator} from '@libs/Navigation/AppNavigator/ModalStackNavigators';
import SCREENS from '@src/SCREENS';
import type ReactComponentModule from '@src/types/utils/ReactComponentModule';
import type {RightIeattaNavigatorParamList} from './types';

const RightMobileIeattaStackDict = {
    [SCREENS.RIGHT_IEATTA.HOME_RESTAURANT]: () => require<ReactComponentModule>('@pages/home/RestaurantScreen').default,
    [SCREENS.RIGHT_IEATTA.HOME_EVENT]: () => require<ReactComponentModule>('@pages/home/EventScreen').default,
    [SCREENS.RIGHT_IEATTA.HOME_RECIPE]: () => require<ReactComponentModule>('@pages/home/RecipeScreen').default,
};

const RightCommonIeattaStackDict = {
    [SCREENS.RIGHT_IEATTA.SETTINGS_ROOT_RIGHT]: () => require<ReactComponentModule>('@pages/settings/InitialSettingsPage').default,
    [SCREENS.RIGHT_IEATTA.PROFILE_ROOT_RIGHT]: () => require<ReactComponentModule>('@pages/settings/Profile/ProfilePage').default,
    [SCREENS.RIGHT_IEATTA.SETTINGS_DISPLAY_NAME_RIGHT]: () => require<ReactComponentModule>('@pages/settings/Profile/DisplayNamePage').default,
    [SCREENS.RIGHT_IEATTA.SETTINGS_ABOUT_RIGHT]: () => require<ReactComponentModule>('@pages/settings/AboutPage/AboutPage').default,
    [SCREENS.RIGHT_IEATTA.SETTINGS_TROUBLESHOOT_RIGHT]: () => require<ReactComponentModule>('@pages/settings/Troubleshoot/TroubleshootPage').default,
    [SCREENS.RIGHT_IEATTA.SETTINGS_LANGUAGE_RIGHT]: () => require<ReactComponentModule>('@pages/settings/Preferences/LanguagePage').default,
    [SCREENS.RIGHT_IEATTA.SETTINGS_THEME_RIGHT]: () => require<ReactComponentModule>('@pages/settings/Preferences/ThemePage').default,
    [SCREENS.RIGHT_IEATTA.PREFERENCES_ROOT_RIGHT]: () => require<ReactComponentModule>('@pages/settings/Preferences/PreferencesPage').default,
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
};

const RightWebIeattaStackNavigator = createModalStackNavigator<RightIeattaNavigatorParamList>(RightCommonIeattaStackDict);
const RightMobileIeattaStackNavigator = createModalStackNavigator<RightIeattaNavigatorParamList>(Object.assign(RightCommonIeattaStackDict, RightMobileIeattaStackDict));

const isNarrowLayout = getIsNarrowLayout();

const RightIeattaStackNavigator = isNarrowLayout ? RightMobileIeattaStackNavigator : RightWebIeattaStackNavigator;

// eslint-disable-next-line import/prefer-default-export
export {RightIeattaStackNavigator};
