import type {GrantLocationPermission, WatchCurrentPosition} from './getWatchPosition.types';
import {GeolocationErrorCode} from './getWatchPosition.types';

const grantLocationPermission: GrantLocationPermission = (success, error) => {
    success();
};

const watchCurrentPosition: WatchCurrentPosition = (success, error, options): number => {
    return -1;
};

export {grantLocationPermission, watchCurrentPosition};
