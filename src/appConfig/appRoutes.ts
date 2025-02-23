import type {PhotoType} from '@libs/FirebaseIeatta/constant';
import {documentIdFromCurrentDate} from '@libs/FirebaseIeatta/utils/md5_utils';

export default {
    SETTINGS_ROOT_RIGHT: 'settings_root_right',

    RESTAURANT: 'res',
    RESTAURANT_WITH_ID: {
        route: 'res/:restaurantId?',
        getRoute: (restaurantId: string) => `res/${restaurantId}` as const,
    },

    EVENT: 'e',
    EVENT_WITH_ID: {
        route: 'e/:eventId?',
        getRoute: (eventId: string) => `e/${eventId}` as const,
    },

    RECIPE: 'm',
    RECIPE_WITH_ID: {
        route: 'm/:recipeId?',
        getRoute: (recipeId: string) => `m/${recipeId}` as const,
    },

    EDIT_RESTAURANT: {
        route: 'edit/r/:restaurantId',
        getRoute: (restaurantId: string) => `edit/r/${restaurantId}` as const,
    },
    EDIT_EVENT: {
        route: 'edit/e/:restaurantId/:eventId',
        getRoute: ({restaurantId, eventId}: {restaurantId: string; eventId: string}) => `edit/e/${restaurantId}/${eventId}` as const,
    },
    EDIT_RECIPE: {
        route: 'edit/m/:restaurantId/:recipeId',
        getRoute: ({restaurantId, recipeId}: {restaurantId: string; recipeId: string}) => `edit/m/${restaurantId}/${recipeId}` as const,
    },
    EDIT_PHOTO: {
        route: 'edit/p/:photoId',
        getRoute: (photoId: string) => `edit/p/${photoId}` as const,
    },
    EDIT_REVIEW: {
        route: 'edit/v/:reviewType/:relatedId/:reviewId',
        getRoute: ({reviewType, relatedId, reviewId}: {reviewType: string; relatedId: string; reviewId: string}) => `edit/v/${reviewType}/${relatedId}/${reviewId}` as const,
    },
    REVIEWS_LIST: {
        route: 'list/v/:reviewType/:relatedId',
        getRoute: ({reviewType, relatedId}: {reviewType: string; relatedId: string}) => `list/v/${reviewType}/${relatedId}` as const,
    },
    ADD_RECIPES_IN_EVENT: {
        route: 'add/recipes/:restaurantId/:peopleInEventId',
        getRoute: ({restaurantId, peopleInEventId}: {restaurantId: string; peopleInEventId: string}) => `add/recipes/${restaurantId}/${peopleInEventId}` as const,
    },
    ADD_USERS_IN_EVENT: {
        route: 'add/users/:restaurantId/:eventId',
        getRoute: ({restaurantId, eventId}: {restaurantId: string; eventId: string}) => `add/users/${restaurantId}/${eventId}` as const,
    },
    ADD_WAITERS_IN_EVENT: {
        route: 'add/waiters/:restaurantId/:eventId',
        getRoute: ({restaurantId, eventId}: {restaurantId: string; eventId: string}) => `add/waiters/${restaurantId}/${eventId}` as const,
    },
    PHOTOS_GRID_VIEW: {
        route: 'photos/grid/:photoType/:relatedId',
        getRoute: ({photoType, relatedId}: {photoType: PhotoType | string; relatedId: string}) => `photos/grid/${photoType}/${relatedId}` as const,
    },
    PHOTOS_PAGE_VIEW: {
        route: 'photos/page/:photoType/:relatedId/:selected',
        getRoute: ({photoType, relatedId, selected}: {photoType: PhotoType | string; relatedId: string; selected: string}) => `photos/page/${photoType}/${relatedId}/${selected}` as const,
    },
    TAKE_PHOTO: {
        route: 'photos/take/:photoType/:relatedId/:pageId',
        getRoute: ({photoType, relatedId}: {photoType: PhotoType | string; relatedId: string}) => `photos/take/${photoType}/${relatedId}/${documentIdFromCurrentDate()}` as const,
    },
    LOCAL_PHOTOS: {
        route: 'photos/local/:pageId',
        getRoute: (pageId: string) => `photos/local/${pageId}` as const,
    },
} as const;
