// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import type {IFBEvent, IFBPhoto, IFBRecipe} from '@src/types/firebase';

function filterWaiters(event: IFBEvent | undefined, waitersInRestaurant: IFBPhoto[]) {
    const waitersString: string[] = event != null ? event.waiterIds : [];

    const waiterDict: Record<string, IFBPhoto> = Object.assign({}, ..._.map(waitersInRestaurant, (photo) => ({[photo.uniqueId]: photo})));
    const waiters = _.filter(
        _.map(waitersString, (waiterId: string) => waiterDict[waiterId]),
        (notUndefined) => notUndefined !== undefined,
    );
    return waiters;
}

function toRecipeDictInRestaurant(recipesInRestaurant: IFBRecipe[]) {
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
