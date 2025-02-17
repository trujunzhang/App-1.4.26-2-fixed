/* eslint-disable @typescript-eslint/lines-between-class-members */

/* eslint-disable rulesdir/no-inline-named-export */
import type {ObjectSchema} from 'realm';
import Realm from 'realm';

// eslint-disable-next-line import/prefer-default-export
export class SqlPhoto extends Realm.Object<SqlPhoto> {
    // Base(3)
    uniqueId!: string;
    createdAt?: string;
    updatedAt?: string;

    // offline(1)
    offlinePath?: string;
    relatedId?: string;
    photoType?: string;

    /** photo's uniqueId on the 'IFBPhoto' **/
    firebasePhotoId?: string;
    /** page id on the taking photo page **/
    pageId?: string;

    /** uniqueId of the restaurant/recipe on the 'edit' page, when selecting a cover **/
    coverId?: string;
    /** type: 'Restaurant' | 'Recipe' **/
    coverType?: string;

    static schema: ObjectSchema = {
        name: 'SqlPhoto',
        properties: {
            // Base(3)
            uniqueId: {type: 'string', indexed: true},
            createdAt: 'string',
            updatedAt: 'string',
            // offline(1)
            offlinePath: 'string',
            relatedId: 'string',
            photoType: 'string',
            firebasePhotoId: 'string',
            pageId: 'string',
            coverId: 'string',
            cotverType: 'string',
        },
        primaryKey: 'uniqueId',
    };
}
