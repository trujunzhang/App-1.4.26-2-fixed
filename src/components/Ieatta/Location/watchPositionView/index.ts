/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

        hasAskedForLocationPermission.current = true;
        // No need to watch position on the web app.
    }, [dispatch]);

    return null;
}

WatchPositionView.displayName = 'WatchPositionView';

export default WatchPositionView;
