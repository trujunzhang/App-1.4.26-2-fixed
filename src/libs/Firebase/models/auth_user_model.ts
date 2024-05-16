/* eslint-disable @typescript-eslint/consistent-type-definitions */

/* eslint-disable rulesdir/no-inline-named-export */
import lodashGet from 'lodash/get';
import type {PersonalDetails} from '@src/types/onyx';

export interface IAuthUser {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
}

export const getAuthUserFromPersonalDetails = (personalDetails: PersonalDetails): IAuthUser => {
    return {
        uid: personalDetails.userID,
        email: lodashGet(personalDetails, 'email', ''),
        displayName: lodashGet(personalDetails, 'displayName', ''),
        photoURL: lodashGet(personalDetails, 'avatarThumbnail', ''),
    };
};

export class AuthUserModel {
    static mockedUser(): IAuthUser {
        const model: IAuthUser = {
            uid: 'mockedUID',
            email: 'mock@gmail.com',
            displayName: 'mockedDisplayName',
            photoURL: 'mockedPhotoUrl',
        };
        return model;
    }
}
