import lodashGet from 'lodash/get';
import Onyx from 'react-native-onyx';
import Log from '@libs/Log';
import ONYXKEYS from '@src/ONYXKEYS';
import type * as OnyxTypes from '@src/types/onyx';

function setIsFirstSyncFB(isFirstSync: boolean) {
    Onyx.set(ONYXKEYS.IS_FB_FIRST_SYNC, isFirstSync);
}

function setSyncUsersCompletion() {
    Onyx.merge(ONYXKEYS.FIREBASE_SYNC_STATUS, {isUsersSyncCompleted: true});
}

function setSyncRestaurantsCompletion() {
    Onyx.merge(ONYXKEYS.FIREBASE_SYNC_STATUS, {isRestaurantsSyncCompleted: true});
}

function setSyncEventsCompletion() {
    Onyx.merge(ONYXKEYS.FIREBASE_SYNC_STATUS, {isEventsSyncCompleted: true});
}

function setSyncRecipesCompletion() {
    Onyx.merge(ONYXKEYS.FIREBASE_SYNC_STATUS, {isRecipesSyncCompleted: true});
}

function setSyncReviewsCompletion() {
    Onyx.merge(ONYXKEYS.FIREBASE_SYNC_STATUS, {isReviewsSyncCompleted: true});
}

function setSyncPhotosCompletion() {
    Onyx.merge(ONYXKEYS.FIREBASE_SYNC_STATUS, {isPhotosSyncCompleted: true});
}

function setSyncPeopleInEventsCompletion() {
    Onyx.merge(ONYXKEYS.FIREBASE_SYNC_STATUS, {isPeopleInEventsSyncCompleted: true});
}

function checkHaveSyncAllCollections(firebaseSyncStatus: OnyxTypes.FirebaseSyncStatus | null = {} as any): boolean {
    Log.info('');
    Log.info('================================');
    Log.info(`firebaseSyncStatus: ${JSON.stringify(firebaseSyncStatus)}`);
    Log.info('================================');
    Log.info('');

    return (
        lodashGet(firebaseSyncStatus, 'isUsersSyncCompleted', false) &&
        lodashGet(firebaseSyncStatus, 'isRestaurantsSyncCompleted', false) &&
        lodashGet(firebaseSyncStatus, 'isEventsSyncCompleted', false) &&
        lodashGet(firebaseSyncStatus, 'isRecipesSyncCompleted', false) &&
        lodashGet(firebaseSyncStatus, 'isReviewsSyncCompleted', false) &&
        lodashGet(firebaseSyncStatus, 'isPhotosSyncCompleted', false) &&
        lodashGet(firebaseSyncStatus, 'isPeopleInEventsSyncCompleted', false)
    );
}

export {
    setIsFirstSyncFB,
    setSyncUsersCompletion,
    setSyncRestaurantsCompletion,
    setSyncEventsCompletion,
    setSyncRecipesCompletion,
    setSyncReviewsCompletion,
    setSyncPhotosCompletion,
    setSyncPeopleInEventsCompletion,
    checkHaveSyncAllCollections,
};
