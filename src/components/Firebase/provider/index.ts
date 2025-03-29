import React, {useEffect, useMemo, useState} from 'react';
import {getLastRestaurantId, setRestaurantIdInSidebar} from '@libs/actions/ieatta/restaurant';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import FirebaseRepositories from '@libs/FirebaseIeatta/services/firebase-repositories';
import type FirebaseProviderProps from './types';

export default function FirebaseProvider({children, isAuthenticated}: FirebaseProviderProps) {
    const restaurantIdInSidebar = getLastRestaurantId();

    useEffect(() => {
        let unsubscribes = () => {};

        if (isAuthenticated) {
            const repositories = new FirebaseRepositories(null);

            const unsubscribeUsers = repositories.listenUsers();

            unsubscribes = () => {
                unsubscribeUsers();
            };
        }
        return () => {
            unsubscribes();
        };
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            return;
        }
        new FirebaseHelper().getFirstRestaurant().then((data) => {
            if (data !== null && data !== undefined) {
                setRestaurantIdInSidebar(data.uniqueId);
            }
            return Promise.resolve();
        });
    }, [isAuthenticated, restaurantIdInSidebar]);

    return children;
}

FirebaseProvider.displayName = 'FirebaseProvider';
