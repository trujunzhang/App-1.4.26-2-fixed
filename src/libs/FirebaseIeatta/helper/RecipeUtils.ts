import type {StackScreenProps} from '@react-navigation/stack';
import lodashGet from 'lodash/get';
import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {HomeSplitNavigatorParamList} from '@src/appConfig/navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';

// type RecipeScreenNavigationProps = StackScreenProps<AuthScreensParamList, typeof SCREENS.RECIPE>;
type RecipeScreenNavigationProps = PlatformStackScreenProps<HomeSplitNavigatorParamList, typeof SCREENS.RECIPE>;

/**
 * Get the currently viewed recipe ID as number
 *
 * @param route
 * @param route.params
 * @param route.params.eventId
 * @returns
 */
function getRecipeID(route: RecipeScreenNavigationProps['route']) {
    // The eventId ID is used in an onyx key. If it's an empty string, onyx will return
    // a collection instead of an individual report.
    // We can't use the default value functionality of `lodash.get()` because it only
    // provides a default value on `undefined`, and will return an empty string.
    // Placing the default value outside of `lodash.get()` is intentional.
    return String(lodashGet(route, 'params.recipeId', CONST.IEATTA_MODEL_ID_EMPTY));
}

// eslint-disable-next-line import/prefer-default-export
export {getRecipeID};
export type {RecipeScreenNavigationProps};
