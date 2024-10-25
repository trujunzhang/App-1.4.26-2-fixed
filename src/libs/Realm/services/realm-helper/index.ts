/* eslint-disable @typescript-eslint/no-explicit-any */
import {RealmCollections} from '@libs/Realm/constant';
import type {IeattaModelsWithoutUser, IFBEvent, IFBPeopleInEvent, IFBPhoto, IFBRecipe, IFBRestaurant, IFBReview, IFBUser} from '@src/types/firebase';
import type {DeleteData, GetData, SetData} from './types';
import type IRealmHelper from './types';

class RealmHelper implements IRealmHelper {
    private readonly realm;

    constructor(realm: any) {
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
