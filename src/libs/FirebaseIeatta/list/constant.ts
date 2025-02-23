/* eslint-disable no-restricted-syntax */
/* eslint-disable rulesdir/no-inline-named-export */
/* eslint-disable @typescript-eslint/prefer-enum-initializers */
/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line no-restricted-syntax,import/prefer-default-export
export enum PageSection {
    Unknow,
    /**
     |--------------------------------------------------
     | photo carousel
     |--------------------------------------------------
     */
    PHOTO_CAROUSEL_ITEM_WITH_EVENT,
    PHOTO_CAROUSEL_ITEM_WITHOUT_EVENT,
    PHOTO_GRID_ITEM_WITH_EVENT,
    PHOTO_ADD_WAITERS_ITEM_WITH_EVENT,
    PHOTO_SELECT_COVERR_FOR_RESTAURANT_AND_RECIPE,
    PHOTO_GRID_LOCAL_ITEM,

    /**
     |--------------------------------------------------
     | Detailed pages
     |--------------------------------------------------
     */
    DETAILED_EDIT_MODEL_BUTTON,
    DISPLAY_NAME_TITLE_ROW,

    /**
     |--------------------------------------------------
     | Sidebar
     |--------------------------------------------------
     */
    SIDEBAR_RESTAURANT_CARD,
    SIDEBAR_RESTAURANT_ROW,
    RESTAURANT_SEARCH_ROW,

    /**
     |--------------------------------------------------
     | detailed header info
     |--------------------------------------------------
     */
    PANEL_RESTAURANT_INFO,
    PANEL_RESTAURANT_INFO_WEB,
    PANEL_EVENT_INFO,
    PANEL_EVENT_INFO_WEB,
    PANEL_PEOPLEINEVENT_INFO,
    PANEL_RECIPE_INFO,
    PANEL_RECIPE_INFO_WEB,
    /**
     |--------------------------------------------------
     | common section title
     |--------------------------------------------------
     */
    COMMON_TITLE,
    /**
     |--------------------------------------------------
     | restaurant
     |--------------------------------------------------
     */
    RESTAURANT_ADDRESS,
    // event(restaurant)
    RESTAURANT_EVENT,
    RESTAURANT_EVENT_WEB,
    RESTAURANT_EVENT_EMPTY,
    // menu(restaurant)
    RESTAURANT_MENU_ROW,
    RESTAURANT_MENU_TITLE,
    /**
     |--------------------------------------------------
     | event
     |--------------------------------------------------
     */
    EVENT_ORDERED_USER_TITLE,
    EVENT_USER,
    EVENT_USER_WEB,
    EVENT_USER_EMPTY,
    // waiter(event)
    EVENT_WAITER_TITLE,
    EVENT_WAITER_ROW,
    /**
     |--------------------------------------------------
     | PeopleInEvent
     |--------------------------------------------------
     */
    PEOPLEINEVENT_RECIPE,
    PEOPLEINEVENT_RECIPE_EMPTY,
    /**
     |--------------------------------------------------
     | Common
     |--------------------------------------------------
     */
    // photo(restaurant/recipe)
    SECTION_PHOTO_TITLE,
    SECTION_PHOTO_ROW,
    SECTION_PHOTO_ITEM,
    // review(restaurant/event/recipe)
    SECTION_REVIEW,
    SECTION_REVIEW_ACTION_BAR,
    SECTION_REVIEW_LOGGED_USER,
    SECTION_REVIEW_EMPTY,
    SECTION_REVIEW_SEE_ALL,
    /**
     |--------------------------------------------------
     | recipe
     |--------------------------------------------------
     */
    RECIPE_ROW,
    RECIPE_ROW_WEB,
    /**
     |--------------------------------------------------
     | SkeletonView
     |--------------------------------------------------
     */
    SECTION_SKELETON_VIEW,
}

export enum RowPressableType {
    NO_EVENT,
    SINGLE_PRESS,
    SECONDARY_PRESS,
}

export enum SkeletonViewType {
    EVENTS_IN_RESTAURANT,
}
