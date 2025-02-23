import ConnectionCompletePage from '@expPages/ConnectionCompletePage';
import SessionExpiredPage from '@expPages/ErrorPage/SessionExpiredPage';
import LogInWithShortLivedAuthTokenPage from '@expPages/LogInWithShortLivedAuthTokenPage';
import AppleSignInDesktopPage from '@expPages/signin/AppleSignInDesktopPage';
import GoogleSignInDesktopPage from '@expPages/signin/GoogleSignInDesktopPage';
import SAMLSignInPage from '@expPages/signin/SAMLSignInPage';
import SignInPage from '@expPages/signin/SignInPage';
import UnlinkLoginPage from '@expPages/UnlinkLoginPage';
import ValidateLoginPage from '@expPages/ValidateLoginPage';
import React from 'react';
import {NativeModules} from 'react-native';
import createPlatformStackNavigator from '@libs/Navigation/PlatformStackNavigation/createPlatformStackNavigator';
import type {PublicScreensParamList} from '@navigation/types';
import NAVIGATORS from '@src/NAVIGATORS';
import SCREENS from '@src/SCREENS';
import defaultScreenOptions from './defaultScreenOptions';

const RootStack = createPlatformStackNavigator<PublicScreensParamList>();

function PublicScreens() {
    return (
        <RootStack.Navigator screenOptions={defaultScreenOptions}>
            {/* The structure for the HOME route has to be the same in public and auth screens. That's why the name for SignInPage is BOTTOM_TAB_NAVIGATOR. */}
            <RootStack.Screen
                name={NAVIGATORS.BOTTOM_TAB_NAVIGATOR}
                component={NativeModules.HybridAppModule ? SessionExpiredPage : SignInPage}
            />
            <RootStack.Screen
                name={SCREENS.TRANSITION_BETWEEN_APPS}
                component={LogInWithShortLivedAuthTokenPage}
            />
            <RootStack.Screen
                name={SCREENS.VALIDATE_LOGIN}
                options={defaultScreenOptions}
                component={ValidateLoginPage}
            />
            <RootStack.Screen
                name={SCREENS.CONNECTION_COMPLETE}
                component={ConnectionCompletePage}
            />
            <RootStack.Screen
                name={SCREENS.UNLINK_LOGIN}
                component={UnlinkLoginPage}
            />
            <RootStack.Screen
                name={SCREENS.SIGN_IN_WITH_APPLE_DESKTOP}
                component={AppleSignInDesktopPage}
            />
            <RootStack.Screen
                name={SCREENS.SIGN_IN_WITH_GOOGLE_DESKTOP}
                component={GoogleSignInDesktopPage}
            />
            <RootStack.Screen
                name={SCREENS.SAML_SIGN_IN}
                component={SAMLSignInPage}
            />
        </RootStack.Navigator>
    );
}

PublicScreens.displayName = 'PublicScreens';

export default PublicScreens;
