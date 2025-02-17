/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type {DocumentReference, Query} from 'firebase/firestore';
import {collection, doc, limit, orderBy, query, where} from 'firebase/firestore';
import {db} from '@libs/FirebaseIeatta/config/firebase';
import {FBCollections, PhotoType} from '@libs/FirebaseIeatta/constant';
import type {IFBPeopleInEvent} from '@src/types/firebase';
import type {
    QueryAllUsers,
    QueryEventOrMenuInRestaurant,
    QueryForPeopleInEvents,
    QueryForPeopleInEventsParameter,
    QueryForPhotos,
    QueryForPhotosParameter,
    QueryForRestaurants,
    QueryForRestaurantsParameter,
    QueryInRestaurantsParameter,
    QuerySingle,
    QuerySingleParameter,
} from './types';

const queryForRestaurants: QueryForRestaurants = ({size, search}: QueryForRestaurantsParameter) => {
    const queryConstraints = [];
    if (size !== -1 && size !== undefined) {
        queryConstraints.push(limit(size));
    }
    if (search !== null && search !== undefined && search !== '') {
        // queryConstraints.push(where('displayName', '>=', search));
        // queryConstraints.push(orderBy('displayName', 'desc'));
        queryConstraints.push(where('displayName', '>=', search));
        queryConstraints.push(where('displayName', '<=', `${search}\uf8ff`));

        // .where("dbField1", ">=", searchString)
        // .where("dbField1", "<=", searchString + "\uf8ff");
    }
    // Finally
    queryConstraints.push(orderBy('updatedAt', 'desc'));

    return query(collection(db, FBCollections.Restaurants), ...queryConstraints);
};

/**
 |--------------------------------------------------
 | Single Model
 | const docRef = doc(db, "cities", "SF");
 |--------------------------------------------------
 */
const querySingle: QuerySingle = ({path, id}: QuerySingleParameter): DocumentReference => {
    return doc(db, path, id);
};

/**
 |--------------------------------------------------
 | Event
 |--------------------------------------------------
 */
const queryEventOrMenuInRestaurant: QueryEventOrMenuInRestaurant = ({path, restaurantId}: QueryInRestaurantsParameter): Query => {
    return query(collection(db, path), where('restaurantId', '==', restaurantId));
};

/**
 |--------------------------------------------------
 | Photos
 |--------------------------------------------------
 */
const queryForPhotos: QueryForPhotos = ({relatedId, photoType, size = -1}: QueryForPhotosParameter): Query => {
    const queryConstraints = [];
    if (size !== -1) {
        queryConstraints.push(limit(size));
    }
    switch (photoType) {
        case PhotoType.Restaurant: {
            queryConstraints.push(where('photoType', '==', photoType));
            queryConstraints.push(where('restaurantId', '==', relatedId));
            break;
        }
        case PhotoType.Waiter: {
            queryConstraints.push(where('photoType', '==', photoType));
            queryConstraints.push(where('restaurantId', '==', relatedId));
            break;
        }
        case PhotoType.Recipe: {
            queryConstraints.push(where('photoType', '==', photoType));
            queryConstraints.push(where('recipeId', '==', relatedId));
            break;
        }
        default: {
            break;
        }
    }
    return query(collection(db, FBCollections.Photos), ...queryConstraints);
};

/**
 |--------------------------------------------------
 | Users
 |--------------------------------------------------
 */
const queryAllUsers: QueryAllUsers = (): Query => {
    return query(collection(db, FBCollections.Profiles));
};

/**
|--------------------------------------------------
| PeopleInEvents
|--------------------------------------------------
*/
const queryForPeopleInEvents: QueryForPeopleInEvents = ({restaurantId, eventId}: QueryForPeopleInEventsParameter): Query => {
    return query(collection(db, FBCollections.PeopleInEvent), where('restaurantId', '==', restaurantId), where('eventId', '==', eventId));
};

export {
    // eslint-disable-next-line import/prefer-default-export
    queryForRestaurants,
    querySingle,
    queryEventOrMenuInRestaurant,
    queryForPhotos,
    queryForPeopleInEvents,
    queryAllUsers,
};
