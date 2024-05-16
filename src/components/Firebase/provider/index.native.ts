import {useRealm} from '@realm/react';
import type {ReactElement, ReactNode} from 'react';
import React, {useEffect, useMemo, useState} from 'react';
import FirebaseRepositories from '@libs/Firebase/services/firebase-repositories/index.native';
import Log from '@libs/Log';
import CONST from '@src/CONST';
import type FirebaseProviderProps from './types';

export default function FirebaseProvider({children, isAuthenticated}: FirebaseProviderProps) {
    const realm = useRealm();

    Log.info(`User Realm User file location: ${realm.path}`);

    useEffect(() => {
        let unsubscribes = () => {};

        if (isAuthenticated) {
            const repositories = new FirebaseRepositories(realm);

            const unsubscribeUsers = repositories.listenUsers();
            const unsubscribeEvents = repositories.listenEvents();
            const unsubscribeRestaurants = repositories.listenRestaurants();
            const unsubscribeRecipes = repositories.listenRecipes();
            const unsubscribeReviews = repositories.listenReviews();
            const unsubscribePhotos = repositories.listenPhotos();
            const unsubscribePeopleInEvents = repositories.listenPeopleInEvents();

            unsubscribes = () => {
                unsubscribeUsers();
                unsubscribeEvents();
                unsubscribeRestaurants();
                unsubscribeRecipes();
                unsubscribeReviews();
                unsubscribePhotos();
                unsubscribePeopleInEvents();
            };
        }
        return () => {
            unsubscribes();
        };
    }, [realm, isAuthenticated]);

    return children;
}

FirebaseProvider.displayName = 'FirebaseProvider';
