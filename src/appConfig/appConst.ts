import type {UserLocation} from '@src/types/onyx';

const DEFAULT_LOCATION: UserLocation = {longitude: 0, latitude: 0};

export default {
    IEATTA_LOCAL_PHOTOS_SHOW_ALL: 'all',
    IEATTA_MODEL_ID_EMPTY: 'empty',
    IEATTA_EDIT_MODEL_NEW: 'new',
    IEATTA_URL_EMPTY: 'http://empty.jpg',

    DEFAULT_LOCATION,
    FIREBASE_SYNC_MS: 1000 * 45,

    // Minimum width and height size in px for a selected image
    FBAVATAR_MIN_WIDTH_PX: 80,
    FBAVATAR_MIN_HEIGHT_PX: 80,

    // Maximum width and height size in px for a selected image
    FBAVATAR_MAX_WIDTH_PX: 6096,
    FBAVATAR_MAX_HEIGHT_PX: 6096,

    DEFAULT_SESSION_TOKEN: 'logged',
};
