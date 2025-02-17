/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable rulesdir/no-inline-named-export */
import type {IFBRestaurant} from '@src/types/firebase';

const geohash = require('ngeohash');

/**
 * numberOfChars of GeoHash for restaurant.
 * @type {number}
 */
export const numberOfCharsForRestaurant = 6;
/**
 * numberOfChars of GeoHash for photo.
 * @type {number}
 */
export const numberOfCharsForPhoto = 6;

export const convertToGeoHash = (latitude: number, longitude: number) => {
    return geohash.encode(latitude, longitude, numberOfCharsForPhoto);
};

export const getGeoHashForRestaurant = (restaurant: IFBRestaurant) => {
    return geohash.encode(restaurant.latitude, restaurant.longitude, numberOfCharsForRestaurant);
};
