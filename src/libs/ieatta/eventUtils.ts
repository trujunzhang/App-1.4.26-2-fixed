/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import type {IFBEvent, IFBPhoto, IFBRecipe} from '@src/types/firebase';

function filterWaiters(event: IFBEvent | undefined, waitersInRestaurant: IFBPhoto[]) {
    const waitersArray: string[] = event != null ? event.waiterIds : [];

    const waiterDict: Record<string, IFBPhoto> = Object.assign({}, ..._.map(waitersInRestaurant, (photo) => ({[photo.uniqueId]: photo})));
    const waiters = _.filter(
        _.map(waitersArray, (waiterId: string) => waiterDict[waiterId]),
        (notUndefined) => notUndefined !== undefined,
    );
    return waiters;
}

function toRecipeDictInRestaurant(recipesInRestaurant: IFBRecipe[]): Record<string, IFBRecipe> {
    const recipeDictInRestaurant: Record<string, IFBRecipe> = Object.assign({}, ..._.map(recipesInRestaurant, (recipe) => ({[recipe.uniqueId]: recipe})));

    return recipeDictInRestaurant;
}

function filterRecipes(recipeIds: string[], recipeDictInRestaurant: Record<string, IFBRecipe>) {
    const recipes: IFBRecipe[] = _.filter(
        _.map(recipeIds, (recipeId) => recipeDictInRestaurant[recipeId]),
        (notUndefined) => notUndefined !== undefined,
    );

    return recipes;
}

// eslint-disable-next-line import/prefer-default-export
export {filterWaiters, toRecipeDictInRestaurant, filterRecipes};
