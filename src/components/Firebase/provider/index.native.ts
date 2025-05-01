/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {useRealm} from '@realm/react';
import type {ReactElement, ReactNode} from 'react';
import React, {useContext, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import FirebaseRepositories from '@libs/FirebaseIeatta/services/firebase-repositories';
import {grantLocationPermission} from '@libs/getWatchPosition';
import {LocationContext} from '@libs/ieatta/reducer/locationProvider';
import locationReducer from '@libs/ieatta/reducer/locationReducer';
import Log from '@libs/Log';
import CONST from '@src/CONST';
import type FirebaseProviderProps from './types';

export default function FirebaseProvider({children, isAuthenticated}: FirebaseProviderProps) {
    const realm = useRealm();

    Log.info(`User Realm User file location: ${realm.path}`);

    const {state, dispatch} = useContext(LocationContext);

    const hasAskedForLocationPermission = useRef(false);

    useEffect(() => {
        if (hasAskedForLocationPermission.current) {
            return;
        }

        hasAskedForLocationPermission.current = true;
        grantLocationPermission(
            () => {
                dispatch({type: 'setGrantedState', payload: {grantedLocationPermission: true}});
            },
            () => {},
        );
        // watchCurrentPosition(
        //     (params) => {
        //         const currentCoords = {longitude: params.coords.longitude, latitude: params.coords.latitude};
        //         dispatch({type: 'update', payload: {location: currentCoords}});
        //     },
        //     () => {},
        // );
    }, [dispatch]);

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
