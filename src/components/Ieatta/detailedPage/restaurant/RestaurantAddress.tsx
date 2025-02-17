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
        <View style={[styles.flexRow, styles.alignItemsCenter, styles.ph8, styles.pv4, styles.backgroundComponentBG]}>
            <Text style={[styles.sectionInfoNormal, styles.sm]}>{address}</Text>
        </View>
    );
}

export default React.memo(RestaurantAddress);
