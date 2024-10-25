import type {QueryForRealmPhotos, QueryForRealmPhotosParameter, QueryForRealmSqlPhotos} from './types';

/**
 |--------------------------------------------------
 | Photos
 |--------------------------------------------------
 */
const queryForRealmPhotos: QueryForRealmPhotos = ({relatedId, photoType}: QueryForRealmPhotosParameter) => {};
const queryForRealmSqlPhotos: QueryForRealmSqlPhotos = (pageId: string) => {};

// eslint-disable-next-line import/prefer-default-export
export {queryForRealmPhotos, queryForRealmSqlPhotos};
