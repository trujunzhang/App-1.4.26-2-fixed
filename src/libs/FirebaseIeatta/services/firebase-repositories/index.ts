/* eslint-disable @typescript-eslint/no-explicit-any */
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {db} from '@libs/FirebaseIeatta/config/firebase';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import ListenerUsersSnapshot from './ListenerUsersSnapshot';
import type IFirebaseRepositories from './types';

class FirebaseRepositories implements IFirebaseRepositories {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
    constructor(realm: any) {}

    listenEvents(): () => void {
        return function () {};
    }

    listenPeopleInEvents(): () => void {
        return function () {};
    }

    listenPhotos(): () => void {
        return function () {};
    }

    listenRecipes(): () => void {
        return function () {};
    }

    listenRestaurants(): () => void {
        return function () {};
    }

    listenReviews(): () => void {
        return function () {};
    }

    listenUsers(): () => void {
        const q = query(collection(db, FBCollections.Profiles));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            new ListenerUsersSnapshot().listenerQuerySnapshot(querySnapshot as any);
        });
        return unsubscribe;
    }
}

export default FirebaseRepositories;
