import type {GetCurrentPosition, WatchCurrentPosition} from './getCurrentPosition.types';
import {GeolocationErrorCode} from './getCurrentPosition.types';

const watchCurrentPosition: WatchCurrentPosition = (success, error, options) => {
    if (navigator === undefined || !('geolocation' in navigator)) {
        error({
            code: GeolocationErrorCode.NOT_SUPPORTED,
            message: 'Geolocation is not supported by this environment.',
            PERMISSION_DENIED: GeolocationErrorCode.PERMISSION_DENIED,
            POSITION_UNAVAILABLE: GeolocationErrorCode.POSITION_UNAVAILABLE,
            TIMEOUT: GeolocationErrorCode.TIMEOUT,
            NOT_SUPPORTED: GeolocationErrorCode.NOT_SUPPORTED,
        });
        return;
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
};

const getCurrentPosition: GetCurrentPosition = (success, error, options) => {
    if (navigator === undefined || !('geolocation' in navigator)) {
        error({
            code: GeolocationErrorCode.NOT_SUPPORTED,
            message: 'Geolocation is not supported by this environment.',
            PERMISSION_DENIED: GeolocationErrorCode.PERMISSION_DENIED,
            POSITION_UNAVAILABLE: GeolocationErrorCode.POSITION_UNAVAILABLE,
            TIMEOUT: GeolocationErrorCode.TIMEOUT,
            NOT_SUPPORTED: GeolocationErrorCode.NOT_SUPPORTED,
        });
        return;
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
};

export {watchCurrentPosition};
export default getCurrentPosition;
