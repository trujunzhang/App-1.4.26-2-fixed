// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import React from 'react';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
import DetailedPhotosList from '@components/Ieatta/detailedPage/common/photoAndWaiter/DetailedPhotosList';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import type {IFBPhoto} from '@src/types/firebase';
import type {DetailedPhotoProps} from './types';

function DetailedPhotosRow({photoRow}: DetailedPhotoProps) {
    const {relatedId, photoType} = photoRow;

    /**
     |--------------------------------------------------
     | List(photos)
     |--------------------------------------------------
     */
    const [photosSnapshot, loader] = useCollectionOnce(
        FirebaseQuery.queryForPhotos({
            relatedId,
            photoType,
        }),
    );

    const photosInPage = photosSnapshot === undefined ? [] : _.map(photosSnapshot.docs, (item) => item.data() as IFBPhoto);

    return (
        <DetailedPhotosList
            relatedId={relatedId}
            photoType={photoType}
            isSmallScreen
            photos={photosInPage}
        />
    );
}

export default DetailedPhotosRow;
