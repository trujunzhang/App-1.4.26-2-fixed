/* eslint-disable @typescript-eslint/lines-between-class-members */

/* eslint-disable rulesdir/no-inline-named-export */
import type {ObjectSchema} from 'realm';
import Realm from 'realm';

// eslint-disable-next-line import/prefer-default-export
export class Review extends Realm.Object<Review> {
    // Base(5)
    uniqueId!: string;
    flag?: string;
    createdAt?: string;
    updatedAt?: string;
    creatorId?: string;

    // Common(2)
    rate?: number;
    body?: string;
    // user(2)
    username?: string;
    avatarUrl?: string;
    // point(4)
    reviewType?: string;
    restaurantId?: string;
    eventId?: string;
    recipeId?: string;

    static schema: ObjectSchema = {
        name: 'Review',
        properties: {
            // Base(5)
            uniqueId: {type: 'string', indexed: true},
            flag: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            creatorId: 'string',

            // Common(2)
            rate: 'int',
            body: 'string',
            // user(2)
            username: 'string',
            avatarUrl: 'string',
            // point(4)
            reviewType: 'string',
            restaurantId: 'string?',
            eventId: 'string?',
            recipeId: 'string?',
        },
        primaryKey: 'uniqueId',
    };
}
