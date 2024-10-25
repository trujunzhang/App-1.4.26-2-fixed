/* eslint-disable @typescript-eslint/lines-between-class-members */

/* eslint-disable rulesdir/no-inline-named-export */
import type {ObjectSchema} from 'realm';
import Realm from 'realm';

// eslint-disable-next-line import/prefer-default-export
export class SqlPhoto extends Realm.Object<SqlPhoto> {
    // Base(1)
    uniqueId!: string;

    // offline(1)
    offlinePath?: string;
    relatedId?: string;
    photoType?: string;

    photoTableId?: string;
    pageId?: string;

    static schema: ObjectSchema = {
        name: 'SqlPhoto',
        properties: {
            // Base(1)
            uniqueId: {type: 'string', indexed: true},
            // offline(1)
            offlinePath: 'string',
            relatedId: 'string',
            photoType: 'string',
            photoTableId: 'string',
            pageId: 'string',
        },
        primaryKey: 'uniqueId',
    };
}
