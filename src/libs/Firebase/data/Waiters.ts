/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable no-param-reassign */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable import/prefer-default-export */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

/* eslint-disable @typescript-eslint/no-for-in-array */

/* eslint-disable guard-for-in */

/* eslint-disable @typescript-eslint/no-inferrable-types */

/* eslint-disable @typescript-eslint/naming-convention */
import type {IFBPhoto} from '@src/types/firebase';

export const loadWaiters = (): IFBPhoto[] => {
    const next = waiters.map((item: IFBPhoto) => {
        // console.log(JSON.stringify(item))
        return item;
    });
    // console.log(JSON.stringify(next))
    return next;
};

export const waiters: IFBPhoto[] = [
    {
        uniqueId: '12345678-b3a9-4302-9c23-c59b876da99e',
        originalUrl: 'https://res.cloudinary.com/di3fvexj8/image/upload/v1611817447/politicl/waiters_otaoty.jpg',
        thumbnailUrl: '',
        photoType: 'waiter',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        createdAt: '2020-10-09T06:02:37.069+0000',
        updatedAt: '2020-11-06T09:18:51.460+0000',
        userId: 'zis2vkx9G2',
        creatorId: 'tiBfFJkC71',
        flag: '1',
        // geoHash: 'hb00n8n2pb08',
        // latitude: -118.253985,
        // longitude: 34.044561,
        offlinePath: '',
        extraNote: '',
        username: 'Nkechi Jim',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530628/politicl/o_luk1is.jpg',
    },
    {
        uniqueId: '23456789-b3a9-4302-9c23-c59b876da99e',
        originalUrl: 'https://res.cloudinary.com/di3fvexj8/image/upload/v1611817447/politicl/1443281_fxhjqq.jpg',
        thumbnailUrl: '',
        photoType: 'waiter',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        createdAt: '2017-10-09T06:02:22.237+0000',
        updatedAt: '2017-11-07T00:32:34.665+0000',
        userId: 'zis2vkx9G2',
        creatorId: 'tiBfFJkC71',
        flag: '1',
        // geoHash: 'hb00n8n2pb08',
        // latitude: -118.253985,
        // longitude: 34.044561,
        offlinePath: '',
        extraNote: '',
        username: 'Sarah Holl',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530582/politicl/o_zeno6i.jpg',
    },
    {
        uniqueId: '34567890-b3a9-4302-9c23-c59b876da99e',
        originalUrl: 'https://res.cloudinary.com/di3fvexj8/image/upload/v1611817447/politicl/waiter0-1200x780_josel8.jpg',
        thumbnailUrl: '',
        photoType: 'waiter',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        createdAt: '2017-10-09T06:02:37.069+0000',
        updatedAt: '2017-11-06T09:18:51.460+0000',
        userId: 'zis2vkx9G2',
        creatorId: 'tiBfFJkC71',
        flag: '1',
        // geoHash: 'hb00n8n2pb08',
        // latitude: -118.253985,
        // longitude: 34.044561,
        offlinePath: '',
        extraNote: '',
        username: 'Cheryl Philly',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530609/politicl/o_ycidf6.jpg',
    },
    {
        uniqueId: '45678901-b3a9-4302-9c23-c59b876da99e',
        originalUrl: 'https://res.cloudinary.com/di3fvexj8/image/upload/v1611817447/politicl/the-dining-room_ozkpjg.jpg',
        thumbnailUrl: '',
        photoType: 'waiter',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        createdAt: '2017-10-09T06:02:37.069+0000',
        updatedAt: '2017-11-06T09:18:51.460+0000',
        userId: 'zis2vkx9G2',
        creatorId: 'tiBfFJkC71',
        flag: '1',
        // geoHash: 'hb00n8n2pb08',
        // latitude: -118.253985,
        // longitude: 34.044561,
        offlinePath: '',
        extraNote: '',
        username: 'Derek Hele',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530557/politicl/o_dogqeq.jpg',
    },
    {
        uniqueId: '56789012-b3a9-4302-9c23-c59b876da99e',
        originalUrl: 'https://res.cloudinary.com/di3fvexj8/image/upload/v1611817446/politicl/server-recommending-item-female-customer-1-866x577_cv2ez1.jpg',
        thumbnailUrl: '',
        photoType: 'waiter',
        restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
        createdAt: '2017-10-09T06:02:37.069+0000',
        updatedAt: '2017-11-06T09:18:51.460+0000',
        userId: 'zis2vkx9G2',
        creatorId: 'tiBfFJkC71',
        flag: '1',
        // geoHash: 'hb00n8n2pb08',
        // latitude: -118.253985,
        // longitude: 34.044561,
        offlinePath: '',
        extraNote: '',
        username: 'Jaron Lawrence',
        avatarUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507530533/politicl/o_zhkvq8.jpg',
    },
];
