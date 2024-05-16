import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import Image from '@components/Image';
import Search from '@components/Search';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import SignInOrAvatarWithOptionalStatus from '@pages/home/sidebar/SignInOrAvatarWithOptionalStatus';
import variables from '@styles/variables';
import * as Session from '@userActions/Session';
import ROUTES from '@src/ROUTES';

function TopBar() {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const leftIconxxx = () => {
        return (
            <Icon
                fill={theme.icon}
                width={variables.iconSizeYelpLogoWidth}
                height={variables.iconSizeYelpLogoHeight}
                src={Expensicons.YelpLogo}
            />
        );
    };

    const leftIcon = () => {
        return (
            <Image
                style={[
                    {
                        width: variables.iconSizeYelpLogoWidth,
                        height: variables.iconSizeYelpLogoHeight,
                    },
                ]}
                source={Expensicons.YelpMenu}
            />
        );
    };
    return (
        <View
            style={[styles.gap4, styles.flexRow, styles.ph5, styles.pv4, styles.justifyContentBetween, styles.alignItemsCenter]}
            dataSet={{dragArea: true}}
        >
            {leftIcon()}
            <Search
                placeholder={translate('sidebarScreen.buttonSearch')}
                onPress={Session.checkIfActionIsAllowed(() => Navigation.navigate(ROUTES.SEARCH))}
                containerStyle={[styles.flex1]}
            />
            <SignInOrAvatarWithOptionalStatus />
        </View>
    );
}

TopBar.displayName = 'TopBar';

export default TopBar;
