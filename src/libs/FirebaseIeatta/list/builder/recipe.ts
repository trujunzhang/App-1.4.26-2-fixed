// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import {PhotoType, ReviewType} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow, ModalNames} from '@libs/FirebaseIeatta/list/types/page-row';
import type {IReviewOnSearchAndSortChanged} from '@libs/FirebaseIeatta/list/types/rows/review';
import type {IFBRecipe, IFBReview} from '@src/types/firebase';
import {buildPhotos} from './photo';
import {buildReviews} from './review';

type BuildRecipeRowsParams = {
    recipeId: string;
    recipe: IFBRecipe | undefined;
    reviews: IFBReview[];
    reviewChanged: IReviewOnSearchAndSortChanged;
};

type BuildRecipeHorizontalRowsParams = {
    isSmallScreenWidth: boolean;
    recipes: IFBRecipe[];
    modalName: ModalNames;
};

const buildRecipeHorizontalRows = ({isSmallScreenWidth, recipes, modalName}: BuildRecipeHorizontalRowsParams): IPageRow[] => {
    const buildRecipeRow = (item: IFBRecipe, index: number): IPageRow => {
        return {
            rowType: isSmallScreenWidth ? PageSection.RECIPE_ROW : PageSection.RECIPE_ROW_WEB,
            rowData: item,
            rowKey: `${item?.uniqueId}` ?? 'PageSection.RECIPE_ROW',
            modalName,
            pressType: RowPressableType.SECONDARY_PRESS,
        };
    };

    return _.filter(_.map(recipes, buildRecipeRow), (notUndefined) => notUndefined !== null);
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const buildRecipeRows = (isSmallScreenWidth: boolean, {recipeId, recipe, reviews, reviewChanged}: BuildRecipeRowsParams): IPageRow[] => {
    // info
    const infoPageRow: IPageRow = isSmallScreenWidth
        ? {
              rowType: PageSection.PANEL_RECIPE_INFO,
              rowData: recipe,
              rowKey: `${recipe?.uniqueId}` ?? 'PageSection.PANEL_RECIPE_INFO',
              modalName: 'header',
              pressType: RowPressableType.NO_EVENT,
          }
        : {
              rowType: PageSection.PANEL_RECIPE_INFO_WEB,
              rowData: recipe,
              rowKey: `${recipe?.uniqueId}` ?? 'PageSection.PANEL_RECIPE_INFO_WEB',
              modalName: 'header',
              pressType: RowPressableType.NO_EVENT,
          };

    return [
        // info
        infoPageRow,
        // photo
        ...buildPhotos(isSmallScreenWidth, recipeId, PhotoType.Recipe),
        // review
        ...buildReviews(isSmallScreenWidth, {relatedTitle: recipe?.displayName ?? '', relatedId: recipeId, reviewType: ReviewType.Recipe, reviews, reviewChanged}),
    ];
};

export {buildRecipeHorizontalRows, buildRecipeRows};
