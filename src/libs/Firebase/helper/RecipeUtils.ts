import lodashGet from 'lodash/get';

/**
 * Get the currently viewed recipe ID as number
 *
 * @param route
 * @param route.params
 * @param route.params.eventId
 * @returns
 */
function getRecipeID(route: any) {
    // The eventId ID is used in an onyx key. If it's an empty string, onyx will return
    // a collection instead of an individual report.
    // We can't use the default value functionality of `lodash.get()` because it only
    // provides a default value on `undefined`, and will return an empty string.
    // Placing the default value outside of `lodash.get()` is intentional.
    return String(lodashGet(route, 'params.recipeId') || 0);
}

// eslint-disable-next-line import/prefer-default-export
export {getRecipeID};
