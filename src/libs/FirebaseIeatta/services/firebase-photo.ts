/* eslint-disable @lwc/lwc/no-async-await */
import {ParseModelPhotos} from '@libs/FirebaseIeatta/appModel';
import type {ParseModelPhotosEmptyPhotoParams} from '@libs/FirebaseIeatta/appModel/photo';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import CloudinaryUtils from '@libs/FirebaseIeatta/utils/cloudinaryUtils';
import Log from '@libs/Log';
import FirebaseHelper from './firebase-helper';
import type {UserProperties} from './firebase-helper/types';

type BaseSaveTakenPhotoIfOfflineParams = {
    emptyParams: ParseModelPhotosEmptyPhotoParams;
};
type SaveTakenPhotoOnWebAppIfOfflineParams = BaseSaveTakenPhotoIfOfflineParams & {
    blobHttps?: string;
    imageBase64?: string;
};

type SaveTakenPhotoOnNativeAppIfOfflineParams = BaseSaveTakenPhotoIfOfflineParams & {
    fileUri: string;
    isOnWeb: boolean;
    isSyncing?: boolean;
};

type SaveUserPhotoParams = {
    userId: string;
    fileUriOrBlobHttps: string;
};

class FirebasePhoto {
    /**
     * Save taken photo as Firebase collection on the native app.
     *
     * @param fileUri - the local path of the taken photo, with 'file://'.
     */
    static async saveTakenPhotoForNativeAppIfOffline({fileUri, isOnWeb, isSyncing = false, emptyParams}: SaveTakenPhotoOnNativeAppIfOfflineParams): Promise<string | undefined> {
        let photoUrl: string | undefined = `${fileUri}`;
        let uploadToCloudinarySucess = false;
        try {
            const base64: string | undefined = await new CloudinaryUtils().readAsBase64(fileUri);
            if (base64 !== undefined) {
                const url: string | undefined = await new CloudinaryUtils().uploadToCloudinary(base64);
                photoUrl = url;
                uploadToCloudinarySucess = true;

                Log.info(`get cloudinary url after taking photo: ${url}`);
            }
        } catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            Log.warn('Error saving photo to cloudinary', error);
        }
        // It can not be offline mode on the web. If upload to cloudinary failed, return error.
        if (isOnWeb && uploadToCloudinarySucess === false) {
            return Promise.reject(new Error('Error saving photo to cloudinary on the web'));
        }
        if (isSyncing === true && uploadToCloudinarySucess === false) {
            return Promise.reject(new Error('Error saving photo to cloudinary on the mobile syncing'));
        }
        const emptyModel = ParseModelPhotos.emptyPhoto(emptyParams);
        const nextModel = ParseModelPhotos.updateFromCloudinary({
            model: {...emptyModel},
            originalUrl: photoUrl ?? '',
        });
        await new FirebaseHelper().setData({
            path: FBCollections.Photos,
            model: nextModel,
        });
        if (isOnWeb === false && uploadToCloudinarySucess === false) {
            return Promise.reject(new Error('Error saving photo to cloudinary on the mobile'));
        }
        return Promise.resolve(photoUrl);
    }

    /**
     * Save taken photo as Firebase collection on the native/web app.
     *
     * @param fileUriOrBlobHttps - the local path of the taken photo, with 'file://' or 'blob://.
     */
    static async saveUserPhoto({fileUriOrBlobHttps, userId}: SaveUserPhotoParams): Promise<string | undefined> {
        let photoUrl: string | undefined;
        let uploadToCloudinarySucess = false;
        try {
            const base64: string | undefined = await new CloudinaryUtils().readAsBase64(fileUriOrBlobHttps);
            if (base64 !== undefined) {
                const url: string | undefined = await new CloudinaryUtils().uploadToCloudinary(base64);
                photoUrl = url;
                uploadToCloudinarySucess = true;

                Log.info(`get cloudinary url after taking photo: ${url}`);
            }
        } catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            Log.warn('Error saving photo to cloudinary', error);
        }
        if (uploadToCloudinarySucess === false) {
            return Promise.reject(new Error('Error saving photo to cloudinary on the mobile'));
        }

        if (photoUrl !== undefined && photoUrl !== null) {
            const properties: UserProperties = {originalUrl: photoUrl};
            await new FirebaseHelper().updateUserProperties({userId, properties});
        }

        return Promise.resolve(photoUrl);
    }

    /**
     * Save taken photo as Firebase collection on the web app.
     *
     * @param imagePath - the local path of the taken photo, without 'file://'.
     */
    static async saveTakenPhotoForWebAppIfOffline({blobHttps, imageBase64, emptyParams}: SaveTakenPhotoOnWebAppIfOfflineParams): Promise<string | undefined> {
        let photoUrl: string | undefined;
        let uploadToCloudinarySucess = false;
        try {
            let base64: string | undefined = imageBase64;
            if (base64 === undefined && blobHttps !== undefined) {
                // blobHttps is the local path of the taken photo,
                // with 'blob://', if the photo is taken on the web.
                // without 'file://', if the photo is taken on the desktop app.
                base64 = await new CloudinaryUtils().readAsBase64(blobHttps);
            }
            if (base64 !== undefined) {
                const url: string | undefined = await new CloudinaryUtils().uploadToCloudinary(base64);
                photoUrl = url;
                uploadToCloudinarySucess = true;
                Log.info(`get cloudinary url after taking photo: ${url}`);
            }
        } catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            Log.warn('Error saving photo to cloudinary', error);
        }
        // It can not be offline mode on the web. If upload to cloudinary failed, return error.
        if (uploadToCloudinarySucess === false || photoUrl === undefined || photoUrl === null) {
            return Promise.reject(new Error('Error saving photo to cloudinary on the web'));
        }
        const emptyModel = ParseModelPhotos.emptyPhoto(emptyParams);
        const nextModel = ParseModelPhotos.updateFromCloudinary({
            model: {...emptyModel},
            originalUrl: photoUrl,
        });
        await new FirebaseHelper().setData({
            path: FBCollections.Photos,
            model: nextModel,
        });
        return Promise.resolve(photoUrl);
    }
}

export default FirebasePhoto;

export type {SaveTakenPhotoOnNativeAppIfOfflineParams, SaveTakenPhotoOnWebAppIfOfflineParams};
