import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import {PressableWithFeedback} from '@components/Pressable';
import Tooltip from '@components/Tooltip';
import useActiveWorkspace from '@hooks/useActiveWorkspace';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import * as Session from '@libs/actions/Session';
import getTopmostBottomTabRoute from '@libs/NavigationLast/getTopmostBottomTabRoute';
import getTopmostCentralPaneRoute from '@libs/NavigationLast/getTopmostCentralPaneRoute';
import Navigation from '@libs/NavigationLast/Navigation';
import type {RootStackParamList, State} from '@libs/NavigationLast/types';
import {getChatTabBrickRoad} from '@libs/WorkspacesSettingsUtils';
import variables from '@styles/variables';
import * as Welcome from '@userActions/Welcome';
import CONST from '@src/CONST';
import BottomTabAvatar from '@src/expPages/home/sidebar/BottomTabAvatar';
import BottomTabBarFloatingActionButton from '@src/expPages/home/sidebar/BottomTabBarFloatingActionButton';
import NAVIGATORS from '@src/NAVIGATORS';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import SCREENS from '@src/SCREENS';

type PurposeForUsingIeattaModalOnyxProps = {
    isLoadingApp: OnyxEntry<boolean>;
};
type PurposeForUsingIeattaModalProps = PurposeForUsingIeattaModalOnyxProps;

function BottomTabBar({isLoadingApp = false}: PurposeForUsingIeattaModalProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {activeWorkspaceID} = useActiveWorkspace();

    const navigation = useNavigation();

    useEffect(() => {
        const navigationState = navigation.getState() as State<RootStackParamList> | undefined;
        const routes = navigationState?.routes;
        const currentRoute = routes?.[navigationState?.index ?? 0];

        if (Boolean(currentRoute && currentRoute.name !== NAVIGATORS.BOTTOM_TAB_NAVIGATOR && currentRoute.name !== NAVIGATORS.CENTRAL_PANE_NAVIGATOR) || Session.isAnonymousUser()) {
            return;
        }

        Welcome.isOnboardingFlowCompleted({onNotCompleted: () => Navigation.navigate(ROUTES.ONBOARDING_ROOT)});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingApp]);

    // Parent navigator of the bottom tab bar is the root navigator.
    const currentTabName = useNavigationState<RootStackParamList, string | undefined>((state) => {
        const topmostCentralPaneRoute = getTopmostCentralPaneRoute(state);

        if (topmostCentralPaneRoute && topmostCentralPaneRoute.name === SCREENS.SEARCH.CENTRAL_PANE) {
            return SCREENS.SEARCH.CENTRAL_PANE;
        }

        const topmostBottomTabRoute = getTopmostBottomTabRoute(state);
        return topmostBottomTabRoute?.name ?? SCREENS.HOME;
    });

    const chatTabBrickRoad = getChatTabBrickRoad(activeWorkspaceID);

    return (
        <View style={styles.bottomTabBarContainer}>
            <Tooltip text={translate('common.chats')}>
                <PressableWithFeedback
                    onPress={() => {
                        Navigation.navigate(ROUTES.HOME);
                    }}
                    role={CONST.ROLE.BUTTON}
                    accessibilityLabel={translate('common.chats')}
                    wrapperStyle={styles.flex1}
                    style={styles.bottomTabBarItem}
                >
                    <View>
                        <Icon
                            src={Expensicons.ChatBubble}
                            fill={currentTabName === SCREENS.HOME ? theme.iconMenu : theme.icon}
                            width={variables.iconBottomBar}
                            height={variables.iconBottomBar}
                        />
                        {chatTabBrickRoad && (
                            <View style={styles.bottomTabStatusIndicator(chatTabBrickRoad === CONST.BRICK_ROAD_INDICATOR_STATUS.INFO ? theme.iconSuccessFill : theme.danger)} />
                        )}
                    </View>
                </PressableWithFeedback>
            </Tooltip>
            <BottomTabBarFloatingActionButton />
            <BottomTabAvatar isSelected={currentTabName === SCREENS.SETTINGS.ROOT} />
        </View>
    );
}

BottomTabBar.displayName = 'BottomTabBar';

export default withOnyx<PurposeForUsingIeattaModalProps, PurposeForUsingIeattaModalOnyxProps>({
    isLoadingApp: {
        key: ONYXKEYS.IS_LOADING_APP,
    },
})(BottomTabBar);
