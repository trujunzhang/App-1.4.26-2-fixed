import type {IFBPhoto} from '@src/types/firebase';
import {ParseModelPhotos} from '../appModel/photo';
import {FBCollections} from '../constant';
import {CloudinaryUtils} from '../utils/cloudinary_utils';
// import { SqlRepository } from '@shared-sql/repository/sql-repository'
// eslint-disable-next-line import/no-named-as-default
import FirebaseHelper from './firebase-helper';

// import {deleteLocalImage} from '@shared-sql/model/sql-photo'

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
}

export default FirebasePhoto;
