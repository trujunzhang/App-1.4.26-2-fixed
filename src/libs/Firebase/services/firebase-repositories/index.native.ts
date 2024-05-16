/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @dword-design/import-alias/prefer-alias */

/* eslint-disable no-restricted-imports */

/* eslint-disable no-invalid-this */

/* eslint-disable prefer-object-spread */
import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import type Realm from 'realm';
import ListenerUsersSnapshot from '@libs/Firebase/services/firebase-repositories/ListenerUsersSnapshot';
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
                    // console.log('FB<Users>', error)
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
                    // console.log('FB<Restaurants>', error)
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
                    // console.log('FB<Restaurants>', error)
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
                    // console.log('FB<Restaurants>', error)
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
                    // console.log('FB<Restaurants>', error)
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
                    // console.log('FB<Restaurants>', error)
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
                    // console.log('FB<Restaurants>', error)
                },
                () => {},
            );

        return subscriber;
    };
}

export default FirebaseRepositories;
