/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type IRealmHelper from './types';
import type {DeleteData, SetData, UpdateSqlPhotoCover} from './types';

class RealmHelper implements IRealmHelper {
    private readonly realm;

    constructor(realm: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.realm = realm;
    }

    /**
     |--------------------------------------------------
     | Get Data
     |--------------------------------------------------
     */
    // getData({collection, id}: GetData): Promise<IeattaModelsWithoutUser> {
    //     return Promise.resolve(null);
    // }

    /**
     |--------------------------------------------------
     | Set Data if not exist
     |--------------------------------------------------
     */
    setDataIfNotExist({collection, docId, model, mode}: SetData): Promise<void> {
        return Promise.resolve();
    }

    /**
     |--------------------------------------------------
     | Update sqlPhoto's cover 
     |--------------------------------------------------
     */
    updateSqlPhotoCover({firebasePhotoId, coverId, coverType}: UpdateSqlPhotoCover): Promise<void> {
        return Promise.resolve();
    }

    /**
     |--------------------------------------------------
     | Set Data
     |--------------------------------------------------
     */
    setData({collection, docId, model, mode}: SetData): Promise<void> {
        return Promise.resolve();
    }

    /**
     |--------------------------------------------------
     | Delete Data
     |--------------------------------------------------
     */
    deleteData({collection, uniqueId}: DeleteData): Promise<void> {
        return Promise.resolve();
    }
}

export default RealmHelper;
