/* eslint-disable @lwc/lwc/no-async-await */
import {ParseModelPhotos} from '@libs/FirebaseIeatta/appModel';
import type {ParseModelPhotosEmptyPhotoParams} from '@libs/FirebaseIeatta/appModel/photo';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
// import { SqlRepository } from '@shared-sql/repository/sql-repository'
// eslint-disable-next-line import/no-named-as-default
import {CloudinaryUtils} from '@libs/FirebaseIeatta/utils/cloudinaryUtils';
import Log from '@libs/Log';
import type {IFBPhoto} from '@src/types/firebase';
import FirebaseHelper from './firebase-helper';

// import {deleteLocalImage} from '@shared-sql/model/sql-photo'

type SaveTakenPhotoIfOfflineParams = {
    imagePath: string;
    isOnWeb: boolean;
    isSyncing?: boolean;
    emptyParams: ParseModelPhotosEmptyPhotoParams;
};

class FirebasePhoto {
    // eslint-disable-next-line @lwc/lwc/no-async-await
    async savePhoto({imagePath, model}: {imagePath: string; model: IFBPhoto}) {
        // const isNetworkPresent = await NetworkCheck.check()
        const isNetworkPresent = true;
        // const isNetworkPresent = false

        if (isNetworkPresent) {
            try {
                await FirebasePhoto.savePhotoWithCloudinary({
                    imagePath,
                    uniqueId: model.uniqueId,
                });
                // await deleteLocalImage(imagePath)
            } catch (error) {
                // Exception throw from uploading image to cloudinary
                // Save it as Sqlite.
                // await this._saveAsSqlPhoto({uniqueId: model.uniqueId!, imagePath})
            }
        } else {
            // No network.
            // Save it as Sqlite.
            // await this._saveAsSqlPhoto({uniqueId: model.uniqueId!, imagePath})
        }
    }

    // async _saveAsSqlPhoto({uniqueId, imagePath}: { uniqueId: string; imagePath: string }) {
    // await SqlRepository.insertPhoto({id: uniqueId, offlinePath: imagePath})
    // }

    static async savePhotoWithCloudinary({imagePath, uniqueId}: {imagePath: string; uniqueId: string}) {
        // Update the photo model.
        const data = await new FirebaseHelper().getData({
            path: FBCollections.Photos,
            id: uniqueId,
        });
        const model: IFBPhoto | undefined = data as IFBPhoto | undefined;
        if (model !== undefined && model !== null) {
            // Upload image to Cloudinary.
            const originalUrl: string = await CloudinaryUtils.uploadToCloudinary(imagePath);
            const nextModel = ParseModelPhotos.updateFromCloudinary({
                model: {...model},
                originalUrl,
            });
            // Finally: Save photo to Firebase collection.
            await new FirebaseHelper().setData({
                path: FBCollections.Photos,
                model: nextModel,
            });
        }
    }

    /**
     * Save taken photo as Firebase collection.
     *
     * @param imagePath - the local path of the taken photo, without 'file://'.
     */
    static async saveTakenPhotoIfOffline({imagePath, isOnWeb, isSyncing = false, emptyParams}: SaveTakenPhotoIfOfflineParams): Promise<string> {
        let photoUrl = `file://${imagePath}`;
        let uploadToCloudinarySucess = false;
        try {
            const url = await CloudinaryUtils.uploadToCloudinary(imagePath);
            photoUrl = url;
            uploadToCloudinarySucess = true;

            Log.info(`get cloudinary url after taking photo: ${url}`);
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
            originalUrl: photoUrl,
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
}

export default FirebasePhoto;
