import {ParseModelRestaurants} from '@libs/Firebase/appModel/restaurant';
import {AuthUserModel} from '@libs/Firebase/models/auth_user_model';
import {convertToGeoHash, getGeoHashForRestaurant, numberOfCharsForPhoto, numberOfCharsForRestaurant} from '@libs/Firebase/utils/geohash_utils';

const geohash = require('ngeohash');

describe('geohash', () => {
    test('number of chars', () => {
        expect(numberOfCharsForPhoto).toBe(6);
        expect(numberOfCharsForRestaurant).toBe(6);
    });

    test('convertToGeoHash', () => {
        const geoHash = convertToGeoHash(37.8324, 112.5584);
        expect(geoHash).toBe('ww8p1r4t8yd0'.substring(0, numberOfCharsForPhoto));
    });

    test('getGeoHashForRestaurant', () => {
        const user = AuthUserModel.mockedUser();
        const restaurant = ParseModelRestaurants.emptyRestaurant({
            authUserModel: user as any,
            latitude: 32.4133352,
            longitude: 120.570579,
        });
        const geoHash = getGeoHashForRestaurant(restaurant);
        expect(geoHash).toBe('wtv8rssv'.substring(0, numberOfCharsForRestaurant));

        const nextRestaurant = ParseModelRestaurants.emptyRestaurant({
            authUserModel: user as any,
            latitude: 32.4134176,
            longitude: 120.5705507,
        });
        const nextGeoHash = getGeoHashForRestaurant(nextRestaurant);
        expect(nextGeoHash).toBe('wtv8rssv'.substring(0, numberOfCharsForRestaurant));
    });

    test('geohash with 12 numberOfChars', () => {
        expect(geohash.encode(32.4133352, 120.570579, 12)).toBe('wtv8rssv65eg');
        expect(geohash.encode(32.4134176, 120.5705507, 12)).toBe('wtv8rssvc6yz');
    });

    test('geohash with 8 numberOfChars', () => {
        expect(geohash.encode(32.4133352, 120.570579, 8)).toBe('wtv8rssv');
        expect(geohash.encode(32.4134176, 120.5705507, 8)).toBe('wtv8rssv');
    });
});
