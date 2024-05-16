/* eslint-disable @typescript-eslint/lines-between-class-members */

/* eslint-disable rulesdir/no-inline-named-export */
import type {ObjectSchema} from 'realm';
import Realm from 'realm';

// eslint-disable-next-line import/prefer-default-export
export class Photo extends Realm.Object<Photo> {
    // Base(5)
    uniqueId!: string;
    flag?: string;
    createdAt?: string;
    updatedAt?: string;
    creatorId?: string;

    // user(2)
    username?: string;
    avatarUrl?: string;
    // Common(3)
    originalUrl?: string;
    thumbnailUrl?: string;
    // extra
    extraNote?: string;
    // point(4)
    photoType?: string;
    restaurantId?: string;
    recipeId?: string;
    userId?: string;
    // offline(1)
    offlinePath?: string;

    static schema: ObjectSchema = {
        name: 'Photo',
        properties: {
            // Base(5)
            uniqueId: {type: 'string', indexed: true},
            flag: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            creatorId: 'string',

            // user(2)
            username: 'string',
            avatarUrl: 'string',
            // Common(3)
            originalUrl: 'string',
            thumbnailUrl: 'string',
            // extra
            extraNote: 'string',
            // point(4)
            photoType: 'string',
            restaurantId: 'string?',
            recipeId: 'string?',
            userId: 'string?',
            // offline(1)
            offlinePath: 'string',
        },
        primaryKey: 'uniqueId',
    };
}
