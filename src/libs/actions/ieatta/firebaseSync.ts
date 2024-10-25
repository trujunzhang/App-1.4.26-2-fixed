import Onyx from 'react-native-onyx';
import ONYXKEYS from '@src/ONYXKEYS';

function setFirebaseCurrentSyncId(currentSyncId: string) {
    Onyx.set(ONYXKEYS.FIREBASE_CURRENT_SYNC_ID, currentSyncId);
}

export {
    // eslint-disable-next-line import/prefer-default-export
    setFirebaseCurrentSyncId,
};
