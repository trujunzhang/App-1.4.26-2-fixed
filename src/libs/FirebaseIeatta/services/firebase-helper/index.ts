import {collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where} from 'firebase/firestore';
import {db} from '@libs/FirebaseIeatta/config/firebase';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import type {IeattaModelsWithoutUser, IFBUser} from '@src/types/firebase';
import type IFirebaseHelper from './types';
import type {DeleteData, GetData, SetData, UpdateCover} from './types';

class FirebaseHelper implements IFirebaseHelper {
    /**
     |--------------------------------------------------
     | Get Data
     |--------------------------------------------------
     */
    getData({path, id}: GetData): Promise<IeattaModelsWithoutUser> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return getDoc(doc(db, path, id)).then((documentSnapshot) => {
            return documentSnapshot.data();
        });
    }

    /**
     |--------------------------------------------------
     | Set Data
     |--------------------------------------------------
     */
    setData({path, model}: SetData): Promise<void> {
        return setDoc(doc(db, path, model.uniqueId), model, {merge: true});
    }

    /**
     |--------------------------------------------------
     | Update the cover of restaurants and recipes
     |--------------------------------------------------
     */
    updateCover({path, uniqueId, coverData}: UpdateCover) {
        return setDoc(doc(db, path, uniqueId), coverData, {merge: true});
    }

    /**
     |--------------------------------------------------
     | Set Data for user
     |--------------------------------------------------
     */
    saveUser(model: IFBUser) {
        return setDoc(doc(db, FBCollections.Profiles, model.id), model, {
            merge: true,
        });
    }

    /**
     |--------------------------------------------------
     | Get User Data by email
     |--------------------------------------------------
     */
    getUserByEmail(email: string): Promise<IFBUser | null | undefined> {
        // https://firebase.google.com/docs/firestore/query-data/queries
        const usersRef = collection(db, FBCollections.Profiles);
        // Create a query against the collection.
        const q = query(usersRef, where('email', '==', email));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return getDocs(q).then((querySnapshot) => {
            // doc.data() is never undefined for query doc snapshots
            if (querySnapshot.empty) {
                return null;
            }
            if (querySnapshot.docs.at(0)?.data() !== undefined) {
                return querySnapshot.docs.at(0)?.data() as IFBUser;
            }
            return null;
        });
    }

    /**
     |--------------------------------------------------
     | Delete Data
     |--------------------------------------------------
     */
    deleteData({path, uniqueId}: DeleteData): Promise<void> {
        return deleteDoc(doc(db, path, uniqueId));
    }
}

export default FirebaseHelper;
