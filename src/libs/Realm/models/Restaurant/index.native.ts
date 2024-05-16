/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable max-classes-per-file */

/* eslint-disable @typescript-eslint/lines-between-class-members */

/* eslint-disable rulesdir/no-inline-named-export */
import type {CanonicalGeoPoint, GeoPosition, ObjectSchema} from 'realm';
import Realm from 'realm';

// Implement `CanonicalGeoPoint`
// for convenience when persisting geodata.
export class RestaurantGeoPoint implements CanonicalGeoPoint {
    coordinates!: GeoPosition;

    type = 'Point' as const;

    constructor(location: {long: number; lat: number}) {
        this.coordinates = [location.long, location.lat];
    }

    static schema: ObjectSchema = {
        name: 'RestaurantGeoPoint',
        embedded: true,
        properties: {
            type: 'string',
            coordinates: 'double[]',
        },
    };
}

// eslint-disable-next-line rulesdir/no-inline-named-export
export class Restaurant extends Realm.Object<Restaurant> {
    // Base(5)
    uniqueId!: string;
    flag?: string;
    createdAt?: string;
    updatedAt?: string;
    creatorId?: string;

    // extra(1)
    extraNote?: string;
    // Check google(1)
    isNew?: boolean;
    // Location(3)
    geoHash?: string;
    latitude?: number;
    longitude?: number;
    /* GeoPoint */
    // https://www.mongodb.com/docs/realm/sdk/react-native/model-data/data-types/geospatial/
    location!: RestaurantGeoPoint;
    // Common(4)
    displayName?: string;
    slug?: string;
    originalUrl?: string;
    thumbnailUrl?: string;
    // for review(2)
    rate?: number;
    reviewCount?: number;
    // Google api(8)
    address?: string;
    street_number?: string;
    route?: string;
    locality?: string;
    sublocality?: string;
    country?: string;
    postal_code?: string;
    administrative_area?: string;

    static schema: ObjectSchema = {
        name: 'Restaurant',
        properties: {
            // Base(5)
            uniqueId: {type: 'string', indexed: true},
            flag: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            creatorId: 'string',

            // extra(1)
            extraNote: 'string',
            // Check google(1)
            isNew: 'bool',
            // Location(3)
            geoHash: 'string',
            latitude: 'double',
            longitude: 'double',
            /* GeoPoint */
            location: 'RestaurantGeoPoint',
            // Common(4)
            displayName: 'string',
            slug: 'string',
            originalUrl: 'string',
            thumbnailUrl: 'string',
            // for review(2)
            rate: 'int',
            reviewCount: 'int',
            // Google api(8)
            address: 'string',
            street_number: 'string',
            route: 'string',
            locality: 'string',
            sublocality: 'string',
            country: 'string',
            postal_code: 'string',
            administrative_area: 'string',
        },
        primaryKey: 'uniqueId',
    };
}
