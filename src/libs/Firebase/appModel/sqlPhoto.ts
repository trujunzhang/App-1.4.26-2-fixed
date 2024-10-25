/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable import/prefer-default-export */
import {documentIdFromCurrentDate} from '@libs/Firebase/utils/md5_utils';
import type {IFBSqlPhoto} from '@src/types/firebase';

type ParseModelSqlPhotosEmptyPhotoParams = {filePath: string; photoTableId: string; pageId: string; relatedId: string; photoType: string};

export class ParseModelSqlPhotos {
    static emptySqlPhoto({filePath, photoTableId, pageId, relatedId, photoType}: ParseModelSqlPhotosEmptyPhotoParams) {
        const photo: IFBSqlPhoto = {
            // Base(5)
            uniqueId: documentIdFromCurrentDate(),
            // offline(1)
            offlinePath: filePath,
            // extra(1)
            relatedId,
            photoType,
            photoTableId,
            pageId,
        };
        return photo;
    }
}
