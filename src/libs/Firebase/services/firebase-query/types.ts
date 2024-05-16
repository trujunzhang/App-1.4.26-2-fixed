/* eslint-disable @typescript-eslint/no-explicit-any */
import type {FBCollections, PhotoType} from '@libs/Firebase/constant';

type QueryForRestaurantsParameter = {
    search?: string;
    size?: number;
};

type QuerySingleParameter = {
    path: FBCollections | string;
    id: string;
};

type QueryInRestaurantsParameter = {
    path: FBCollections | string;
    restaurantId: string;
};

type QueryForPhotosParameter = {
    relatedId: string;
    photoType: PhotoType | string;
    size?: number;
};

type QueryForPeopleInEventsParameter = {
    eventId: string;
    restaurantId: string;
};

type QueryForRestaurants = (params: QueryForRestaurantsParameter) => any;
/**
 |--------------------------------------------------
 | Single Model
 | const docRef = doc(db, "cities", "SF");
 |--------------------------------------------------
 */
type QuerySingle = (params: QuerySingleParameter) => any;

/**
 |--------------------------------------------------
 | Event
 |--------------------------------------------------
 */
type QueryEventOrMenuInRestaurant = (parameter: QueryInRestaurantsParameter) => any;

/**
 |--------------------------------------------------
 | Photos
 |--------------------------------------------------
 */
type QueryForPhotos = (params: QueryForPhotosParameter) => any;

/**
 |--------------------------------------------------
 | Users
 |--------------------------------------------------
 */
type QueryAllUsers = () => any;

/**
|--------------------------------------------------
| PeopleInEvents
|--------------------------------------------------
*/
type QueryForPeopleInEvents = (params: QueryForPeopleInEventsParameter) => any;

export type {
    // eslint-disable-next-line import/prefer-default-export
    QueryForRestaurantsParameter,
    QueryForRestaurants,
    QuerySingleParameter,
    QuerySingle,
    QueryInRestaurantsParameter,
    QueryEventOrMenuInRestaurant,
    QueryForPhotosParameter,
    QueryForPhotos,
    QueryForPeopleInEventsParameter,
    QueryForPeopleInEvents,
    QueryAllUsers,
};
