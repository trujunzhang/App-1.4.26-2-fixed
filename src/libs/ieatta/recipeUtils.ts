// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import {ChoiceRecipeItem} from '@components/Ieatta/components/Selections/types';
import {SectionListDataType} from '@components/SelectionList/types';
import type {IFBRecipe} from '@src/types/firebase';

type ConvertToRadioItemParamsForRecipes = {
    title: string;
    searchValue: string;
    recipeIds: string[];
    recipeDictInRestaurant: Record<string, IFBRecipe>;
};

function convertToRadioItemForRecipes({title, searchValue, recipeDictInRestaurant, recipeIds}: ConvertToRadioItemParamsForRecipes): Array<SectionListDataType<ChoiceRecipeItem>> {
    let filteredRecipes = Object.values(recipeDictInRestaurant);

    if (searchValue !== '') {
        filteredRecipes = _.filter(Object.values(recipeDictInRestaurant), (recipe) => {
            return recipe.displayName.toLowerCase().includes(searchValue.toLowerCase());
        });
    }
    return [
        {
            title,
            shouldShow: true,
            data: _.map(filteredRecipes, (recipe) => {
                return {
                    recipeId: recipe.uniqueId,
                    recipeUrl: recipe.originalUrl,
                    text: recipe.displayName,
                    alternateText: recipe.price,
                    isDisabled: false,
                    isSelected: recipeIds.includes(recipe.uniqueId),
                };
            }),
        },
    ];
}

export {
    // eslint-disable-next-line import/prefer-default-export
    convertToRadioItemForRecipes,
};
