/* eslint-disable @typescript-eslint/no-explicit-any */
import type {PhotoType} from '@libs/Firebase/constant';

type QueryForRealmPhotosParameter = {
    /** The ID of the related object. */
    relatedId: string;
    /** The photo type of the related object. */
    photoType: PhotoType | string;
};

/**
 |--------------------------------------------------
 | Photos
 |--------------------------------------------------
 */
type QueryForRealmPhotos = (params: QueryForRealmPhotosParameter) => any;
type QueryForRealmSqlPhotos = (pageId: string) => any;

export type {QueryForRealmPhotos, QueryForRealmPhotosParameter, QueryForRealmSqlPhotos};
