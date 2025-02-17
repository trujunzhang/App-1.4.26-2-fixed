import React from 'react';
import {View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import SearchWithLabel from '@components/Ieatta/components/SearchWithLabel';
import Image from '@components/Image';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import SignInOrAvatarWithOptionalStatus from '@pages/home/sidebar/SignInOrAvatarWithOptionalStatus';
import SearchRestaurantsButton from '@pages/searchPages/restaurants/SearchRouter/SearchRestaurantsButton';
import variables from '@styles/variables';
import ROUTES from '@src/ROUTES';
import Logo from './Logo';

function CommonTopBar() {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const leftIcon = () => {
        return (
            <Image
                style={[
                    {
                        width: variables.iconSizeYelpLogoWidth,
                        height: variables.iconSizeYelpLogoHeight,
                    },
                ]}
                source={Ieattaicons.YelpMenu}
            />
        );
    };
    return (
        <View
            style={[styles.gap4, styles.flexRow, styles.ph5, styles.pv4, styles.justifyContentBetween, styles.alignItemsCenter]}
            dataSet={{dragArea: true}}
        >
            <Logo />
            <SearchRestaurantsButton
                showAsButton={false}
                style={[styles.flex1, styles.searchPressable]}
            />
            <SignInOrAvatarWithOptionalStatus isCreateMenuOpen={false} />
        </View>
    );
}

CommonTopBar.displayName = 'CommonTopBar';

export default CommonTopBar;
