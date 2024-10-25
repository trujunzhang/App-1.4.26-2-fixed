import React from 'react';
import {View} from 'react-native';
import SearchWithLabel from '@components/Ieatta/components/SearchWithLabel';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import SignInOrAvatarWithOptionalStatus from '@pages/home/sidebar/SignInOrAvatarWithOptionalStatus';
import * as Session from '@userActions/Session';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import Logo from './Logo';

function FullScreenToolBar() {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    return (
        <View
            style={[styles.gap4, styles.flexRow, styles.ph5, styles.pv4, styles.justifyContentBetween, styles.alignItemsCenter, styles.ph8, styles.mb3, styles.shadowLg]}
            dataSet={{dragArea: true}}
        >
            <Logo />
            <SearchWithLabel
                placeholder={translate('headerPanel.search.buttonSearch')}
                onPress={Session.checkIfActionIsAllowed(() => Navigation.navigate(ROUTES.SEARCH.getRoute(CONST.TAB_SEARCH.ALL)))}
                containerStyle={[styles.flex1, {maxWidth: 1024}]}
            />
            <SignInOrAvatarWithOptionalStatus isCreateMenuOpen={false} />
        </View>
    );
}

FullScreenToolBar.displayName = 'FullScreenToolBar';

export default FullScreenToolBar;
