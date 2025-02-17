import React from 'react';
import type {ISectionTitleRow} from '@libs/FirebaseIeatta/list/types/rows/common';
import type {IPhotoRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import Navigation from '@libs/Navigation/Navigation';
import type {TranslationPaths} from '@src/languages/types';
import ROUTES from '@src/ROUTES';
import SectionCommonTitle from './SectionCommonTitle';

type SectionPhotoTitleProps = {
    photoItem: IPhotoRow;
};

function SectionPhotoTitle({photoItem}: SectionPhotoTitleProps) {
    const {relatedId, photoType} = photoItem;
    const titleRow: ISectionTitleRow = {
        title: 'sections.titles.photos',
        isSmallScreenWidth: true,
    };

    const getCameraIconToolTip = (): TranslationPaths => {
        if (photoType === 'recipe') {
            return 'photos.takePhoto.button.recipe';
        }
        return 'photos.takePhoto.button.restaurant';
    };

    return (
        <SectionCommonTitle
            titleRow={titleRow}
            shouldShowCameraIcon
            cameraIconToolTip={getCameraIconToolTip()}
            onCameraIconPressed={() => {
                Navigation.navigate(ROUTES.TAKE_PHOTO.getRoute({relatedId, photoType}));
            }}
        />
    );
}

export default React.memo(SectionPhotoTitle);
