import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import type {PublicScreensParamList} from '@navigation/types';
import SignInPage from '@pages/signin/SignInPage';
import LogInWithShortLivedAuthTokenPage from '@expPages/LogInWithShortLivedAuthTokenPage';
import AppleSignInDesktopPage from '@expPages/signin/AppleSignInDesktopPage';
import GoogleSignInDesktopPage from '@expPages/signin/GoogleSignInDesktopPage';
import SAMLSignInPage from '@expPages/signin/SAMLSignInPage';
import UnlinkLoginPage from '@expPages/UnlinkLoginPage';
import ValidateLoginPage from '@expPages/ValidateLoginPage';
import SCREENS from '@src/SCREENS';
import defaultScreenOptions from './defaultScreenOptions';

const RootStack = createStackNavigator<PublicScreensParamList>();

function PublicScreens() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name={SCREENS.HOME}
                options={defaultScreenOptions}
                component={SignInPage}
            />
            <RootStack.Screen
                name={SCREENS.TRANSITION_BETWEEN_APPS}
                options={defaultScreenOptions}
                component={LogInWithShortLivedAuthTokenPage}
            />
            <RootStack.Screen
                name={SCREENS.VALIDATE_LOGIN}
                options={defaultScreenOptions}
                component={ValidateLoginPage}
            />
            <RootStack.Screen
                name={SCREENS.UNLINK_LOGIN}
                options={defaultScreenOptions}
                component={UnlinkLoginPage}
            />
            <RootStack.Screen
                name={SCREENS.SIGN_IN_WITH_APPLE_DESKTOP}
                options={defaultScreenOptions}
                component={AppleSignInDesktopPage}
            />
            <RootStack.Screen
                name={SCREENS.SIGN_IN_WITH_GOOGLE_DESKTOP}
                options={defaultScreenOptions}
                component={GoogleSignInDesktopPage}
            />
            <RootStack.Screen
                name={SCREENS.SAML_SIGN_IN}
                options={defaultScreenOptions}
                component={SAMLSignInPage}
            />
        </RootStack.Navigator>
    );
}

PublicScreens.displayName = 'PublicScreens';

export default PublicScreens;
