import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {db} from '@libs/Firebase/config/firebase';
import {FBCollections} from '../../constant';
import ListenerUsersSnapshot from './ListenerUsersSnapshot';
import type IFirebaseRepositories from './types';

class FirebaseRepositories implements IFirebaseRepositories {
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
            // querySnapshot.docChanges().forEach((change) => {
            //     if (change.type === 'added') {
            //         console.log('New profile: ', change.doc.data());
            //     }
            //     if (change.type === 'modified') {
            //         console.log('Modified profile: ', change.doc.data());
            //     }
            //     if (change.type === 'removed') {
            //         console.log('Removed profile: ', change.doc.data());
            //     }
            // });
        });
        return unsubscribe;
    }
}

export default FirebaseRepositories;
