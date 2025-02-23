// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import type {QuerySnapshot, SyncFBEvents, SyncFBPeopleInEvents, SyncFBPhotos, SyncFBRecipes, SyncFBRestaurants, SyncFBReviews, SyncFBUsers} from './types';

const syncFBUsers: SyncFBUsers = (querySnapshot: QuerySnapshot) => {};

const syncFBRestaurants: SyncFBRestaurants = (querySnapshot: QuerySnapshot) => {};

const syncFBEvents: SyncFBEvents = (querySnapshot: QuerySnapshot) => {};

const syncFBRecipes: SyncFBRecipes = (querySnapshot: QuerySnapshot) => {};

const syncFBPhotos: SyncFBPhotos = (querySnapshot: QuerySnapshot) => {};

const syncFBReviews: SyncFBReviews = (querySnapshot: QuerySnapshot) => {};

const syncFBPeopleInEvents: SyncFBPeopleInEvents = (querySnapshot: QuerySnapshot) => {};

export {syncFBUsers, syncFBRestaurants, syncFBEvents, syncFBRecipes, syncFBPhotos, syncFBReviews, syncFBPeopleInEvents};
