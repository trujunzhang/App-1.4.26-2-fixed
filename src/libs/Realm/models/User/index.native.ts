/* eslint-disable @typescript-eslint/lines-between-class-members */

/* eslint-disable rulesdir/no-inline-named-export */
import type {ObjectSchema} from 'realm';
import Realm from 'realm';

// eslint-disable-next-line import/prefer-default-export
export class Profile extends Realm.Object<Profile> {
    // Base(3)
    id!: string;
    createdAt?: string;
    updatedAt?: string;

    // Common(3)
    username?: string;
    /** First name of the current user from their personal details */
    firstName?: string;
    /** Last name of the current user from their personal details */
    lastName?: string;
    slug?: string;
    email?: string;
    // The theme setting set by the user in preferences.
    // This can be either "light", "dark" or "system"
    preferredTheme?: string;
    /** Indicates which locale should be used */
    preferredLocale?: string;
    // Property(3)
    loginType?: string;
    originalUrl?: string;
    thumbnailUrl?: string;

    static schema: ObjectSchema = {
        name: 'Profile',
        properties: {
            // Base(3)
            id: {type: 'string', indexed: true},
            createdAt: 'string',
            updatedAt: 'string',

            // Common(3)
            username: 'string',
            /** First name of the current user from their personal details */
            firstName: 'string',
            /** Last name of the current user from their personal details */
            lastName: 'string',
            slug: 'string',
            email: 'string',
            // The theme setting set by the user in preferences.
            // This can be either "light", "dark" or "system"
            preferredTheme: 'string',
            /** Indicates which locale should be used */
            preferredLocale: 'string',
            // Property(3)
            loginType: 'string',
            originalUrl: 'string?',
            thumbnailUrl: 'string?',
        },
        primaryKey: 'id',
    };
}
