import Geolocation from '@react-native-community/geolocation';
import type {GetCurrentPosition, WatchCurrentPosition} from './getCurrentPosition.types';

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
    locationProvider: 'auto',
});

const watchCurrentPosition: WatchCurrentPosition = (success, error, config) => {
    Geolocation.watchPosition(success, error, config);
};

const getCurrentPosition: GetCurrentPosition = (success, error, config) => {
    Geolocation.getCurrentPosition(success, error, config);
};

export {watchCurrentPosition};
export default getCurrentPosition;
