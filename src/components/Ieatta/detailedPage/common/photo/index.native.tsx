import {useQuery} from '@realm/react';
import React from 'react';
import {PhotoType} from '@libs/Firebase/constant';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toPhotosList} from '@libs/Realm/helpers/realmTypeHelper';
import DetailedPhotosList from '../photoAndWaiter/DetailedPhotosList';
import type {DetailedPhotoProps} from './types';

function DetailedPhotosRow({photoRow}: DetailedPhotoProps) {
    const {relatedId, photoType} = photoRow;

    const photos = useQuery(RealmCollections.Photos, (array) => {
        switch (photoType) {
            case PhotoType.Restaurant: {
                // return array.filtered('restaurantId == $0 && photoType == $1', relatedId, photoType);
                return array.filtered('restaurantId == $0', relatedId);
            }
            case PhotoType.Recipe: {
                return array.filtered('recipeId == $0 && photoType == $1', relatedId, photoType);
            }
            default: {
                return array;
            }
        }
    });
    const photosInPage = toPhotosList(photos);

    // Log.info("")
    // Log.info("================================")
    // Log.info(`native's relatedId: ${relatedId}`)
    // Log.info(`native's photos: ${photos.length}`)
    // Log.info("================================")
    // Log.info("")

    return (
        <DetailedPhotosList
            isSmallScreenWidth
            photos={photosInPage}
        />
    );
}

export default DetailedPhotosRow;
