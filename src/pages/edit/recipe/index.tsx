/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {StackScreenProps} from '@react-navigation/stack';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useEffect} from 'react';
import {useCollectionOnce, useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import {FBCollections, PhotoType} from '@libs/FirebaseIeatta/constant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {emptyRecipeTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import Variables from '@styles/variables';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBPhoto, IFBRecipe} from '@src/types/firebase';
import BaseEditRecipePage from './BaseEditRecipePage';

type EditRecipeNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.RECIPE>;

// eslint-disable-next-line @typescript-eslint/ban-types
type EditRecipePageProps = EditRecipeNavigationProps & {};

function EditRecipePage(props: EditRecipePageProps) {
    const recipeId = lodashGet(props.route, 'params.recipeId', emptyRecipeTag);
    const restaurantId = lodashGet(props.route, 'params.restaurantId', emptyRestaurantTag);

    /**
      |--------------------------------------------------
      | Single(Recipe)
      |--------------------------------------------------
      */
    const [recipe, loadingForRecipe, errorForRecipe] = useDocumentDataOnce<IFBRecipe>(
        FirebaseQuery.querySingle({
            path: FBCollections.Recipes,
            id: recipeId,
        }),
    );

    /**
     |--------------------------------------------------
     | List(photos)
     |--------------------------------------------------
     */
    const [photosSnapshot, loader] = useCollectionOnce(
        FirebaseQuery.queryForPhotos({
            relatedId: recipeId,
            photoType: PhotoType.Recipe,
        }),
    );

    const photosInPage = photosSnapshot === undefined ? [] : _.map(photosSnapshot.docs, (item) => item.data() as IFBPhoto);

    // eslint-disable-next-line @lwc/lwc/no-async-await
    const onAfterSelectedCover = async (firebasePhotoId: string) => {};

    return (
        <BaseEditRecipePage
            key={lodashGet(recipe, 'uniqueId', emptyRecipeTag)}
            initialPanelWidth={Variables.sideBarWidth - 40 * 2}
            restaurantId={restaurantId}
            recipeId={recipeId}
            recipe={recipe}
            isNewModel={recipeId === CONST.IEATTA_EDIT_MODEL_NEW}
            photosInPage={photosInPage}
            onAfterSelectedCover={onAfterSelectedCover}
        />
    );
}

EditRecipePage.displayName = 'EditRecipePage';

export default EditRecipePage;
