import React, {useCallback, useContext, useMemo, useRef} from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {LocationContext} from '@libs/ieatta/reducer/locationProvider';

function LocationInfo() {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const {state, dispatch} = useContext(LocationContext);

    return (
        <View style={[styles.gap2]}>
            <Text style={[styles.pl2, styles.fontBold]}>Location Info:</Text>
            <View style={[styles.gap1]}>
                <Text style={[styles.pl10, styles.fontLight, styles.colorTextSupporting]}>{`Permission: ${state.grantedLocationPermission ? 'enabled' : 'disabled'}`}</Text>
                <Text style={[styles.pl10, styles.fontLight, styles.colorTextSupporting]}>{`latitude: ${state.location.latitude}`}</Text>
                <Text style={[styles.pl10, styles.fontLight, styles.colorTextSupporting]}>{`longitude: ${state.location.longitude}`}</Text>
            </View>
        </View>
    );
}

export default LocationInfo;
