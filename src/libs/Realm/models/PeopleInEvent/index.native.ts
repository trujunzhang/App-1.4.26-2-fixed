/* eslint-disable @typescript-eslint/lines-between-class-members */

/* eslint-disable rulesdir/no-inline-named-export */
import type {ObjectSchema} from 'realm';
import Realm from 'realm';

// eslint-disable-next-line import/prefer-default-export
export class PeopleInEvent extends Realm.Object<PeopleInEvent> {
    // Base(5)
    uniqueId!: string;
    flag?: string;
    createdAt?: string;
    updatedAt?: string;
    creatorId?: string;

    // Common(1)
    recipeIds?: Realm.List<string>;
    // point(3)
    restaurantId?: string;
    eventId?: string;
    userId?: string;

    static schema: ObjectSchema = {
        name: 'PeopleInEvent',
        properties: {
            // Base(5)
            uniqueId: {type: 'string', indexed: true},
            flag: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            creatorId: 'string',

            // Common(1)
            recipeIds: 'string[]',
            // point(3)
            restaurantId: 'string',
            eventId: 'string',
            userId: 'string',
        },
        primaryKey: 'uniqueId',
    };
}
