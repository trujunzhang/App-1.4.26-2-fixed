/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-misused-promises */

/* eslint-disable @lwc/lwc/no-async-await */

/* eslint-disable no-await-in-loop */
import {useQuery, useRealm} from '@realm/react';
import * as FileSystem from 'expo-file-system';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import {useOnyx} from 'react-native-onyx';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import {setFirebaseCurrentSyncId} from '@libs/actions/ieatta/firebaseSync';
import {ParseModelSqlPhotos} from '@libs/FirebaseIeatta/appModel';
import type {ParseModelPhotosEmptyPhotoParams} from '@libs/FirebaseIeatta/appModel/photo';
import {getAuthUserFromPersonalDetails} from '@libs/FirebaseIeatta/models/auth_user_model';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import FirebasePhoto from '@libs/FirebaseIeatta/services/firebase-photo';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import RealmHelper from '@libs/Realm/services/realm-helper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBSqlPhoto} from '@src/types/firebase';
import type FirebaseSyncProps from './types';

const deleteLocalImage = async (offlinePath: string) => {
    await FileSystem.deleteAsync(`file://${offlinePath}`);
};

function FirebaseSync(props: FirebaseSyncProps) {
    const realm = useRealm();

    const [firebaseCurrentSyncId] = useOnyx(ONYXKEYS.FIREBASE_CURRENT_SYNC_ID, {initialValue: ''});

    const personalData = useCurrentUserPersonalDetails();

    const sqlPhotos = useQuery<IFBSqlPhoto>(RealmCollections.SqlPhotos, RealmQuery.queryForRealmSqlPhotos(CONST.IEATTA_LOCAL_PHOTOS_SHOW_ALL));
    const localSqlPhotos: IFBSqlPhoto[] = toRealmModelList<IFBSqlPhoto>(sqlPhotos);
    const authUserModel = getAuthUserFromPersonalDetails(personalData);

    const syncPhotos = async () => {
        if (_.isUndefined(authUserModel)) {
            return;
        }
        if (localSqlPhotos.length === 0) {
            return;
        }
        const firstPhoto: IFBSqlPhoto | undefined = localSqlPhotos.at(0);
        if (firstPhoto === undefined) {
            return;
        }
        const {offlinePath, relatedId, photoType, uniqueId, firebasePhotoId} = firstPhoto;
        if (firebaseCurrentSyncId !== null && firebaseCurrentSyncId !== undefined && firebasePhotoId === firebaseCurrentSyncId) {
            return;
        }
        setFirebaseCurrentSyncId(firebasePhotoId);

        const emptyParams: ParseModelPhotosEmptyPhotoParams = {authUserModel, photoUniqueId: firebasePhotoId, relatedId, photoType, filePath: offlinePath};
        try {
            // First of all, save the local sqlPhotos to firebase's photos.
            const photoUrl = await FirebasePhoto.saveTakenPhotoIfOffline({imagePath: offlinePath, isOnWeb: false, isSyncing: true, emptyParams});

            // If the SqlPhoto has cover of restaurants and recipes, need to update the cover in firebase.
            const {coverId, coverType} = firstPhoto;
            if (_.isUndefined(coverId) === false && _.isUndefined(coverType) === false) {
                await new FirebaseHelper().updateCover({
                    path: ParseModelSqlPhotos.toFBCollection(coverType),
                    uniqueId: coverId,
                    coverData: {
                        originalUrl: photoUrl,
                    },
                });
            }

            // Finally, delete the local sqlPhoto and local image.
            new RealmHelper(realm).deleteData({collection: RealmCollections.SqlPhotos, uniqueId});
            deleteLocalImage(offlinePath);
        } catch (error: any) {
            Log.warn('[SyncPhotos] Error: ', error);
            setFirebaseCurrentSyncId('');
        }
    };
    // setInterval(syncPhotos, CONST.NETWORK.FIREBASE_SYNC_MS);

    return null;
}

FirebaseSync.displayName = 'FirebaseSync';

export default FirebaseSync;
