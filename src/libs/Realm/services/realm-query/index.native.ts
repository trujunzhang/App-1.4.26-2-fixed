/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {FBCollections, PhotoType} from '@libs/Firebase/constant';
import CONST from '@src/CONST';
import type {IFBPhoto} from '@src/types/firebase';
import type {QueryForRealmPhotos, QueryForRealmPhotosParameter, QueryForRealmSqlPhotos} from './types';

/**
 |--------------------------------------------------
 | Photos
 |--------------------------------------------------
 */
const queryForRealmPhotos: QueryForRealmPhotos = ({relatedId, photoType}: QueryForRealmPhotosParameter) => {
    return (array: Realm.Results<IFBPhoto>) => {
        switch (photoType) {
            case PhotoType.Restaurant: {
                return array.filtered('restaurantId == $0', relatedId);
            }
            case PhotoType.Recipe: {
                return array.filtered('recipeId == $0 && photoType == $1', relatedId, photoType);
            }
            case PhotoType.Waiter: {
                return array.filtered('restaurantId  == $0 && photoType == $1', relatedId, photoType);
            }
            default: {
                return array;
            }
        }
    };
};
const queryForRealmSqlPhotos: QueryForRealmSqlPhotos = (pageId: string) => {
    return (array: Realm.Results<IFBPhoto>) => {
        if (pageId === CONST.IEATTA_LOCAL_PHOTOS_SHOW_ALL) {
            return array;
        }
        return array.filtered('pageId == $0', pageId);
    };
};

// eslint-disable-next-line import/prefer-default-export
export {queryForRealmPhotos, queryForRealmSqlPhotos};
