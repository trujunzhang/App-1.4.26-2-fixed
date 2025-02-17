// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import {PhotoType} from '@libs/FirebaseIeatta/constant';
import type {IFBEvent, IFBPhoto} from '@src/types/firebase';
import {filterWaiters} from './eventUtils';

function getPhotoWithId(photos: IFBPhoto[], photoId: string) {
    return _.find(photos, (photo: IFBPhoto) => {
        return photo.uniqueId === photoId;
    });
}

function getPhotoIndexWithId(photos: IFBPhoto[], photoId: string) {
    return _.findIndex(photos, (photo: IFBPhoto) => {
        return photo.uniqueId === photoId;
    });
}

function getPhotosForPage(photosInPage: IFBPhoto[], photoType: PhotoType | string, event: IFBEvent | undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (photoType === PhotoType.Waiter) {
        const waitersInEvent = filterWaiters(event, photosInPage);
        return waitersInEvent;
    }
    return photosInPage;
}

export {
    // eslint-disable-next-line import/prefer-default-export
    getPhotoWithId,
    getPhotoIndexWithId,
    getPhotosForPage,
};
