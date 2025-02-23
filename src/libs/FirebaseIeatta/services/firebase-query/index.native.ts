import type {
    QueryAllUsers,
    QueryEventOrMenuInRestaurant,
    QueryForPeopleInEventsParameter,
    QueryForPhotos,
    QueryForPhotosParameter,
    QueryForRestaurants,
    QueryForRestaurantsParameter,
    QueryInRestaurantsParameter,
    QuerySingle,
    QuerySingleParameter,
} from './types';

const queryForRestaurants: QueryForRestaurants = (params: QueryForRestaurantsParameter) => {};

/**
 |--------------------------------------------------
 | Single Model
 | const docRef = doc(db, "cities", "SF");
 |--------------------------------------------------
 */
const querySingle: QuerySingle = (params: QuerySingleParameter) => {};

const queryEventOrMenuInRestaurant: QueryEventOrMenuInRestaurant = (params: QueryInRestaurantsParameter) => {};
const queryForPhotos: QueryForPhotos = (params: QueryForPhotosParameter) => {};

/**
 |--------------------------------------------------
 | Users
 |--------------------------------------------------
 */
const queryAllUsers: QueryAllUsers = () => {};

/**
|--------------------------------------------------
| PeopleInEvents
|--------------------------------------------------
*/
const queryForPeopleInEvents = (params: QueryForPeopleInEventsParameter) => {};

export {
    // eslint-disable-next-line import/prefer-default-export
    queryForRestaurants,
    querySingle,
    queryEventOrMenuInRestaurant,
    queryForPhotos,
    queryForPeopleInEvents,
    queryAllUsers,
};
