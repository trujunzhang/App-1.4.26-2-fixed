/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable import/prefer-default-export */

/* eslint-disable no-invalid-this */

/* eslint-disable no-restricted-imports */
import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import type Realm from 'realm';
import {ParseModelEvents, ParseModelPeopleInEvent, ParseModelRestaurants} from '@libs/FirebaseIeatta/appModel';
import type {IFirebaseDocumentData} from '@libs/FirebaseIeatta/types';
import Log from '@libs/Log';
import {RealmCollections, RealmWriteMode} from '@libs/Realm/constant';
import RealmHelper from '@libs/Realm/services/realm-helper';
import type {IeattaModelsWithUser, IFBEvent, IFBPeopleInEvent, IFBRestaurant} from '@src/types/firebase';
import type {IRealmRepositories} from './types';

class RealmRepositories implements IRealmRepositories {
    private readonly realm: Realm;

    constructor(realm: Realm) {
        this.realm = realm;
    }

    private convertFirebaseToRealm = (collect: RealmCollections, data: IFirebaseDocumentData): IeattaModelsWithUser => {
        switch (collect) {
            case RealmCollections.Restaurants: {
                return ParseModelRestaurants.toRealmModel(data as IFBRestaurant);
            }
            case RealmCollections.Events: {
                return ParseModelEvents.toRealmModel(data as IFBEvent);
            }
            case RealmCollections.PeopleInEvent: {
                return ParseModelPeopleInEvent.toRealmModel(data as IFBPeopleInEvent);
            }
            default: {
                return data as IeattaModelsWithUser;
            }
        }
    };

    private saveToRealmAsAddType = (collection: RealmCollections, changeDocId: string, data: any) => {
        // Log.info('');
        // Log.info('================================');
        // Log.info(`Realm Repositories: {AddType}`);
        // Log.info(`changeDocId: ${changeDocId}`);
        // Log.info(`collect: ${collection}`);
        // Log.info('================================');
        // Log.info('');
        new RealmHelper(this.realm)
            .setDataIfNotExist({
                collection,
                docId: changeDocId,
                model: this.convertFirebaseToRealm(collection, data),
                mode: RealmWriteMode.Never,
            })
            .then((r) => {});
    };

    /**
     * issue:
     *  Expected value to be iterable, got an object
     * @param collection
     * @param changeDocId
     * @param data
     */
    private saveToRealmAsModifiedType = (collection: RealmCollections, changeDocId: string, data: any) => {
        Log.info('');
        Log.info('================================');
        Log.info(`Realm Repositories: {ModifiedType}`);
        Log.info(`changeDocId: ${changeDocId}`);
        Log.info(`collect: ${collection}`);
        Log.info(`changeData: ${JSON.stringify(data)}`);
        Log.info('================================');
        Log.info('');
        new RealmHelper(this.realm)
            .setData({
                collection,
                docId: changeDocId,
                model: this.convertFirebaseToRealm(collection, data),
                mode: RealmWriteMode.Modified,
            })
            .then((r) => {});
    };

    private saveToRealmAsRemovedType = (collection: RealmCollections, changeDocId: string, data: any) => {
        new RealmHelper(this.realm).deleteData({collection, uniqueId: changeDocId}).then((r) => {});

        Log.info('');
        Log.info('================================');
        Log.info(`Realm Repositories: {RemovedType}`);
        Log.info(`changeDocId: ${changeDocId}`);
        Log.info(`collect: ${collection}`);
        // Log.info(`deletableObjects: ${deletableObjects.length}`);
        Log.info('================================');
        Log.info('');
    };

    listenerQuerySnapshot = (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot, collection: RealmCollections) => {
        if (querySnapshot?.docChanges === undefined || querySnapshot.docChanges === null) {
            return;
        }
        querySnapshot.docChanges().forEach((change) => {
            if (_.isEmpty(change) || _.isEmpty(change.doc) || _.isEmpty(change.doc.data())) {
                return;
            }
            const changeDocId: string = change.doc.id;
            const data = change.doc.data();
            try {
                if (change.type === 'added') {
                    this.saveToRealmAsAddType(collection, changeDocId, data);
                } else if (change.type === 'modified') {
                    this.saveToRealmAsModifiedType(collection, changeDocId, data);
                } else if (change.type === 'removed') {
                    this.saveToRealmAsRemovedType(collection, changeDocId, data);
                }
            } catch (error) {
                Log.warn('');
                Log.warn('================================');
                Log.warn(`[error] in the realm repository: ${collection}`);
                Log.warn(`docId in the error : ${changeDocId}`);
                Log.warn(`data: ${JSON.stringify(data)}`);
                Log.warn(`error : ${JSON.stringify(error)}`);
                Log.warn('================================');
                Log.warn('');
            }
        });
    };
}

export {RealmRepositories};
