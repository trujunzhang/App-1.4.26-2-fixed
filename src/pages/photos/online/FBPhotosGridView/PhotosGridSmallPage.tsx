import React from 'react';
import FBPhotosGridView from '@components/Ieatta/components/PhotosGrid/FBPhotosGridView';
import type {PhotosGridPageProps} from '@pages/photos/online/types';

function PhotosGridSmallPage({relatedId, photoType, photosInPage}: PhotosGridPageProps) {
    return (
        <FBPhotosGridView
            relatedId={relatedId}
            photoType={photoType}
            photos={photosInPage}
        />
    );
}

export default PhotosGridSmallPage;
