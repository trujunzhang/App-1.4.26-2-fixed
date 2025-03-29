/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable import/prefer-default-export */
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import {documentIdFromCurrentDate} from '@libs/FirebaseIeatta/utils/md5_utils';
import {getDateStringForCreatedOrUpdatedDate} from '@libs/FirebaseIeatta/utils/timeago_helper';
import {RealmCollections} from '@libs/Realm/constant';
import type {IFBSqlPhoto, SQLPhotoCoverType, SQLPhotoCoverTypeWithUnknow} from '@src/types/firebase';

type ParseModelSqlPhotosEmptyPhotoParams = {filePath: string; firebasePhotoId: string; pageId: string; relatedId: string; photoType: string};

export class ParseModelSqlPhotos {
    static emptySqlPhoto({filePath, firebasePhotoId, pageId, relatedId, photoType}: ParseModelSqlPhotosEmptyPhotoParams) {
        const photo: IFBSqlPhoto = {
            // Base(3)
            uniqueId: documentIdFromCurrentDate(),
            createdAt: getDateStringForCreatedOrUpdatedDate(),
            updatedAt: getDateStringForCreatedOrUpdatedDate(),
            // offline(1)
            offlinePath: filePath,
            // extra(1)
            relatedId,
            photoType,
            firebasePhotoId,
            pageId,
            coverId: '',
            coverType: RealmCollections.Unknown,
        };
        return photo;
    }

    static updateCover({model, coverId, coverType}: {model: IFBSqlPhoto; coverId: string; coverType: SQLPhotoCoverType}): IFBSqlPhoto {
        const nextModal: IFBSqlPhoto = {...model};
        nextModal.coverId = coverId;
        nextModal.coverType = coverType;
        nextModal.updatedAt = getDateStringForCreatedOrUpdatedDate();

        return nextModal;
    }

    static toFBCollection(realmCollection: SQLPhotoCoverTypeWithUnknow): FBCollections.Restaurants | FBCollections.Recipes {
        switch (realmCollection) {
            case RealmCollections.Restaurants:
                return FBCollections.Restaurants;
            case RealmCollections.Recipes:
                return FBCollections.Recipes;
            default:
                throw Error(`Unknown collection: ${realmCollection}`);
        }
    }
}
