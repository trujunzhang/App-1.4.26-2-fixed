// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import {ParseModelUsers} from '@libs/Firebase/appModel';
import Log from '@libs/Log';
import {saveSession} from '@userActions/Firebase/UserFB';
import type {IFBUser} from '@src/types/firebase';
import FirebaseHelper from './firebase-helper';

type CredentialUser = {
    // The user's unique ID.
    uid: string;
    // The user's display name (if available).
    displayName: string | null;
    // The user's email address (if available).
    email: string | null;
    // The URL of the user's profile picture (if available).
    photoURL: string | null;
};

class FirebaseLogin {
    saveUser(credentialUser: CredentialUser): Promise<void> {
        return new FirebaseHelper()
            .getUserByEmail(credentialUser.email ?? '')
            .then((data) => {
                if (_.isEmpty(data)) {
                    const model: IFBUser = ParseModelUsers.getUserModel({
                        uid: credentialUser.uid,
                        displayName: credentialUser.displayName ?? '',
                        email: credentialUser.email ?? '',
                        photoURL: credentialUser.photoURL ?? '',
                    });
                    return new FirebaseHelper().saveUser(model);
                }
                return Promise.resolve();
            })
            .then(() => {
                return new FirebaseHelper().getUserByEmail(credentialUser.email ?? '');
            })
            .then((data) => {
                if (data !== null && data !== undefined) {
                    saveSession(data);
                }
                return Promise.resolve();
            })
            .catch((error) => {
                Log.info(`[FirebaseLogin.saveUser] <error> ${error}`);
            });
    }
}

export default FirebaseLogin;
