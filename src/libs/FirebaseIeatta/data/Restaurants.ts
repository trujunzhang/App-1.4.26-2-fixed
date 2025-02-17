/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable no-param-reassign */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable import/prefer-default-export */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

/* eslint-disable @typescript-eslint/no-for-in-array */

/* eslint-disable guard-for-in */

/* eslint-disable @typescript-eslint/no-inferrable-types */

/* eslint-disable @typescript-eslint/naming-convention */
import type {IFBRestaurant, IFBReview} from '@src/types/firebase';
import {ReviewType} from '../constant';
import {convertToGeoHash} from '../utils/geohash_utils';
import {loadReviews} from './Reviews';

const fixReviewStatistic = (item: IFBRestaurant) => {
    const {uniqueId} = item;
    let rateForRestaurant: number = 0;
    let reviewCount: number = 0;
    for (const index in loadReviews()) {
        const review: IFBReview = loadReviews()[index];
        if (review.restaurantId === uniqueId && review.reviewType === ReviewType.Restaurant) {
            const {rate} = review;
            reviewCount += 1;
            rateForRestaurant += rate;
        }
    }
    item.rate = rateForRestaurant;
    item.reviewCount = reviewCount;
};

export const loadRestaurants = (): IFBRestaurant[] => {
    const next = restaurants.map((item: IFBRestaurant) => {
        fixReviewStatistic(item);
        item.geoHash = convertToGeoHash(item.latitude, item.longitude);
        // item.slug = slugifyToLower(item.displayName)
        // console.log(JSON.stringify(item))
        return item;
    });
    // console.log(JSON.stringify(next))
    return next;
};

export const restaurants: IFBRestaurant[] = [
    {
        isNew: false,
        uniqueId: '035ac47c-5781-4da8-af21-35c97a46c101',
        extraNote:
            'we are a chain of Halal restaurant serving the bay area since 2010 we serve hand slaughter halal meat. We have been proudly serving the most authentic Mediterranean food in SF bay.',
        creatorId: 'PqAx0FCrEn',
        flag: '1',
        address: '724 S Broadway, Los Angeles, CA 90014, USA',
        displayName: 'Forno Vecchio',
        originalUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507529261/politicl/o_xr3usf.jpg',
        thumbnailUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/s--qsTnagxL--/c_fill,f_auto,h_348,q_auto,w_348/v1/politicl/o_xr3usf',
        latitude: 34.144561,
        longitude: -118.253985,
        createdAt: '2021-01-09T06:02:09.838+0000',
        updatedAt: '2021-01-07T07:43:10.690+0000',
        rate: 42,
        reviewCount: 12,
        street_number: '724',
        route: 'South Broadway',
        locality: 'Los Angeles',
        sublocality: '',
        country: 'US',
        postal_code: '2802',
        administrative_area: 'CA',
        slug: 'forno-vecchio',
        geoHash: '9q5fjpf',
    },
    {
        isNew: false,
        uniqueId: '0b92b483-8860-438b-961d-4fef4b124176',
        extraNote: '',
        creatorId: 'ua04ebIMCn',
        flag: '1',
        address: '250s S Broadway, Los Angeles, CA 90012, USA',
        displayName: "Carl's Jr",
        originalUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507529311/politicl/o_ugrhuw.jpg',
        thumbnailUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/s--TqIOho75--/c_fill,f_auto,h_348,q_auto,w_348/v1/politicl/o_ugrhuw',
        geoHash: '9q5fv5m',
        latitude: 34.251344,
        longitude: -118.249069,
        createdAt: '2017-10-09T06:02:52.325+0000',
        updatedAt: '2017-10-09T06:35:46.537+0000',
        rate: 7.5,
        reviewCount: 3,
        street_number: '250s',
        route: 'South Broadway',
        locality: 'Los Angeles',
        sublocality: '',
        country: 'US',
        postal_code: '3605',
        administrative_area: 'CA',
        slug: "carl's-jr",
    },
    {
        isNew: false,
        uniqueId: 'f603f752-5641-472d-bcd1-0dec921b8931',
        extraNote: '',
        creatorId: 'tiBfFJkC71',
        flag: '1',
        address: '336 S Hill St, Los Angeles, CA 90013, USA',
        displayName: 'La Cita',
        originalUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507529351/politicl/o_h1fei1.jpg',
        thumbnailUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/s--r05hgf5R--/c_fill,f_auto,h_348,q_auto,w_348/v1/politicl/o_h1fei1',
        geoHash: '9q5gmjm',
        latitude: 34.350796,
        longitude: -118.249782,
        createdAt: '2017-10-09T06:03:49.167+0000',
        updatedAt: '2017-10-09T06:36:46.436+0000',
        rate: 30,
        reviewCount: 15,
        street_number: '336',
        route: 'South Hill Street',
        locality: 'Los Angeles',
        sublocality: '',
        country: 'US',
        postal_code: '1109',
        administrative_area: 'CA',
        slug: 'la-cita',
    },
    {
        isNew: false,
        uniqueId: '0423ce1f-34c5-405a-9b7a-22202046ee68',
        extraNote: '',
        creatorId: 'clB85fmtwS',
        flag: '1',
        address: '401 S Grand Ave, Los Angeles, CA 90071, USA',
        displayName: 'Pez Cantina',
        originalUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507529398/politicl/o_npi8ev.jpg',
        thumbnailUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/s--pdqw12x3--/c_fill,f_auto,h_348,q_auto,w_348/v1/politicl/o_npi8ev',
        geoHash: '9q5gvpd',
        latitude: 34.451525,
        longitude: -118.253312,
        createdAt: '2017-10-09T06:04:35.361+0000',
        updatedAt: '2017-10-09T06:37:45.146+0000',
        rate: 32,
        reviewCount: 8,
        street_number: '401',
        route: 'South Grand Avenue',
        locality: 'Los Angeles',
        sublocality: '',
        country: 'US',
        postal_code: '90071',
        administrative_area: 'CA',
        slug: 'pez-cantina',
    },
    {
        isNew: false,
        uniqueId: 'e854bd77-7836-4244-8b17-f7b2ec5e910a',
        extraNote: '',
        creatorId: 'zis2vkx9G2',
        flag: '1',
        address: '517 W 6th St, Los Angeles, CA 90014, USA',
        displayName: 'Water Grill',
        originalUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507529446/politicl/o_ygnkam.jpg',
        thumbnailUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/s--sX0P-dsK--/c_fill,f_auto,h_348,q_auto,w_348/v1/politicl/o_ygnkam',
        geoHash: '9q5ut1h',
        latitude: 34.547599,
        longitude: -118.250585,
        createdAt: '2017-10-09T06:05:13.322+0000',
        updatedAt: '2017-10-09T06:39:17.107+0000',
        rate: 20,
        reviewCount: 20,
        street_number: '517',
        route: 'West 6th Street',
        locality: 'Los Angeles',
        sublocality: '',
        country: 'US',
        postal_code: '1201',
        administrative_area: 'CA',
        slug: 'water-grill',
    },
    {
        isNew: false,
        uniqueId: 'f1c0aff9-728b-4041-9560-c09578ce7b01',
        extraNote: '',
        creatorId: 'zis2vkx9G2',
        flag: '1',
        geoHash: 'wtv8r4t',
        latitude: 32.402716,
        longitude: 120.550209,
        displayName: 'trujunzhang locally',
        createdAt: '2017-10-10T06:05:35.316+0000',
        updatedAt: '2017-10-10T06:05:35.633+0000',
        rate: 6,
        reviewCount: 4,
        thumbnailUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/s--zE0P3i_b--/c_fill,f_auto,h_348,q_auto,w_348/v1/politicl/b2eccd155ad6639c29e51f9b0d2549f6_image_bjvqag',
        originalUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507615599/politicl/b2eccd155ad6639c29e51f9b0d2549f6_image_bjvqag.jpg',
        address: '399 Ren Shou Lu, Rugao Shi, Nantong Shi, Jiangsu Sheng, China, 226500',
        street_number: '399',
        route: 'Ren Shou Lu',
        locality: 'Nantong Shi',
        sublocality: 'Rugao Shi',
        country: 'CN',
        postal_code: '226500',
        administrative_area: 'Jiangsu Sheng',
        slug: 'trujunzhang-locally',
    },
];
