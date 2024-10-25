import React, {useEffect, useMemo, useState} from 'react';
import FirebaseRepositories from '@libs/Firebase/services/firebase-repositories';
import type FirebaseProviderProps from './types';

export default function FirebaseProvider({children, isAuthenticated}: FirebaseProviderProps) {
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

    return children;
}

FirebaseProvider.displayName = 'FirebaseProvider';
