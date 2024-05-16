import firestore from '@react-native-firebase/firestore';
import {FBCollections} from '@libs/Firebase/constant';
import type {IFBEvent, IFBPeopleInEvent, IFBPhoto, IFBRecipe, IFBRestaurant, IFBReview, IFBUser} from '@src/types/firebase';
import type {DeleteData, GetData, IeattaModelsWithoutUser, SetData} from './types';
import type IFirebaseHelper from './types';

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
        return doc.set(model, {merge: true});
    }

    /**
     |--------------------------------------------------
     | Set Data for user
     |--------------------------------------------------
     */
    saveUser(model: IFBUser) {
        const doc = firestore().collection(FBCollections.Profiles).doc(model.id);
        return doc.set(model, {merge: true});
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
                return querySnapshot.docs[0].data() as IFBUser;
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
}

export default FirebaseHelper;
