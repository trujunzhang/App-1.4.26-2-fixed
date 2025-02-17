/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {PhotoType, ReviewType} from '@libs/FirebaseIeatta/constant';
import CONST from '@src/CONST';
import type {IFBPhoto, IFBRecipe, IFBReview, IFBSqlPhoto} from '@src/types/firebase';
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
const queryForRealmPhotos: QueryForRealmPhotos = ({relatedId, photoType, onlyRestaurants = false, needSort = true}: QueryForRealmPhotosParameter) => {
    return (array: Realm.Results<IFBPhoto>) => {
        switch (photoType) {
            case PhotoType.Restaurant: {
                if (onlyRestaurants) {
                    return sortUpdateFromNewToOld(array.filtered('restaurantId  == $0 && photoType == $1', relatedId, photoType), needSort);
                }
                return sortUpdateFromNewToOld(array.filtered('restaurantId == $0', relatedId), needSort);
            }
            case PhotoType.Recipe: {
                return sortUpdateFromNewToOld(array.filtered('recipeId == $0 && photoType == $1', relatedId, photoType), needSort);
            }
            case PhotoType.Waiter: {
                return sortUpdateFromNewToOld(array.filtered('restaurantId  == $0 && photoType == $1', relatedId, photoType), needSort);
            }
            default: {
                return sortUpdateFromNewToOld(array, needSort);
            }
        }
    };
};
const queryForRealmSqlPhotos: QueryForRealmSqlPhotos = (pageId: string, needSort = true) => {
    return (array: Realm.Results<IFBSqlPhoto>) => {
        if (pageId === CONST.IEATTA_LOCAL_PHOTOS_SHOW_ALL) {
            return sortUpdateFromOldToNew(array);
        }
        return sortUpdateFromOldToNew(array.filtered('pageId == $0', pageId), needSort);
    };
};

const queryForRealmReviews: QueryForRealmReviews = ({relatedId, reviewType, needSort = true}: QueryForRealmReviewsParameter) => {
    return (array: Realm.Results<IFBReview>) => {
        switch (reviewType) {
            case ReviewType.Restaurant: {
                return sortUpdateFromNewToOld(array.filtered('restaurantId == $0 && reviewType == $1', relatedId, ReviewType.Restaurant), needSort);
            }
            case ReviewType.Recipe: {
                return sortUpdateFromNewToOld(array.filtered('recipeId  == $0 && reviewType == $1', relatedId, ReviewType.Recipe), needSort);
            }
            case ReviewType.Event: {
                return sortUpdateFromNewToOld(array.filtered('eventId  == $0 && reviewType == $1', relatedId, ReviewType.Event), needSort);
            }
            default: {
                return sortUpdateFromNewToOld(array, needSort);
            }
        }
    };
};

const queryForRealmRecipes: QueryForRealmRecipes = ({restaurantId, needSort}: QueryForRealmRecipesParameter) => {
    return (array: Realm.Results<IFBRecipe>) => {
        return sortUpdateFromNewToOld(array.filtered('restaurantId == $0', restaurantId), needSort);
    };
};

const sortUpdateFromNewToOld: SortUpdateFromNewToOld = <Type>(array: Realm.Results<Type>, needSort = true) => {
    if (needSort) {
        return array.sorted('updatedAt', true);
    }
    return array;
};

const sortUpdateFromOldToNew: SortUpdateFromOldToNew = <Type>(array: Realm.Results<Type>, needSort = true) => {
    if (needSort) {
        return array.sorted('updatedAt', false);
    }
    return array;
};

// eslint-disable-next-line import/prefer-default-export
export {queryForRealmPhotos, queryForRealmSqlPhotos, queryForRealmReviews, queryForRealmRecipes, sortUpdateFromNewToOld, sortUpdateFromOldToNew};
