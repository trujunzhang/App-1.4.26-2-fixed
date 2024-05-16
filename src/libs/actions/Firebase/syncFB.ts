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

function checkHaveSyncAllCollections(firebaseSyncStatus: OnyxTypes.FirebaseSyncStatus): boolean {
    Log.info('');
    Log.info('================================');
    Log.info(`firebaseSyncStatus: ${JSON.stringify(firebaseSyncStatus)}`);
    Log.info('================================');
    Log.info('');

    return (
        firebaseSyncStatus.isUsersSyncCompleted &&
        firebaseSyncStatus.isRestaurantsSyncCompleted &&
        firebaseSyncStatus.isEventsSyncCompleted &&
        firebaseSyncStatus.isRecipesSyncCompleted &&
        firebaseSyncStatus.isReviewsSyncCompleted &&
        firebaseSyncStatus.isPhotosSyncCompleted &&
        firebaseSyncStatus.isPeopleInEventsSyncCompleted
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
