/* eslint-disable @typescript-eslint/no-unsafe-return */
import type {
    QueryForRealmPhotos,
    QueryForRealmPhotosParameter,
    QueryForRealmRecipes,
    QueryForRealmRecipesParameter,
    QueryForRealmReviews,
    QueryForRealmReviewsParameter,
    QueryForRealmSqlPhotos,
    SortUpdateFromNewToOld,
    SortUpdateFromOldToNew,
} from './types';

/**
 |--------------------------------------------------
 | Photos
 |--------------------------------------------------
 */
const queryForRealmPhotos: QueryForRealmPhotos = (params: QueryForRealmPhotosParameter) => {};
const queryForRealmSqlPhotos: QueryForRealmSqlPhotos = (pageId: string, needSort = true) => {};
const queryForRealmReviews: QueryForRealmReviews = (params: QueryForRealmReviewsParameter) => {};
const queryForRealmRecipes: QueryForRealmRecipes = (params: QueryForRealmRecipesParameter) => {};

const sortUpdateFromNewToOld: SortUpdateFromNewToOld = <Type>(array: any, needSort = true) => array;
const sortUpdateFromOldToNew: SortUpdateFromOldToNew = <Type>(array: any, needSort = true) => array;

// eslint-disable-next-line import/prefer-default-export
export {queryForRealmPhotos, queryForRealmSqlPhotos, queryForRealmReviews, queryForRealmRecipes, sortUpdateFromNewToOld, sortUpdateFromOldToNew};
