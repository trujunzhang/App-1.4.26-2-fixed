import type {StackScreenProps} from '@react-navigation/stack';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import {FBCollections} from '@libs/Firebase/constant';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import {emptyRecipeTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBRecipe} from '@src/types/firebase';
import BaseEditRecipePage from './BaseEditRecipePage';

type EditRecipeNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.RECIPE>;

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

    return (
        <BaseEditRecipePage
            key={lodashGet(recipe, 'uniqueId', emptyRecipeTag)}
            restaurantId={restaurantId}
            recipeId={recipeId}
            recipe={recipe}
            isNewModel={recipeId === CONST.IEATTA_EDIT_MODEL_NEW}
        />
    );
}

EditRecipePage.displayName = 'EditRecipePage';

export default EditRecipePage;
