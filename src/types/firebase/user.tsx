/* eslint-disable react/no-unused-prop-types */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React from 'react';

type PreferredTheme = 'light' | 'dark' | 'system';

export interface IFBUser {
    // Base(3)
    id: string;
    createdAt: string;
    updatedAt: string;
    // Common(3)
    username: string;
    /** First name of the current user from their personal details */
    firstName: string;
    /** Last name of the current user from their personal details */
    lastName: string;
    slug: string;
    email: string;
    // The theme setting set by the user in preferences.
    // This can be either "light", "dark" or "system"
    preferredTheme: PreferredTheme;
    /** Indicates which locale should be used */
    preferredLocale: string;
    // Property(3)
    loginType: string;
    originalUrl?: string;
    thumbnailUrl?: string;
}

export interface IFBUserStatistics {
    restaurants: number;
    photos: number;
    reviews: number;
}
// function User(props: IFBUser) {
//   return <>{props.id}</>;
// }
