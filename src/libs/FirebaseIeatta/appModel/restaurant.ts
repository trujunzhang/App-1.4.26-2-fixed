/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-param-reassign */

/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import type {IAuthUser} from '@libs/FirebaseIeatta/models/auth_user_model';
import {convertToGeoHash} from '@libs/FirebaseIeatta/utils/geohash_utils';
import {documentIdFromCurrentDate} from '@libs/FirebaseIeatta/utils/md5_utils';
import {slugifyToLower} from '@libs/FirebaseIeatta/utils/slug_helper';
import {getDateStringForCreatedOrUpdatedDate} from '@libs/FirebaseIeatta/utils/timeago_helper';
import {RestaurantGeoPoint} from '@libs/Realm/models';
import type {IFBRestaurant, IFBRestaurantForRealm} from '@src/types/firebase';

// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export class ParseModelRestaurants {
    static emptyRestaurant({authUserModel, latitude, longitude}: {authUserModel: IAuthUser; latitude: number; longitude: number}): IFBRestaurant {
        const restaurant: IFBRestaurant = {
            // Base(5)
            uniqueId: documentIdFromCurrentDate(),
            creatorId: authUserModel.uid,
            createdAt: getDateStringForCreatedOrUpdatedDate(),
            updatedAt: getDateStringForCreatedOrUpdatedDate(),
            flag: '1',
            // extra(1)
            extraNote: '',
            // Check google(1)
            isNew: true,
            // Location(3)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            geoHash: convertToGeoHash(latitude, longitude),
            latitude,
            longitude,
            // Common(4)
            displayName: '',
            slug: '',
            thumbnailUrl: '',
            originalUrl: '',
            // for review(2)
            rate: 0,
            reviewCount: 0,
            // Google api(8)
            address: '',
            street_number: '',
            route: '',
            locality: '',
            sublocality: '',
            country: '',
            postal_code: '',
            administrative_area: '',
        };
        return restaurant;
    }

    static updateCover({model, originalUrl}: {model: IFBRestaurant; originalUrl: string}): IFBRestaurant {
        model.originalUrl = originalUrl;
        model.updatedAt = getDateStringForCreatedOrUpdatedDate();

        return model;
    }

    static updateRestaurant({model, nextDisplayName, nextExtraNote}: {model: IFBRestaurant; nextDisplayName: string; nextExtraNote: string}): IFBRestaurant {
        /**
         * In the mobile version, using realm.js to store restaurant model with extended field 'location' that is not a part of firebase schema,
         * So we need to remove 'location' from the model before saving it.
         */
        const modelWithoutLocation: IFBRestaurant = {...model};
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        delete (modelWithoutLocation as any).location;

        modelWithoutLocation.displayName = nextDisplayName;
        modelWithoutLocation.slug = slugifyToLower(nextDisplayName);
        modelWithoutLocation.extraNote = nextExtraNote;
        modelWithoutLocation.updatedAt = getDateStringForCreatedOrUpdatedDate();

        return modelWithoutLocation;
    }

    static toRealmModel(model: IFBRestaurant): IFBRestaurantForRealm {
        const restaurant: IFBRestaurantForRealm = {
            // Base(5)
            uniqueId: lodashGet(model, 'uniqueId', ''),
            creatorId: lodashGet(model, 'creatorId', ''),
            createdAt: lodashGet(model, 'createdAt', ''),
            updatedAt: lodashGet(model, 'updatedAt', ''),
            flag: lodashGet(model, 'flag', ''),
            // extra(1)
            extraNote: lodashGet(model, 'extraNote', ''),
            // Check google(1)
            isNew: lodashGet(model, 'isNew', true),
            // Location(3)
            geoHash: lodashGet(model, 'geoHash', ''),
            latitude: lodashGet(model, 'latitude', 0),
            longitude: lodashGet(model, 'longitude', 0),
            // Common(4)
            displayName: lodashGet(model, 'displayName', ''),
            slug: lodashGet(model, 'slug', ''),
            thumbnailUrl: lodashGet(model, 'thumbnailUrl', ''),
            originalUrl: lodashGet(model, 'originalUrl', ''),
            // for review(2)
            rate: lodashGet(model, 'rate', 0),
            reviewCount: lodashGet(model, 'reviewCount', 0),
            // Google api(8)
            address: lodashGet(model, 'address', ''),
            street_number: lodashGet(model, 'street_number', ''),
            route: lodashGet(model, 'route', ''),
            locality: lodashGet(model, 'locality', ''),
            sublocality: lodashGet(model, 'sublocality', ''),
            country: lodashGet(model, 'country', ''),
            postal_code: lodashGet(model, 'postal_code', ''),
            administrative_area: lodashGet(model, 'administrative_area', ''),

            /** field 'location' only for realm model * */
            location: new RestaurantGeoPoint({
                lat: lodashGet(model, 'latitude', 0),
                long: lodashGet(model, 'longitude', 0),
            }),
        };
        return restaurant;
    }
}
