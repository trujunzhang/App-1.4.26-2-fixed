import ROUTES from '@src/ROUTES';
import SCREENS from '@src/SCREENS';

const LinkingCommonScreens = {
    [SCREENS.RESTAURANT]: ROUTES.RESTAURANT_WITH_ID.route,
    [SCREENS.EVENT]: ROUTES.EVENT_WITH_ID.route,
    [SCREENS.RECIPE]: ROUTES.RECIPE_WITH_ID.route,

    [SCREENS.CENTER_IEATTA.PHOTO_GRID_VIEW]: {
        path: ROUTES.PHOTOS_GRID_VIEW.route,
    },
    [SCREENS.CENTER_IEATTA.PHOTO_PAGE_VIEW]: {
        path: ROUTES.PHOTOS_PAGE_VIEW.route,
    },
};

const LinkingRightModal = {
    [SCREENS.RIGHT_MODAL.EDIT_IEATTA]: {
        screens: {
            [SCREENS.RIGHT_IEATTA.SETTINGS_ROOT_RIGHT]: {
                path: ROUTES.SETTINGS_ROOT_RIGHT,
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
        },
    },
};

// eslint-disable-next-line import/prefer-default-export
export {LinkingCommonScreens, LinkingRightModal};
