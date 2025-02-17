import type {RealmCollections, RealmWriteMode} from '@libs/Realm/constant';
import type {IeattaModelsWithUser, SQLPhotoCoverType} from '@src/types/firebase';

type GetData = {collection: RealmCollections; id: string};
type SetData = {
    collection: RealmCollections;
    docId: string;
    model: IeattaModelsWithUser;
    mode: RealmWriteMode;
};
type DeleteData = {collection: RealmCollections; uniqueId: string};
type UpdateSqlPhotoCover = {firebasePhotoId: string; coverId: string; coverType: SQLPhotoCoverType};

type IRealmHelper = {
    /**
     |--------------------------------------------------
     | Get Data
     |--------------------------------------------------
     */
    // getData({collection, id}: GetData): Promise<IeattaModelsWithoutUser>;

    /**
     |--------------------------------------------------
     | Set Data if not exist
     |--------------------------------------------------
     */
    setDataIfNotExist({collection, docId, model, mode}: SetData): Promise<void>;

    /**
     |--------------------------------------------------
     | Update sqlPhoto's cover 
     |--------------------------------------------------
     */
    updateSqlPhotoCover({firebasePhotoId, coverId, coverType}: UpdateSqlPhotoCover): Promise<void>;

    /**
     |--------------------------------------------------
     | Set Data
     |--------------------------------------------------
     */
    setData({collection, docId, model, mode}: SetData): Promise<void>;

    /**
     |--------------------------------------------------
     | Delete Data
     |--------------------------------------------------
     */
    deleteData({collection, uniqueId}: DeleteData): Promise<void>;
};

export type {GetData, SetData, DeleteData, UpdateSqlPhotoCover};

export default IRealmHelper;
