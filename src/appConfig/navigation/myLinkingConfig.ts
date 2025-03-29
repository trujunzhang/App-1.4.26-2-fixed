import getIsNarrowLayout from '@libs/getIsNarrowLayout';
import NAVIGATORS from '@src/NAVIGATORS';
import ROUTES from '@src/ROUTES';
import SCREENS from '@src/SCREENS';

const isNarrowLayout = getIsNarrowLayout();

const LinkingCommonHomeScreens = {
    // [SCREENS.APP_SIDE_BAR]: {
    //    path: ROUTES.APP_SIDE_BAR,
    //    exact: true,
    // },
    // [SCREENS.MOBILE_SMALL_SCREEN_SIDE_BAR]: {
    //    path: ROUTES.SIDE_BAR_WEB_SMALL_SCREEN_HOME,
    //    exact: true,
    // },
    // [SCREENS.RESTAURANT]: ROUTES.RESTAURANT_WITH_ID.route,
};

const LinkingWebHomeScreens = {
    [SCREENS.RESTAURANT]: ROUTES.RESTAURANT_WITH_ID.route,
    [SCREENS.EVENT]: ROUTES.EVENT_WITH_ID.route,
    [SCREENS.RECIPE]: ROUTES.RECIPE_WITH_ID.route,
};

const LinkingScreens = isNarrowLayout ? LinkingCommonHomeScreens : Object.assign(LinkingCommonHomeScreens, LinkingWebHomeScreens);

const LinkingCommonScreens = {
    [NAVIGATORS.REPORTS_SPLIT_NAVIGATOR]: {
        path: ROUTES.ROOT,
        screens: LinkingScreens,
    },

    [SCREENS.APP_SIDE_BAR]: {
        path: ROUTES.APP_SIDE_BAR,
        exact: true,
    },

    [SCREENS.CENTER_IEATTA.PHOTO_GRID_VIEW]: {
        path: ROUTES.PHOTOS_GRID_VIEW.route,
    },
    [SCREENS.CENTER_IEATTA.PHOTO_PAGE_VIEW]: {
        path: ROUTES.PHOTOS_PAGE_VIEW.route,
    },
};

const RightLinkingScreens = isNarrowLayout
    ? {
          [SCREENS.RIGHT_IEATTA.HOME_RESTAURANT]: ROUTES.RESTAURANT_WITH_ID.route,
          [SCREENS.RIGHT_IEATTA.HOME_EVENT]: ROUTES.EVENT_WITH_ID.route,
          [SCREENS.RIGHT_IEATTA.HOME_RECIPE]: ROUTES.RECIPE_WITH_ID.route,
      }
    : {};

const LinkingRightScreens = {
    ...RightLinkingScreens,
    [SCREENS.RIGHT_IEATTA.SETTINGS_ROOT_RIGHT]: {
        path: ROUTES.SETTINGS_ROOT_RIGHT,
    },
    [SCREENS.RIGHT_IEATTA.PROFILE_ROOT_RIGHT]: {
        path: ROUTES.SETTINGS_PROFILE_RIGHT,
    },
    [SCREENS.RIGHT_IEATTA.SETTINGS_DISPLAY_NAME_RIGHT]: {
        path: ROUTES.SETTINGS_DISPLAY_NAME_RIGHT,
    },
    [SCREENS.RIGHT_IEATTA.SETTINGS_ABOUT_RIGHT]: {
        path: ROUTES.SETTINGS_ABOUT_RIGHT,
    },
    [SCREENS.RIGHT_IEATTA.SETTINGS_TROUBLESHOOT_RIGHT]: {
        path: ROUTES.SETTINGS_TROUBLESHOOT_RIGHT,
    },
    [SCREENS.RIGHT_IEATTA.SETTINGS_LANGUAGE_RIGHT]: {
        path: ROUTES.SETTINGS_LANGUAGE_RIGHT,
    },
    [SCREENS.RIGHT_IEATTA.SETTINGS_THEME_RIGHT]: {
        path: ROUTES.SETTINGS_THEME_RIGHT,
    },
    [SCREENS.RIGHT_IEATTA.PREFERENCES_ROOT_RIGHT]: {
        path: ROUTES.SETTINGS_PREFERENCES_RIGHT,
    },
    [SCREENS.RIGHT_IEATTA.RESTAURANT]: ROUTES.EDIT_RESTAURANT.route,
    [SCREENS.RIGHT_IEATTA.EVENT]: ROUTES.EDIT_EVENT.route,
    [SCREENS.RIGHT_IEATTA.RECIPE]: ROUTES.EDIT_RECIPE.route,
    [SCREENS.RIGHT_IEATTA.PHOTO]: ROUTES.EDIT_PHOTO.route,
    [SCREENS.RIGHT_IEATTA.REVIEW]: ROUTES.EDIT_REVIEW.route,
    [SCREENS.RIGHT_IEATTA.REVIEWS_LIST]: ROUTES.REVIEWS_LIST.route,
    [SCREENS.RIGHT_IEATTA.ADD_RECIPES_IN_EVENT]: ROUTES.ADD_RECIPES_IN_EVENT.route,
    [SCREENS.RIGHT_IEATTA.ADD_USERS_IN_EVENT]: ROUTES.ADD_USERS_IN_EVENT.route,
    [SCREENS.RIGHT_IEATTA.ADD_WAITERS_IN_EVENT]: ROUTES.ADD_WAITERS_IN_EVENT.route,
    [SCREENS.RIGHT_IEATTA.TAKE_PHOTO]: ROUTES.TAKE_PHOTO.route,
    [SCREENS.RIGHT_IEATTA.LOCAL_PHOTOS]: ROUTES.LOCAL_PHOTOS.route,
};

const LinkingRightModal = {
    [SCREENS.RIGHT_MODAL.EDIT_IEATTA]: {
        screens: LinkingRightScreens,
    },
};

// eslint-disable-next-line import/prefer-default-export
export {LinkingCommonScreens, LinkingRightModal, LinkingRightScreens};
