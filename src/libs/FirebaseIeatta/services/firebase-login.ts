/* eslint-disable no-else-return */
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import {ParseModelUsers} from '@libs/FirebaseIeatta/appModel';
import Log from '@libs/Log';
import {saveSession} from '@userActions/Firebase/UserFB';
import CONST from '@src/CONST';
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

type SaveUserParams = {
    credentialUser: CredentialUser;
    refreshToken?: string;
};

class FirebaseLogin {
    saveUser({credentialUser, refreshToken = CONST.DEFAULT_SESSION_TOKEN}: SaveUserParams): Promise<void> {
        return new FirebaseHelper()
            .getUserByEmail(credentialUser.email ?? '')
            .then((data: IFBUser | null | undefined) => {
                // If user is not exist, create it.
                if (data === null || data === undefined) {
                    const nextModal: IFBUser = ParseModelUsers.getUserModel({
                        uid: credentialUser.uid,
                        displayName: credentialUser.displayName ?? '',
                        email: credentialUser.email ?? '',
                        photoURL: credentialUser.photoURL ?? '',
                    });
                    return new FirebaseHelper().saveUser(nextModal);
                }
                return Promise.resolve();
            })
            .then(() => {
                return new FirebaseHelper().getUserByEmail(credentialUser.email ?? '');
            })
            .then((data) => {
                if (data !== null && data !== undefined) {
                    saveSession({user: data, refreshToken});
                }
                return Promise.resolve();
            })
            .catch((error) => {
                Log.info(`[FirebaseLogin.saveUser] <error> ${error}`);
            });
    }
}

export default FirebaseLogin;
