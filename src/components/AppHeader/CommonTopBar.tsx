import React from 'react';
import {View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import SearchWithLabel from '@components/Ieatta/components/SearchWithLabel';
import Image from '@components/Image';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import SignInOrAvatarWithOptionalStatus from '@pages/home/sidebar/SignInOrAvatarWithOptionalStatus';
import variables from '@styles/variables';
import * as Session from '@userActions/Session';
import CONST from '@src/CONST';
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
                source={Expensicons.YelpMenu}
            />
        );
    };
    return (
        <View
            style={[styles.gap4, styles.flexRow, styles.ph5, styles.pv4, styles.justifyContentBetween, styles.alignItemsCenter]}
            dataSet={{dragArea: true}}
        >
            <Logo />
            <SearchWithLabel
                placeholder={translate('headerPanel.search.buttonSearch')}
                onPress={Session.checkIfActionIsAllowed(() => Navigation.navigate(ROUTES.SEARCH.getRoute(CONST.TAB_SEARCH.ALL)))}
                containerStyle={[styles.flex1]}
            />
            <SignInOrAvatarWithOptionalStatus isCreateMenuOpen={false} />
        </View>
    );
}

CommonTopBar.displayName = 'CommonTopBar';

export default CommonTopBar;
