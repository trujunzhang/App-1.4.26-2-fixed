/* eslint-disable @dword-design/import-alias/prefer-alias */

/* eslint-disable no-param-reassign */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import type {IAuthUser} from '@libs/Firebase/models/auth_user_model';
import type {IFBPhoto} from '@src/types/firebase';
import {FBCollections, PhotoType} from '../constant';
import {documentIdFromCurrentDate} from '../utils/md5_utils';
import {getDateStringForCreatedOrUpdatedDate} from '../utils/timeago_helper';

type ParseModelPhotosEmptyPhotoParams = {authUserModel: IAuthUser; photoUniqueId?: string; relatedId: string; photoType: string; filePath: string};

// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export class ParseModelPhotos {
    static emptyPhoto({authUserModel, photoUniqueId = documentIdFromCurrentDate(), relatedId, photoType, filePath}: ParseModelPhotosEmptyPhotoParams) {
        const photo: IFBPhoto = {
            // Base(5)
            uniqueId: photoUniqueId,
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
                    creatorId: '',
                    originalUrl: '',
                    photoType: PhotoType.Unknown,
                } as IFBPhoto);
            }
            return photosWithPlaceholder;
        }
        return photos;
    }

    static isPlacehoderphoto(photo: IFBPhoto) {
        return photo.originalUrl === '' && photo.photoType === PhotoType.Unknown && photo.creatorId === '';
    }

    static getCollectionName(photoType: string) {
        switch (photoType) {
            case PhotoType.Recipe:
                return FBCollections.Recipes;
            case PhotoType.Restaurant:
                return FBCollections.Restaurants;
            case PhotoType.User:
                return FBCollections.Profiles;
            default:
                return FBCollections.Unknown;
        }
    }
}

export type {ParseModelPhotosEmptyPhotoParams};
