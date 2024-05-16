/* eslint-disable @typescript-eslint/lines-between-class-members */

/* eslint-disable rulesdir/no-inline-named-export */
import type {ObjectSchema} from 'realm';
import Realm from 'realm';

// eslint-disable-next-line import/prefer-default-export
export class Recipe extends Realm.Object<Recipe> {
    // Base(5)
    uniqueId!: string;
    flag?: string;
    createdAt?: string;
    updatedAt?: string;
    creatorId?: string;

    // Common(5)
    displayName?: string;
    slug?: string;
    price?: string;
    originalUrl?: string;
    thumbnailUrl?: string;
    // for review(2)
    rate?: number;
    reviewCount?: number;
    // point(1)
    restaurantId?: string;

    static schema: ObjectSchema = {
        name: 'Recipe',
        properties: {
            // Base(5)
            uniqueId: {type: 'string', indexed: true},
            flag: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            creatorId: 'string',

            // Common(5)
            displayName: 'string',
            slug: 'string',
            price: 'string',
            originalUrl: 'string',
            thumbnailUrl: 'string',
            // for review(2)
            rate: 'int',
            reviewCount: 'int',
            // point(1)
            restaurantId: 'string',
        },
        primaryKey: 'uniqueId',
    };
}
