import {type} from 'os';
import CONST from '@src/CONST';
import type {UserLocation} from '@src/types/onyx';

type LocationState = {
    location: UserLocation;
    grantedLocationPermission: boolean;
};

// Define the action types
type LocationAction = {type: 'update'; payload: {location: UserLocation}} | {type: 'setGrantedState'; payload: {grantedLocationPermission: boolean}};

const initialLocationState: LocationState = {
    location: CONST.DEFAULT_LOCATION,
    grantedLocationPermission: false,
};

// Define the reducer function
const locationReducer = (state: LocationState, action: LocationAction): LocationState => {
    switch (action.type) {
        case 'update':
            return {...state, location: action.payload.location};
        case 'setGrantedState':
            return {...state, grantedLocationPermission: action.payload.grantedLocationPermission};
        default:
            return state;
    }
};

export type {LocationState, LocationAction};

export {initialLocationState};

export default locationReducer;
