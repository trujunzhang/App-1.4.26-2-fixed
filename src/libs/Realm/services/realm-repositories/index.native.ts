/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable import/prefer-default-export */

/* eslint-disable no-invalid-this */

/* eslint-disable no-restricted-imports */
import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import type Realm from 'realm';
import {UpdateMode} from 'realm';
import _ from 'underscore';
import {ParseModelEvents, ParseModelPeopleInEvent, ParseModelRestaurants} from '@libs/Firebase/appModel';
import type {IFirebaseDocumentData, IFirebaseQuerySnapshot} from '@libs/Firebase/types';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {RestaurantGeoPoint} from '@libs/Realm/models';
import type {IFBEvent, IFBPeopleInEvent, IFBRestaurant} from '@src/types/firebase';
import type {IRealmRepositories} from './types';

class RealmRepositories implements IRealmRepositories {
    private readonly realm: Realm;

    constructor(realm: Realm) {
        this.realm = realm;
    }

    private convertFirebaseToRealm = (collect: RealmCollections, data: IFirebaseDocumentData) => {
        switch (collect) {
            case RealmCollections.Restaurants: {
                // return {
                //     location: new RestaurantGeoPoint({
                //         lat: (data as IFBRestaurant).latitude,
                //         long: (data as IFBRestaurant).longitude,
                //     }),
                //     ...data,
                // };
                return ParseModelRestaurants.toRealmModel(data as IFBRestaurant);
            }
            case RealmCollections.Events: {
                return ParseModelEvents.toRealmModel(data as IFBEvent);
            }
            case RealmCollections.PeopleInEvent: {
                return ParseModelPeopleInEvent.toRealmModel(data as IFBPeopleInEvent);
            }
            default: {
                return data;
            }
        }
    };

    private getRealmFilter = (collect: RealmCollections, id: string) => {
        let filter = `uniqueId = "${id}"`;
        if (collect === RealmCollections.Profiles) {
            filter = `id = "${id}"`;
        }
        return filter;
    };

    private saveToRealmAsAddType = (collect: RealmCollections, changeDocId: string, data: any) => {
        // Log.info("")
        // Log.info("================================")
        // Log.info(`Realm Repositories: {AddType}`)
        // Log.info(`changeDocId: ${changeDocId}`)
        // Log.info("================================")
        // Log.info("")
        const realm: Realm = this.realm;
        const filter = this.getRealmFilter(collect, changeDocId);
        const existObjects = realm.objects(collect).filtered(filter);
        if (existObjects.length === 0) {
            realm.write(() => {
                realm.create(collect, this.convertFirebaseToRealm(collect, data), UpdateMode.Never);
            });
        }
    };

    /**
     * issue:
     *  Expected value to be iterable, got an object
     * @param collect
     * @param changeDocId
     * @param data
     */
    private saveToRealmAsModifiedType = (collect: RealmCollections, changeDocId: string, data: any) => {
        Log.info('');
        Log.info('================================');
        Log.info(`Realm Repositories: {ModifiedType}`);
        Log.info(`changeDocId: ${changeDocId}`);
        Log.info(`collect: ${collect}`);
        Log.info(`changeData: ${JSON.stringify(data)}`);
        Log.info('================================');
        Log.info('');
        const realm: Realm = this.realm;
        realm.write(() => {
            realm.create(collect, this.convertFirebaseToRealm(collect, data), UpdateMode.Modified);
        });
    };

    private saveToRealmAsRemovedType = (collect: RealmCollections, changeDocId: string, data: any) => {
        const realm: Realm = this.realm;
        const filter = this.getRealmFilter(collect, changeDocId);
        const deletableObjects = realm.objects(collect).filtered(filter);
        Log.info('');
        Log.info('================================');
        Log.info(`Realm Repositories: {RemovedType}`);
        Log.info(`changeDocId: ${changeDocId}`);
        Log.info(`deletableObjects: ${deletableObjects.length}`);
        Log.info('================================');
        Log.info('');
        if (deletableObjects.length === 1) {
            realm.write(() => {
                realm.delete(deletableObjects[0]);
            });
        }
    };

    // @ts-ignore
    listenerQuerySnapshot = (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot, collect: RealmCollections) => {
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
                    this.saveToRealmAsAddType(collect, changeDocId, data);
                } else if (change.type === 'modified') {
                    this.saveToRealmAsModifiedType(collect, changeDocId, data);
                } else if (change.type === 'removed') {
                    this.saveToRealmAsRemovedType(collect, changeDocId, data);
                }
            } catch (error) {
                Log.warn('');
                Log.warn('================================');
                Log.warn(`[error] in the realm repository: ${collect}`);
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
