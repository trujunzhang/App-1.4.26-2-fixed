import Geolocation from '@react-native-community/geolocation';
import type {GrantLocationPermission, WatchCurrentPosition} from './getWatchPosition.types';

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
    locationProvider: 'auto',
});

const grantLocationPermission: GrantLocationPermission = (success, error) => {
    success();
};

const watchCurrentPosition: WatchCurrentPosition = (success, error, config): number => {
    return Geolocation.watchPosition(success, error, config);
};

export {grantLocationPermission, watchCurrentPosition};
