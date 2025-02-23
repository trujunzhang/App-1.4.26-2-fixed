const appSCREENS = {
    RESTAURANT: 'Restaurant',
    EVENT: 'Event',
    RECIPE: 'Recipe',

    RIGHT_IEATTA: {
        SETTINGS_ROOT_RIGHT: 'Settings_Root_Right',
        RESTAURANT: 'EditIeatta_Restaurant',
        EVENT: 'EditIeatta_Event',
        RECIPE: 'EditIeatta_Recipe',
        PHOTO: 'EditIeatta_Photo',
        REVIEW: 'EditIeatta_Review',
        REVIEWS_LIST: 'EditIeatta_ReviewsList',
        ADD_RECIPES_IN_EVENT: 'AddRecipesInEvent',
        ADD_USERS_IN_EVENT: 'AddUsersInEvent',
        ADD_WAITERS_IN_EVENT: 'AddWaitersInEvent',
        TAKE_PHOTO: 'TakePhoto',
        LOCAL_PHOTOS: 'LocalPhotos',
    },
    IEATTA_PHOTOS_CENTRAL_PANE: 'IeattaPhotosCentralPane',
    CENTER_IEATTA: {
        PHOTO_GRID_VIEW: 'PhotoGridView',
        PHOTO_PAGE_VIEW: 'PhotoPageView',
    },
} as const;

// eslint-disable-next-line import/prefer-default-export
export {appSCREENS};
