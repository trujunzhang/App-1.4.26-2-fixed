import events from 'events';
// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import {PhotoType, ReviewType} from '@libs/Firebase/constant';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import type {IPageRow} from '@libs/Firebase/list/types/page-row';
import type {IReviewOnSearchAndSortChanged} from '@libs/Firebase/list/types/rows/review';
import type {IFBRecipe, IFBReview} from '@src/types/firebase';
import {buildPhotos} from './photo';
import {buildReviews} from './review';

type BuildRecipeRowsParams = {
    recipeId: string;
    recipe: IFBRecipe | undefined;
    reviews: IFBReview[];
    reviewChanged: IReviewOnSearchAndSortChanged;
};

const buildRecipeHorizontalRows = (isSmallScreenWidth: boolean, recipes: IFBRecipe[]): IPageRow[] => {
    const buildRecipeRow = (item: IFBRecipe, index: number) => {
        return {
            rowType: isSmallScreenWidth ? PageSection.RECIPE_ROW : PageSection.RECIPE_ROW_WEB,
            rowData: item,
            rowKey: `${item?.uniqueId}` ?? 'PageSection.RECIPE_ROW',
            pressType: RowPressableType.SECONDARY_PRESS,
        };
    };

    return _.filter(_.map(recipes, buildRecipeRow), (notUndefined) => notUndefined !== null);
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const buildRecipeRows = (isSmallScreenWidth: boolean, {recipeId, recipe, reviews, reviewChanged}: BuildRecipeRowsParams): IPageRow[] => {
    // info
    const infoRow = isSmallScreenWidth
        ? {
              rowType: PageSection.PANEL_RECIPE_INFO,
              rowData: recipe,
              rowKey: `${recipe?.uniqueId}` ?? 'PageSection.PANEL_RECIPE_INFO',
              pressType: RowPressableType.NO_EVENT,
          }
        : {
              rowType: PageSection.PANEL_RECIPE_INFO_WEB,
              rowData: recipe,
              rowKey: `${recipe?.uniqueId}` ?? 'PageSection.PANEL_RECIPE_INFO_WEB',
              pressType: RowPressableType.NO_EVENT,
          };

    return [
        // info
        infoRow,
        // photo
        ...buildPhotos(isSmallScreenWidth, recipeId, PhotoType.Recipe),
        // review
        ...buildReviews(isSmallScreenWidth, {relatedTitle: recipe?.displayName ?? '', relatedId: recipeId, reviewType: ReviewType.Recipe, reviews, reviewChanged}),
    ];
};

// eslint-disable-next-line import/prefer-default-export
export {buildRecipeHorizontalRows, buildRecipeRows};
