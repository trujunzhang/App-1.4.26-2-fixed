import _ from 'lodash';
import React from 'react';
import CommonFooter from '@components/Ieatta/components/CommonFooter';
import FBPhotosGridView from '@components/Ieatta/components/PhotosGrid/FBPhotosGridView';
import TopModalInfoPanel from '@pages/photos/online/TopModalInfoPanel';
import type {PhotosGridPageProps} from '@pages/photos/online/types';

function PhotosGridWebPage({relatedId, photoType, photosInPage}: PhotosGridPageProps) {
    return (
        <FBPhotosGridView
            relatedId={relatedId}
            photoType={photoType}
            headerContent={
                <TopModalInfoPanel
                    relatedId={relatedId}
                    photoType={photoType}
                />
            }
            footerContent={<CommonFooter />}
            photos={photosInPage}
        />
    );
}

export default PhotosGridWebPage;
