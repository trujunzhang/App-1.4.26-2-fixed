import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import createCustomFullScreenNavigator from '@libs/Navigation/AppNavigator/createCustomFullScreenNavigator';
import getRootNavigatorScreenOptions from '@libs/Navigation/AppNavigator/getRootNavigatorScreenOptions';
import * as ModalStackNavigators from '@libs/Navigation/AppNavigator/ModalStackNavigators';
import SCREENS from '@src/SCREENS';

const loadWorkspaceInitialPage = () => require('@src/expPages/workspace/WorkspaceInitialPage').default as React.ComponentType;

// const RootStack = createCustomFullScreenNavigator();
const RootStack = createStackNavigator();

function FullScreenNavigator() {
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const {isSmallScreenWidth} = useWindowDimensions();
    const screenOptions = getRootNavigatorScreenOptions(isSmallScreenWidth, styles, StyleUtils);

    return <View style={styles.rootNavigatorContainerStyles(isSmallScreenWidth)}>{/* <RootStack.Navigator /> */}</View>;
}

FullScreenNavigator.displayName = 'FullScreenNavigator';

export default FullScreenNavigator;
