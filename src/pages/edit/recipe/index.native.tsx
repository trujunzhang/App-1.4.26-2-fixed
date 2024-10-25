import type {StackScreenProps} from '@react-navigation/stack';
import {useObject} from '@realm/react';
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {emptyRecipeTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
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
    const recipeInRealm = useObject<IFBRecipe>(RealmCollections.Recipes, recipeId);
    const recipe: IFBRecipe | undefined = _.isNull(recipeInRealm) === false ? (recipeInRealm as IFBRecipe) : undefined;

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
