import type {NavigatorScreenParams} from '@react-navigation/native';
import type NAVIGATORS from '@src/NAVIGATORS';
import type {Route as Routes} from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';

type HomeSplitNavigatorParamList = {
    [SCREENS.REPORT]: {
        reportActionID: string;
        reportID: string;
        openOnAdminRoom?: boolean;
        referrer?: string;
        backTo?: Routes;
        moneyRequestReportActionID?: string;
        transactionID?: string;
    };
    [SCREENS.HOME]: undefined;
    [SCREENS.APP_SIDE_BAR]: undefined;
    [SCREENS.RESTAURANT]: {
        restaurantId: string;
        openOnAdminRoom?: boolean;
    };
    [SCREENS.EVENT]: {
        eventId: string;
    };
    [SCREENS.RECIPE]: {
        recipeId: string;
    };
};

type IeattaFullPaneScreensParamList = {
    // [SCREENS.HOME]: undefined;
    [SCREENS.CENTER_IEATTA.PHOTO_GRID_VIEW]: {
        relatedId: string;
        photoType: string;
    };
    [SCREENS.CENTER_IEATTA.PHOTO_PAGE_VIEW]: {
        relatedId: string;
        photoType: string;
        selected: string;
    };
};

type RightIeattaNavigatorParamList = {
    [SCREENS.RIGHT_IEATTA.HOME_RESTAURANT]: {
        restaurantId: string;
    };
    [SCREENS.RIGHT_IEATTA.HOME_EVENT]: {
        eventId: string;
    };
    [SCREENS.RIGHT_IEATTA.HOME_RECIPE]: {
        recipeId: string;
    };
    [SCREENS.RIGHT_IEATTA.SETTINGS_ROOT_RIGHT]: undefined;
    [SCREENS.RIGHT_IEATTA.RESTAURANT]: {
        restaurantId: string;
    };
    [SCREENS.RIGHT_IEATTA.EVENT]: {
        eventId: string;
        restaurantId: string;
    };
    [SCREENS.RIGHT_IEATTA.RECIPE]: {
        recipeId: string;
        restaurantId: string;
    };
    [SCREENS.RIGHT_IEATTA.PHOTO]: {
        phohtoId: string;
    };
    [SCREENS.RIGHT_IEATTA.REVIEW]: {
        reviewId: string;
        relatedId: string;
        reviewType: string;
    };
    [SCREENS.RIGHT_IEATTA.REVIEWS_LIST]: {
        relatedId: string;
        reviewType: string;
    };
    [SCREENS.RIGHT_IEATTA.ADD_RECIPES_IN_EVENT]: {
        restaurantId: string;
        peopleInEventId: string;
    };
    [SCREENS.RIGHT_IEATTA.ADD_USERS_IN_EVENT]: {
        restaurantId: string;
        eventId: string;
    };
    [SCREENS.RIGHT_IEATTA.ADD_WAITERS_IN_EVENT]: {
        restaurantId: string;
        eventId: string;
    };
    [SCREENS.RIGHT_IEATTA.TAKE_PHOTO]: {
        relatedId: string;
        photoType: string;
        pageId: string;
    };
    [SCREENS.RIGHT_IEATTA.LOCAL_PHOTOS]: {
        pageId: string;
    };
};

type ReportsSplitNavigatorParamList = HomeSplitNavigatorParamList;

// export type {HomeSplitNavigatorParamList, IeattaFullPaneScreensParamList, RightIeattaNavigatorParamList};
export type {HomeSplitNavigatorParamList, ReportsSplitNavigatorParamList, IeattaFullPaneScreensParamList, RightIeattaNavigatorParamList};
