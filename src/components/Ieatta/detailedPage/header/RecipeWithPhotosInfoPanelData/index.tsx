/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import React from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import RecipeWithPhotosInfoPanel from '@components/Ieatta/detailedPage/header/RecipeWithPhotosInfoPanel';
import {FBCollections, PhotoType} from '@libs/FirebaseIeatta/constant';
import {printFirebaseError} from '@libs/FirebaseIeatta/services/firebase-error-helper';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import type {IFBPhoto} from '@src/types/firebase';
import type {RecipeWithPhotosInfoPanelDataProps} from './types';

function RecipeWithPhotosInfoPanelData({recipe}: RecipeWithPhotosInfoPanelDataProps) {
    /**
     |--------------------------------------------------
     | List(photos)
     |--------------------------------------------------
     */
    const [photoSnapshot, loading, error] = useCollection<IFBPhoto>(
        FirebaseQuery.queryForPhotos({
            relatedId: recipe.uniqueId,
            photoType: PhotoType.Recipe,
        }),
    );

    // issue:
    //     FirebaseError: The query requires an index. You can create it here
    printFirebaseError(FBCollections.Recipes, error);

    const photos: IFBPhoto[] = photoSnapshot !== undefined ? _.map(photoSnapshot.docs, (item) => item.data()) : [];

    return (
        <RecipeWithPhotosInfoPanel
            recipe={recipe}
            photos={photos}
        />
    );
}

RecipeWithPhotosInfoPanelData.displayName = 'RecipeWithPhotosInfoPanelData';

export default React.memo(RecipeWithPhotosInfoPanelData);
