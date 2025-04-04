import React, {useEffect} from 'react';
import {View} from 'react-native';
import ScreenWrapper from '@components/ScreenWrapper';
import useThemeStyles from '@hooks/useThemeStyles';
import * as Browser from '@libs/Browser';
import Performance from '@libs/Performance';
import SidebarLinksData from '@pages/home/sidebar/SidebarLinksData';
import Timing from '@userActions/Timing';
import CONST from '@src/CONST';

/**
 * Function called when a pinned chat is selected.
 */
const startTimer = () => {
    // Timing.start(CONST.TIMING.SWITCH_REPORT);
    // Performance.markStart(CONST.TIMING.SWITCH_REPORT);
};

type BaseSidebarScreenProps = {
    children?: React.ReactNode;
};

function BaseSidebarScreen({children}: BaseSidebarScreenProps) {
    const styles = useThemeStyles();
    useEffect(() => {
        // Performance.markStart(CONST.TIMING.SIDEBAR_LOADED);
        // Timing.start(CONST.TIMING.SIDEBAR_LOADED, true);
    }, []);

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom
            shouldEnableKeyboardAvoidingView={false}
            style={[styles.sidebar, Browser.isMobile() ? styles.userSelectNone : {}]}
            testID={BaseSidebarScreen.displayName}
        >
            {({insets}) => (
                <>
                    <View style={[styles.flex1]}>
                        <SidebarLinksData insets={insets} />
                    </View>
                    {children}
                </>
            )}
        </ScreenWrapper>
    );
}

BaseSidebarScreen.displayName = 'BaseSidebarScreen';
export default BaseSidebarScreen;
