import type {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import type IFirebaseUser from './types';

class FirebaseUser implements IFirebaseUser {
    updateFirebaseUserName(displayName: string): Promise<void> {
        const authUserModel: FirebaseAuthTypes.User | null = auth().currentUser;
        if (authUserModel === null || authUserModel === undefined) {
            return Promise.resolve();
        }
        const photoURL = authUserModel?.photoURL;
        const updates: FirebaseAuthTypes.UpdateProfile = {
            displayName,
            photoURL,
        };
        // Update Firebase user's name.
        return authUserModel?.updateProfile(updates);
    }

    updateFirebaseUserPhoto(photoURL: string): Promise<void> {
        const authUserModel: FirebaseAuthTypes.User | null = auth().currentUser;
        if (authUserModel === null || authUserModel === undefined) {
            return Promise.resolve();
        }
        // Update Firebase user's photo.
        const displayName = authUserModel?.displayName;
        const updates: FirebaseAuthTypes.UpdateProfile = {
            displayName,
            photoURL,
        };
        return authUserModel.updateProfile(updates);
    }
}

export default FirebaseUser;
