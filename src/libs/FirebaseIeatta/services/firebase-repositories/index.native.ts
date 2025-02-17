/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @dword-design/import-alias/prefer-alias */

/* eslint-disable no-restricted-imports */

/* eslint-disable no-invalid-this */

/* eslint-disable prefer-object-spread */
import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import type Realm from 'realm';
import ListenerUsersSnapshot from '@libs/FirebaseIeatta/services/firebase-repositories/ListenerUsersSnapshot';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {RealmRepositories} from '@libs/Realm/services/realm-repositories';
import {
    setSyncEventsCompletion,
    setSyncPeopleInEventsCompletion,
    setSyncPhotosCompletion,
    setSyncRecipesCompletion,
    setSyncRestaurantsCompletion,
    setSyncReviewsCompletion,
    setSyncUsersCompletion,
} from '@userActions/Firebase/syncFB';
import {FBCollections} from '../../constant';
import FirestoreParams from '../firestore_params';
import type IFirebaseRepositories from './types';

class FirebaseRepositories implements IFirebaseRepositories {
    private readonly realmRepositories;

    constructor(realm: Realm) {
        this.realmRepositories = new RealmRepositories(realm);
    }

    listenUsers = () => {
        const subscriber = firestore()
            .collection(FBCollections.Profiles)
            .orderBy(FirestoreParams.KEY_UPDATED_AT, 'desc')
            .onSnapshot(
                (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
                    new ListenerUsersSnapshot().listenerQuerySnapshot(querySnapshot as any);
                    this.realmRepositories.listenerQuerySnapshot(querySnapshot, RealmCollections.Profiles);
                    setSyncUsersCompletion();
                },
                (error: Error) => {
                    Log.info('');
                    Log.info('================================');
                    Log.info(`FB<Users>${JSON.stringify(error)}`);
                    Log.info('================================');
                    Log.info('');
                },
                () => {},
            );

        return subscriber;
    };

    listenRestaurants = () => {
        const subscriber = firestore()
            .collection(FBCollections.Restaurants)
            .orderBy(FirestoreParams.KEY_UPDATED_AT, 'desc')
            .onSnapshot(
                (querySnapshot) => {
                    this.realmRepositories.listenerQuerySnapshot(querySnapshot, RealmCollections.Restaurants);
                    setSyncRestaurantsCompletion();
                },
                (error: Error) => {
                    Log.info('');
                    Log.info('================================');
                    Log.info(`FB<Restaurants>${JSON.stringify(error)}`);
                    Log.info('================================');
                    Log.info('');
                },
                () => {},
            );

        return subscriber;
    };

    listenEvents = () => {
        const subscriber = firestore()
            .collection(FBCollections.Events)
            .orderBy(FirestoreParams.KEY_UPDATED_AT, 'desc')
            .onSnapshot(
                (querySnapshot) => {
                    this.realmRepositories.listenerQuerySnapshot(querySnapshot, RealmCollections.Events);
                    setSyncEventsCompletion();
                },
                (error: Error) => {
                    Log.info('');
                    Log.info('================================');
                    Log.info(`FB<Events>${JSON.stringify(error)}`);
                    Log.info('================================');
                    Log.info('');
                },
                () => {},
            );

        return subscriber;
    };

    listenRecipes = () => {
        const subscriber = firestore()
            .collection(FBCollections.Recipes)
            .orderBy(FirestoreParams.KEY_UPDATED_AT, 'desc')
            .onSnapshot(
                (querySnapshot) => {
                    this.realmRepositories.listenerQuerySnapshot(querySnapshot, RealmCollections.Recipes);
                    setSyncRecipesCompletion();
                },
                (error: Error) => {
                    Log.info('');
                    Log.info('================================');
                    Log.info(`FB<Recipes>${JSON.stringify(error)}`);
                    Log.info('================================');
                    Log.info('');
                },
                () => {},
            );

        return subscriber;
    };

    listenPhotos = () => {
        const subscriber = firestore()
            .collection(FBCollections.Photos)
            .orderBy(FirestoreParams.KEY_UPDATED_AT, 'desc')
            .onSnapshot(
                (querySnapshot) => {
                    this.realmRepositories.listenerQuerySnapshot(querySnapshot, RealmCollections.Photos);
                    setSyncPhotosCompletion();
                },
                (error: Error) => {
                    Log.info('');
                    Log.info('================================');
                    Log.info(`FB<Photos>${JSON.stringify(error)}`);
                    Log.info('================================');
                    Log.info('');
                },
                () => {},
            );

        return subscriber;
    };

    listenReviews = () => {
        const subscriber = firestore()
            .collection(FBCollections.Reviews)
            .orderBy(FirestoreParams.KEY_UPDATED_AT, 'desc')
            .onSnapshot(
                (querySnapshot) => {
                    this.realmRepositories.listenerQuerySnapshot(querySnapshot, RealmCollections.Reviews);
                    setSyncReviewsCompletion();
                },
                (error: Error) => {
                    Log.info('');
                    Log.info('================================');
                    Log.info(`FB<Reviews>${JSON.stringify(error)}`);
                    Log.info('================================');
                    Log.info('');
                },
                () => {},
            );

        return subscriber;
    };

    listenPeopleInEvents = () => {
        const subscriber = firestore()
            .collection(FBCollections.PeopleInEvent)
            .orderBy(FirestoreParams.KEY_UPDATED_AT, 'desc')
            .onSnapshot(
                (querySnapshot) => {
                    this.realmRepositories.listenerQuerySnapshot(querySnapshot, RealmCollections.PeopleInEvent);
                    setSyncPeopleInEventsCompletion();
                },
                (error: Error) => {
                    Log.info('');
                    Log.info('================================');
                    Log.info(`FB<PeopleInEvent>${JSON.stringify(error)}`);
                    Log.info('================================');
                    Log.info('');
                },
                () => {},
            );

        return subscriber;
    };
}

export default FirebaseRepositories;
