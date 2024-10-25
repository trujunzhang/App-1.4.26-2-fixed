import {withOnyx} from 'react-native-onyx';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import ONYXKEYS from '@src/ONYXKEYS';
import type FirebaseSyncProps from './types';
import type {FirebaseSyncOnyxProps} from './types';

function FirebaseSync({currentUserPersonalDetails}: FirebaseSyncProps) {
    return null;
}

FirebaseSync.displayName = 'FirebaseSync';

const FirebaseSyncWithOnyx = withOnyx<FirebaseSyncProps, FirebaseSyncOnyxProps>({
    firebaseCurrentSyncId: {
        key: ONYXKEYS.FIREBASE_CURRENT_SYNC_ID,
    },
})(FirebaseSync);
const FirebaseSyncWithCurrentUserPersonalDetails = withCurrentUserPersonalDetails(FirebaseSyncWithOnyx);

export default FirebaseSyncWithCurrentUserPersonalDetails;
