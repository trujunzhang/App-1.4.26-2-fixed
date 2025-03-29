/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import React from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import DetailedPhotosList from '@components/Ieatta/detailedPage/common/photoAndWaiter/DetailedPhotosList';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import type {IFBPhoto} from '@src/types/firebase';
import type {DetailedPhotoProps} from './types';

// This component is used in the detailed page.
// That shows the photos on the web app on the small screen.
function DetailedPhotosRow({photoRow}: DetailedPhotoProps) {
    const {relatedId, photoType} = photoRow;

    /**
     |--------------------------------------------------
     | List(photos)
     |--------------------------------------------------
     */
    const [photosSnapshot, loading, error] = useCollection(
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
