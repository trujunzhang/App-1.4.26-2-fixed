/* eslint-disable @typescript-eslint/no-explicit-any */
import type {PhotoType, ReviewType} from '@libs/FirebaseIeatta/constant';

type QueryForRealmPhotosParameter = {
    onlyRestaurants?: boolean;
    /** The ID of the related object. */
    relatedId: string;
    /** The photo type of the related object. */
    photoType: PhotoType | string;
    /** Whether to sort the array. */
    needSort?: boolean;
};

type QueryForRealmReviewsParameter = {
    /** The ID of the related object. */
    relatedId: string;
    /** The review type of the related object. */
    reviewType: ReviewType | string;
    /** Whether to sort the array. */
    needSort?: boolean;
};

type QueryForRealmRecipesParameter = {
    restaurantId: string;
    /** Whether to sort the array. */
    needSort?: boolean;
};

/**
 |--------------------------------------------------
 | Photos
 |--------------------------------------------------
 */
type QueryForRealmPhotos = (params: QueryForRealmPhotosParameter) => any;
type QueryForRealmSqlPhotos = (pageId: string, needSort?: boolean) => any;
type QueryForRealmReviews = (params: QueryForRealmReviewsParameter) => any;
type QueryForRealmRecipes = (params: QueryForRealmRecipesParameter) => any;

type SortUpdateFromNewToOld = <Type>(array: any, needSort?: boolean) => any;
type SortUpdateFromOldToNew = <Type>(array: any, needSort?: boolean) => any;

export type {
    QueryForRealmPhotos,
    QueryForRealmPhotosParameter,
    QueryForRealmSqlPhotos,
    QueryForRealmReviews,
    QueryForRealmReviewsParameter,
    QueryForRealmRecipesParameter,
    QueryForRealmRecipes,
    SortUpdateFromNewToOld,
    SortUpdateFromOldToNew,
};
