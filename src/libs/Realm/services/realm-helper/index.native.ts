import type Realm from 'realm';
import {UpdateMode} from 'realm';
import {ParseModelSqlPhotos} from '@libs/FirebaseIeatta/appModel';
import {RealmCollections, RealmWriteMode} from '@libs/Realm/constant';
import type {IeattaModelsWithUser, IFBSqlPhoto, SQLPhotoCoverType} from '@src/types/firebase';
import type IRealmHelper from './types';
import type {DeleteData, SetData, UpdateSqlPhotoCover} from './types';

class RealmHelper implements IRealmHelper {
    private readonly realm: Realm;

    constructor(realm: Realm) {
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

    private getRealmFilter = (collect: RealmCollections, id: string) => {
        let filter = `uniqueId = "${id}"`;
        if (collect === RealmCollections.Profiles) {
            filter = `id = "${id}"`;
        }
        return filter;
    };

    /**
     |--------------------------------------------------
     | Set Data if not exist
     |--------------------------------------------------
     */
    setDataIfNotExist({collection, docId, model, mode}: SetData): Promise<void> {
        const realm: Realm = this.realm;

        const filter = this.getRealmFilter(collection, docId);
        const existObjects = realm.objects(collection).filtered(filter);
        if (existObjects.length === 0) {
            realm.write(() => {
                switch (mode) {
                    case RealmWriteMode.Never: {
                        realm.create<IeattaModelsWithUser>(collection, model, UpdateMode.Never);
                        break;
                    }
                    case RealmWriteMode.Modified: {
                        realm.create<IeattaModelsWithUser>(collection, model, UpdateMode.Modified);
                        break;
                    }
                    case RealmWriteMode.All: {
                        realm.create<IeattaModelsWithUser>(collection, model, UpdateMode.All);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            });
        }
        return Promise.resolve();
    }

    /**
     |--------------------------------------------------
     | Update sqlPhoto's cover 
     |--------------------------------------------------
     */
    updateSqlPhotoCover({firebasePhotoId, coverId, coverType}: UpdateSqlPhotoCover): Promise<void> {
        const realm: Realm = this.realm;

        const existObjects = realm.objects<IFBSqlPhoto>(RealmCollections.SqlPhotos).filtered(`firebasePhotoId = "${firebasePhotoId}"`);
        if (existObjects.length === 1) {
            const lastModal: IFBSqlPhoto = existObjects[0] as IFBSqlPhoto;
            const nextModal: IFBSqlPhoto = ParseModelSqlPhotos.updateCover({model: lastModal, coverId, coverType});
            realm.write(() => {
                realm.create<IeattaModelsWithUser>(RealmCollections.SqlPhotos, nextModal, UpdateMode.Modified);
            });
        }
        return Promise.resolve();
    }

    /**
     |--------------------------------------------------
     | Set Data
     |--------------------------------------------------
     */
    setData({collection, docId, model, mode}: SetData): Promise<void> {
        const realm: Realm = this.realm;

        realm.write(() => {
            switch (mode) {
                case RealmWriteMode.Never: {
                    realm.create<IeattaModelsWithUser>(collection, model, UpdateMode.Never);
                    break;
                }
                case RealmWriteMode.Modified: {
                    realm.create<IeattaModelsWithUser>(collection, model, UpdateMode.Modified);
                    break;
                }
                case RealmWriteMode.All: {
                    realm.create<IeattaModelsWithUser>(collection, model, UpdateMode.All);
                    break;
                }
                default: {
                    break;
                }
            }
        });
        return Promise.resolve();
    }

    /**
     |--------------------------------------------------
     | Delete Data
     |--------------------------------------------------
     */
    deleteData({collection, uniqueId}: DeleteData): Promise<void> {
        const realm: Realm = this.realm;

        const filter = this.getRealmFilter(collection, uniqueId);
        const deletableObjects = realm.objects(collection).filtered(filter);
        if (deletableObjects.length === 1) {
            realm.write(() => {
                realm.delete(deletableObjects[0]);
            });
        }
        return Promise.resolve();
    }
}

export default RealmHelper;
