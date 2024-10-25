/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-misused-promises */

/* eslint-disable @lwc/lwc/no-async-await */

/* eslint-disable no-await-in-loop */
import {useQuery, useRealm} from '@realm/react';
import * as FileSystem from 'expo-file-system';
import _ from 'lodash';
import {withOnyx} from 'react-native-onyx';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import {setFirebaseCurrentSyncId} from '@libs/actions/ieatta/firebaseSync';
import {getAuthUserFromPersonalDetails} from '@libs/Firebase/models/auth_user_model';
import FirebasePhoto from '@libs/Firebase/services/firebase-photo';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import RealmHelper from '@libs/Realm/services/realm-helper';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBSqlPhoto} from '@src/types/firebase';
import type FirebaseSyncProps from './types';
import type {FirebaseSyncOnyxProps} from './types';

const deleteLocalImage = async (offlinePath: string) => {
    await FileSystem.deleteAsync(`file://${offlinePath}`);
};

function FirebaseSync({currentUserPersonalDetails, firebaseCurrentSyncId}: FirebaseSyncProps) {
    const realm = useRealm();

    const sqlPhotos = useQuery<IFBSqlPhoto[]>(RealmCollections.SqlPhotos);
    const localSqlPhotos: IFBSqlPhoto[] = toRealmModelList<IFBSqlPhoto>(sqlPhotos);

    const syncPhotos = async () => {
        const authUserModel = getAuthUserFromPersonalDetails(currentUserPersonalDetails);
        if (_.isUndefined(authUserModel)) {
            return;
        }
        if (localSqlPhotos.length === 0) {
            return;
        }
        const firstPhoto: IFBSqlPhoto = localSqlPhotos[0];
        const {offlinePath, relatedId, photoType, uniqueId, photoTableId} = firstPhoto;
        if (firebaseCurrentSyncId !== null && firebaseCurrentSyncId !== undefined && photoTableId === firebaseCurrentSyncId) {
            return;
        }
        setFirebaseCurrentSyncId(photoTableId);

        FirebasePhoto.saveTakenPhotoIfOffline({imagePath: offlinePath, emptyParams: {authUserModel, photoUniqueId: photoTableId, relatedId, photoType, filePath: offlinePath}})
            .then(() => {
                return new RealmHelper(realm).deleteData({collection: RealmCollections.SqlPhotos, uniqueId});
            })
            .then(() => {
                return deleteLocalImage(offlinePath);
            })
            .catch((error) => {
                Log.warn('[SyncPhotos] Error: ', error);
                setFirebaseCurrentSyncId('');
            });
    };
    setInterval(syncPhotos, CONST.NETWORK.FIREBASE_SYNC_MS);

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
