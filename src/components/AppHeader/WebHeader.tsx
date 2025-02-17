import React, {useCallback} from 'react';
import {View} from 'react-native';
import Header from '@components/Header';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import Navigation from '@navigation/Navigation';
import SearchRestaurantsButton from '@pages/searchPages/restaurants/SearchRouter/SearchRestaurantsButton';
import * as Session from '@userActions/Session';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';

function WebHeader() {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {isSmallScreenWidth} = useResponsiveLayout();

    return (
        <View
            style={[styles.flexRow, styles.ph5, styles.pv3, styles.justifyContentBetween, styles.alignItemsCenter]}
            dataSet={{dragArea: true}}
        >
            <Header
                title={translate('sidebar.header.title')}
                subtitle={translate('sidebar.header.subTitle')}
                textStyles={[styles.textAlignCenter]}
                shouldShowEnvironmentBadge={false}
            />
            <SearchRestaurantsButton />
        </View>
    );
}

export default WebHeader;
