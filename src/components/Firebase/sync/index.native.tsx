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
import {useEffect} from 'react';
import {useOnyx} from 'react-native-onyx';
import type Realm from 'realm';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import {setFirebaseCurrentSyncId} from '@libs/actions/ieatta/firebaseSync';
import {ParseModelSqlPhotos} from '@libs/FirebaseIeatta/appModel';
import type {ParseModelPhotosEmptyPhotoParams} from '@libs/FirebaseIeatta/appModel/photo';
import type {IAuthUser} from '@libs/FirebaseIeatta/models/auth_user_model';
import {getAuthUserFromPersonalDetails} from '@libs/FirebaseIeatta/models/auth_user_model';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import type {SaveTakenPhotoOnNativeAppIfOfflineParams} from '@libs/FirebaseIeatta/services/firebase-photo';
import FirebasePhoto from '@libs/FirebaseIeatta/services/firebase-photo';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import RealmHelper from '@libs/Realm/services/realm-helper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBRecipe, IFBRestaurant, IFBSqlPhoto} from '@src/types/firebase';
import type FirebaseSyncProps from './types';

const deleteLocalImage = async (fileUri: string) => {
    await FileSystem.deleteAsync(fileUri);
};

let realmInstance: Realm | null = null;
const setRealm = (realm: Realm) => {
    realmInstance = realm;
};

let authUserModel: IAuthUser | null = null;
const setAuthUserModel = (model: IAuthUser) => {
    authUserModel = model;
};

let localSqlPhotos: IFBSqlPhoto[] = [];
const setlocalSqlPhotos = (photos: IFBSqlPhoto[]) => {
    localSqlPhotos = photos;
};

let firebaseCurrentSyncId = '';

const syncPhotos = async () => {
    if (_.isUndefined(authUserModel) || _.isNull(authUserModel)) {
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
    firebaseCurrentSyncId = firebasePhotoId;
    setFirebaseCurrentSyncId(firebasePhotoId);

    const emptyParams: ParseModelPhotosEmptyPhotoParams = {authUserModel, photoUniqueId: firebasePhotoId, relatedId, photoType, filePath: offlinePath};
    try {
        const fileUri = `file://${offlinePath}`;
        // First of all, save the local sqlPhotos as firebase's photos.
        const params: SaveTakenPhotoOnNativeAppIfOfflineParams = {fileUri, isOnWeb: false, isSyncing: true, emptyParams};
        const photoUrl: string | undefined = await FirebasePhoto.saveTakenPhotoForNativeAppIfOffline(params);
        // If the SqlPhoto has cover of restaurants and recipes,
        // need to update the cover in firebase.
        const {coverId, coverType} = firstPhoto;
        if (realmInstance !== null) {
            if (coverId !== '' && coverType !== RealmCollections.Unknown && _.isUndefined(photoUrl) === false) {
                const existObjects = realmInstance.objects<IFBRestaurant | IFBRecipe>(coverType).filtered('uniqueId == $0', coverId);
                if (existObjects.length === 1) {
                    const lastModal: IFBRestaurant | IFBRecipe = existObjects[0] as IFBRestaurant | IFBRecipe;
                    const firebasePhotoUrl = lastModal.originalUrl;
                    // Only update the cover if the url is the same.
                    if (firebasePhotoUrl === fileUri) {
                        await new FirebaseHelper().updateCover({
                            path: ParseModelSqlPhotos.toFBCollection(coverType),
                            uniqueId: coverId,
                            coverData: {
                                originalUrl: photoUrl,
                            },
                        });
                    }
                }
            }
        }

        // Finally, delete the local sqlPhoto and local image.
        if (realmInstance !== null) {
            new RealmHelper(realmInstance).deleteData({collection: RealmCollections.SqlPhotos, uniqueId});
        }
        deleteLocalImage(fileUri);
    } catch (error: any) {
        Log.warn('[SyncPhotos] Error: ', error);
        firebaseCurrentSyncId = '';
        setFirebaseCurrentSyncId('');
    }
};

setInterval(syncPhotos, CONST.FIREBASE_SYNC_MS);

function FirebaseSync(props: FirebaseSyncProps) {
    const realm = useRealm();

    const personalData = useCurrentUserPersonalDetails();

    const sqlPhotos = useQuery<IFBSqlPhoto>(RealmCollections.SqlPhotos, RealmQuery.queryForRealmSqlPhotos(CONST.IEATTA_LOCAL_PHOTOS_SHOW_ALL));
    const localSqlPhotosArray: IFBSqlPhoto[] = toRealmModelList<IFBSqlPhoto>(sqlPhotos);
    const authUserModelInstance = getAuthUserFromPersonalDetails(personalData);

    setRealm(realm);
    setAuthUserModel(authUserModelInstance);
    setlocalSqlPhotos(localSqlPhotosArray);

    return null;
}

FirebaseSync.displayName = 'FirebaseSync';

export default FirebaseSync;
