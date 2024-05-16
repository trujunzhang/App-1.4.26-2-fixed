/* eslint-disable @dword-design/import-alias/prefer-alias */

/* eslint-disable no-param-reassign */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import type {IAuthUser} from '@libs/Firebase/models/auth_user_model';
import type {IFBPhoto} from '@src/types/firebase';
import {PhotoType} from '../constant';
import {documentIdFromCurrentDate} from '../utils/md5_utils';
import {getDateStringForCreatedOrUpdatedDate} from '../utils/timeago_helper';

// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export class ParseModelPhotos {
    static emptyPhoto({authUserModel, relatedId, photoType, filePath}: {authUserModel: IAuthUser; relatedId: string; photoType: string; filePath: string}) {
        const photo: IFBPhoto = {
            // Base(5)
            uniqueId: documentIdFromCurrentDate(),
            creatorId: authUserModel.uid,
            createdAt: getDateStringForCreatedOrUpdatedDate(),
            updatedAt: getDateStringForCreatedOrUpdatedDate(),
            flag: '1',
            // user(2)
            username: authUserModel.displayName ?? '',
            avatarUrl: authUserModel.photoURL ?? '',
            // Common
            originalUrl: '',
            thumbnailUrl: '',
            // point(4)
            photoType,
            restaurantId: photoType === PhotoType.Restaurant ? relatedId : '',
            recipeId: photoType === PhotoType.Recipe ? relatedId : '',
            userId: photoType === PhotoType.User ? relatedId : '',
            // offline(1)
            offlinePath: filePath,
            // extra(1)
            extraNote: '',
        };
        return photo;
    }

    static updatePhoto({model, nextExtraNote}: {model: IFBPhoto; nextExtraNote: string}) {
        model.extraNote = nextExtraNote;
        model.updatedAt = getDateStringForCreatedOrUpdatedDate();

        return model;
    }

    static updateFromCloudinary({model, originalUrl}: {model: IFBPhoto; originalUrl: string}) {
        model.originalUrl = originalUrl;
        return model;
    }

    static getPhotoWithPlaceholder(photos: IFBPhoto[]) {
        const photosWithPlaceholder: IFBPhoto[] = [...photos];
        const photoLength = photos.length;
        if (photoLength < 4) {
            const placeholderLength = 4 - photoLength;
            for (let i = 0; i < placeholderLength; i++) {
                photosWithPlaceholder.push({
                    uniqueId: `${i}`,
                    originalUrl: '',
                } as IFBPhoto);
            }
            return photosWithPlaceholder;
        }
        return photos;
    }
}
