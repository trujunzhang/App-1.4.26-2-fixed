import type {IFBUser} from '@src/types/firebase';
import type {IAuthUser} from '../models/auth_user_model';
import {slugifyToLower} from '../utils/slug_helper';
import {getDateStringForCreatedOrUpdatedDate} from '../utils/timeago_helper';

type FirstAndLastName = {
    firstName: string;
    lastName: string;
};

// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export class ParseModelUsers {
    static getUserModel(model: IAuthUser): IFBUser {
        const result = ParseModelUsers.extractFirstAndLastNameFromDisplayName(model.displayName);
        return {
            firstName: result.firstName,
            lastName: result.lastName,
            // Base(3)
            id: model.uid,
            createdAt: getDateStringForCreatedOrUpdatedDate(),
            updatedAt: getDateStringForCreatedOrUpdatedDate(),
            // Common(3)
            username: model.displayName,
            slug: slugifyToLower(model.displayName),
            email: model.email,
            preferredTheme: 'system',
            preferredLocale: 'en',
            // Property(3)
            loginType: 'google',
            originalUrl: model.photoURL,
            thumbnailUrl: '',
        };
    }

    /**
     * Gets the first and last name from the user's personal details.
     * If the login is the same as the displayName, then they don't exist,
     * so we return empty strings instead.
     */
    static extractFirstAndLastNameFromDisplayName(displayName: string): FirstAndLastName {
        if (displayName) {
            const firstSpaceIndex = displayName.indexOf(' ');
            const lastSpaceIndex = displayName.lastIndexOf(' ');
            if (firstSpaceIndex === -1) {
                return {firstName: displayName, lastName: ''};
            }

            return {
                firstName: displayName.substring(0, firstSpaceIndex).trim(),
                lastName: displayName.substring(lastSpaceIndex).trim(),
            };
        }

        return {firstName: '', lastName: ''};
    }

    static updateUserPhoto({model, originalUrl}: {model: IFBUser; originalUrl: string}): IFBUser {
        model.originalUrl = originalUrl;
        model.updatedAt = getDateStringForCreatedOrUpdatedDate();

        return model;
    }

    static updateUserProfile({model, username}: {model: IFBUser; username: string}): IFBUser {
        model.username = username;
        model.slug = slugifyToLower(username);
        model.updatedAt = getDateStringForCreatedOrUpdatedDate();

        return model;
    }
}
