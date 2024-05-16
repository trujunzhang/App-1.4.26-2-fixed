import React from 'react';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import {queryForPhotos} from '@libs/Firebase/services/firebase-query';
import type {IFBPhoto} from '@src/types/firebase';
import DetailedPhotosList from '../photoAndWaiter/DetailedPhotosList';
import type {DetailedPhotoProps} from './types';

function DetailedPhotosRow({photoRow}: DetailedPhotoProps) {
    const {relatedId, photoType} = photoRow;

    /**
     |--------------------------------------------------
     | List(photos)
     |--------------------------------------------------
     */
    const [photosSnapshot, loader] = useCollectionOnce(
        queryForPhotos({
            relatedId,
            photoType,
        }),
    );

    const photosInPage = photosSnapshot === undefined ? [] : _.map(photosSnapshot.docs, (item) => item.data() as IFBPhoto);

    return (
        <DetailedPhotosList
            isSmallScreenWidth
            photos={photosInPage}
        />
    );
}

export default DetailedPhotosRow;
