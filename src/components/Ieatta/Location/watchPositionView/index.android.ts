/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Geolocation from '@react-native-community/geolocation';
import {useRealm} from '@realm/react';
import type {ReactElement, ReactNode} from 'react';
import React, {useContext, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import FirebaseRepositories from '@libs/FirebaseIeatta/services/firebase-repositories';
import {watchCurrentPosition} from '@libs/getWatchPosition';
import {LocationContext} from '@libs/ieatta/reducer/locationProvider';
import locationReducer from '@libs/ieatta/reducer/locationReducer';
import Log from '@libs/Log';
import CONST from '@src/CONST';

function WatchPositionView() {
    const {state, dispatch} = useContext(LocationContext);

    const hasAskedForLocationPermission = useRef(false);

    useEffect(() => {
        if (hasAskedForLocationPermission.current) {
            return;
        }

        if (state.grantedLocationPermission === false) {
            return;
        }

        hasAskedForLocationPermission.current = true;
        const watchId = watchCurrentPosition(
            (params) => {
                const currentCoords = {longitude: params.coords.longitude, latitude: params.coords.latitude};
                dispatch({type: 'update', payload: {location: currentCoords}});
            },
            (error) => {
                console.log(error);
            },
        );
        // Clean up function to stop watching when the component unmounts or dependencies change
        return () => {
            Geolocation.clearWatch(watchId);
        };
    }, [dispatch, state.grantedLocationPermission]);

    return null;
}

WatchPositionView.displayName = 'WatchPositionView';

export default WatchPositionView;
