import firestore from '@react-native-firebase/firestore';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import type {IeattaModelsWithoutUser, IFBRestaurant, IFBUser} from '@src/types/firebase';
import type IFirebaseHelper from './types';
import type {DeleteData, GetData, SetData, UpdateCover, UpdateUserProperties} from './types';

class FirebaseHelper implements IFirebaseHelper {
    /**
     |--------------------------------------------------
     | Get Data
     |--------------------------------------------------
     */
    getData({path, id}: GetData): Promise<IeattaModelsWithoutUser> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return firestore()
            .collection(path)
            .doc(id)
            .get()
            .then((documentSnapshot) => {
                return documentSnapshot.data();
            });
    }

    /**
     |--------------------------------------------------
     | Set Data
     |--------------------------------------------------
     */
    setData({path, model}: SetData): Promise<void> {
        const doc = firestore().collection(path).doc(model.uniqueId);
        doc.set(model, {merge: true});
        return Promise.resolve();
    }

    /**
     |--------------------------------------------------
     | Update the cover of restaurants and recipes
     |--------------------------------------------------
     */
    updateCover({path, uniqueId, coverData}: UpdateCover) {
        const doc = firestore().collection(path).doc(uniqueId);
        doc.set(coverData, {merge: true});
        return Promise.resolve();
    }

    /**
     |--------------------------------------------------
     | Set Data for user
     |--------------------------------------------------
     */
    saveUser(model: IFBUser) {
        const doc = firestore().collection(FBCollections.Profiles).doc(model.id);
        doc.set(model, {merge: true});
        return Promise.resolve();
    }

    /**
     |--------------------------------------------------
     | Set properties for user
     |--------------------------------------------------
     */
    updateUserProperties({userId, properties}: UpdateUserProperties) {
        const doc = firestore().collection(FBCollections.Profiles).doc(userId);
        doc.set(properties, {merge: true});
        return Promise.resolve();
    }

    /**
     |--------------------------------------------------
     | Get User Data by email
     |--------------------------------------------------
     */
    getUserByEmail(email: string): Promise<IFBUser | null | undefined> {
        return firestore()
            .collection(FBCollections.Profiles)
            .where('email', '==', email)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    return null;
                }
                return querySnapshot.docs.at(0)?.data() as IFBUser;
            });
    }

    /**
     |--------------------------------------------------
     | Delete Data
     |--------------------------------------------------
     */
    deleteData({path, uniqueId}: DeleteData): Promise<void> {
        return firestore().collection(path).doc(uniqueId).delete();
    }

    /**
     |--------------------------------------------------
     | Get the first restaurant
     |--------------------------------------------------
     */
    getFirstRestaurant(): Promise<IFBRestaurant | null | undefined> {
        return Promise.resolve(null);
    }
}

export default FirebaseHelper;
