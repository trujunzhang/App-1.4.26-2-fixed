import React, {useCallback, useRef} from 'react';
import {View} from 'react-native';
import LogoComponent from '@assets/images/expensify-wordmark.svg';
import Header from '@components/Header';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import ImageSVG from '@components/ImageSVG';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import Navigation from '@navigation/Navigation';
import SignInOrAvatarWithOptionalStatus from '@expPages/home/sidebar/SignInOrAvatarWithOptionalStatus';
import variables from '@styles/variables';
import * as Session from '@userActions/Session';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';

function WebHeader(props) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const modal = useRef({});
    const {translate, updateLocale} = useLocalize();
    const {isSmallScreenWidth} = useWindowDimensions();

    const isCreateMenuOpen = false;

    const showSearchPage = useCallback(() => {
        Navigation.navigate(ROUTES.SEARCH);
    }, []);

    return (
        <View
            style={[styles.flexRow, styles.ph5, styles.pv3, styles.justifyContentBetween, styles.alignItemsCenter]}
            dataSet={{dragArea: true}}
        >
            <Header
                title={translate('sidebar.header.title')}
                subtitle={translate('sidebar.header.subTitle')}
                textStyles={[styles.textAlignCenter]}
                role={CONST.ROLE.PRESENTATION}
                shouldShowEnvironmentBadge={false}
            />
            <Tooltip text={translate('common.search')}>
                <PressableWithoutFeedback
                    accessibilityLabel={translate('sidebarScreen.buttonSearch')}
                    role={CONST.ROLE.BUTTON}
                    style={[styles.flexRow, styles.ph5]}
                    onPress={Session.checkIfActionIsAllowed(showSearchPage)}
                >
                    <Icon
                        fill={theme.icon}
                        src={Expensicons.MagnifyingGlass}
                    />
                </PressableWithoutFeedback>
            </Tooltip>
            {/*<SignInOrAvatarWithOptionalStatus isCreateMenuOpen={isCreateMenuOpen} />*/}
        </View>
    );
}

export default WebHeader;
