import React from 'react';
import {View} from 'react-native';
import useThemeStyles from '@hooks/useThemeStyles';
import SignInOrAvatarWithOptionalStatus from '@pages/home/sidebar/SignInOrAvatarWithOptionalStatus';
import SearchRestaurantsButton from '@pages/searchPages/restaurants/SearchRouter/SearchRestaurantsButton';
import Logo from './Logo';

function FullScreenToolBar() {
    const styles = useThemeStyles();

    return (
        <View
            style={[styles.gap4, styles.flexRow, styles.ph5, styles.pv4, styles.justifyContentBetween, styles.alignItemsCenter, styles.ph8, styles.mb3, styles.shadowLg]}
            dataSet={{dragArea: true}}
        >
            <Logo />
            <SearchRestaurantsButton
                showAsButton={false}
                style={[styles.flex1, styles.searchPressable, {maxWidth: 1024}]}
            />
            <SignInOrAvatarWithOptionalStatus isCreateMenuOpen={false} />
        </View>
    );
}

FullScreenToolBar.displayName = 'FullScreenToolBar';

export default FullScreenToolBar;
