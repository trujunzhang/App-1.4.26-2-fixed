import React from 'react';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import RecipeWithPhotosInfoPanel from '@components/Ieatta/detailedPage/header/RecipeWithPhotosInfoPanel';
import {PhotoType} from '@libs/Firebase/constant';
import {queryForPhotos} from '@libs/Firebase/services/firebase-query';
import type {IFBPhoto} from '@src/types/firebase';
import type {RecipeWithPhotosInfoPanelDataProps} from './types';

function RecipeWithPhotosInfoPanelData({recipe}: RecipeWithPhotosInfoPanelDataProps) {
    /**
     |--------------------------------------------------
     | List(photos)
     |--------------------------------------------------
     */
    const [photoSnapshot, loader] = useCollectionOnce(
        queryForPhotos({
            relatedId: recipe.uniqueId,
            photoType: PhotoType.Recipe,
        }),
    );

    const photos = photoSnapshot !== undefined ? _.map(photoSnapshot.docs, (item) => item.data()) : [];

    return (
        <RecipeWithPhotosInfoPanel
            recipe={recipe}
            photos={photos as IFBPhoto[]}
        />
    );
}

RecipeWithPhotosInfoPanelData.displayName = 'RecipeWithPhotosInfoPanelData';

export default React.memo(RecipeWithPhotosInfoPanelData);
