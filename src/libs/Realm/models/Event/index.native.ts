/* eslint-disable @typescript-eslint/lines-between-class-members */

/* eslint-disable rulesdir/no-inline-named-export */
import type {ObjectSchema} from 'realm';
import Realm from 'realm';

// eslint-disable-next-line import/prefer-default-export
export class Event extends Realm.Object<Event> {
    // Base(5)
    uniqueId!: string;
    flag?: string;
    createdAt?: string;
    updatedAt?: string;
    creatorId?: string;

    // Common(5+1)
    displayName?: string;
    slug?: string;
    want?: string;
    start?: string;
    end?: string;
    // waiters?: string[];
    waiterIds?: Realm.List<string>;

    // for review(2)
    rate?: number;
    reviewCount?: number;
    // point(1)
    restaurantId?: string;

    static schema: ObjectSchema = {
        name: 'Event',
        properties: {
            // Base(5)
            uniqueId: {type: 'string', indexed: true},
            flag: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            creatorId: 'string',
            // Common(5+1)
            displayName: 'string',
            slug: 'string',
            want: 'string',
            start: 'string',
            end: 'string',
            waiterIds: 'string[]',

            // for review(2)
            rate: 'int',
            reviewCount: 'int',
            // point(1)
            restaurantId: 'string',
        },
        primaryKey: 'uniqueId',
    };
}
