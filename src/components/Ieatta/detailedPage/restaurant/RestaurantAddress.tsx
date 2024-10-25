import React from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';

type RestaurantAddressProps = {
    address: string;
};

function RestaurantAddress({address}: RestaurantAddressProps) {
    const styles = useThemeStyles();

    return (
        <View style={[styles.flexRow, styles.alignItemsCenter, styles.ph3, styles.pv4, styles.sectionComponentContainer]}>
            <Text style={[styles.sectionInfoNormal]}>{address}</Text>
        </View>
    );
}

export default React.memo(RestaurantAddress);
