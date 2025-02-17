/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import React from 'react';
// eslint-disable-next-line import/extensions
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import FirebaseLogin from '@libs/FirebaseIeatta/services/firebase-login';
import * as ShowNotify from '@libs/ieatta/Notify';
import Log from '@libs/Log';
import {setIsLoading} from '@userActions/Firebase/UserFB';
import CONFIG from '@src/CONFIG';
import CONST from '@src/CONST';
import BaseGoogleButton from './BaseGoogleButton';
import type {GoogleSignInButtonProps} from './types';

/**
 * Google Sign In button for mobile.
 * We have to load the gis script and then determine if the page is focused before rendering the button.
 * @returns
 */
function GoogleSignInButton({isLoading = false}: GoogleSignInButtonProps) {
    const {isSmallScreenWidth} = useResponsiveLayout();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const toastId = React.useRef<number | string | null>(null);

    /**
     * Google Sign In method for iOS and android that returns identityToken.
     */
    const googleSignInRequest = () => {
        GoogleSignin.configure({
            webClientId: CONFIG.APP_GOOGLE_SIGN_IN.WEB_CLIENT_ID,
            iosClientId: CONFIG.APP_GOOGLE_SIGN_IN.IOS_CLIENT_ID,
            offlineAccess: false,
        });

        // The package on android can sign in without prompting
        // the user which is not what we want. So we sign out
        // before signing in to ensure the user is prompted.
        GoogleSignin.signOut();

        setIsLoading(true);
        toastId.current = ShowNotify.initialAndShowNotify({isSmallScreenWidth, message: translate('notify.login.google.start'), autoClose: false});

        GoogleSignin.signIn()
            .then((response) => response.idToken)
            .then((idToken) => {
                Log.info(`[Google Signin] <token: '${idToken}'>`);

                // Create a Google credential with the token
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                // Sign-in the user with the credential
                return auth().signInWithCredential(googleCredential);
            })
            .then((userCredential) => {
                // The signed-in user info.
                const user = userCredential.user;
                return new FirebaseLogin().saveUser(user);
            })
            .then(() => {
                Log.info('[Google Sign In] <mobile> Google Sign In success');
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, message: translate('notify.login.google.success')});
            })
            .catch((error) => {
                // Handle unexpected error shape
                if (error === undefined || error.code === undefined) {
                    Log.alert(`[Google Sign In] Google sign in failed: ${error}`);
                    ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.login.google.error.unknown')});
                }
                /** The logged code is useful for debugging any new errors that are not specifically handled. To decode, see:
             - The common status codes documentation: https://developers.google.com/android/reference/com/google/android/gms/common/api/CommonStatusCodes
             - The Google Sign In codes documentation: https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInStatusCodes
             */
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    Log.info('[Google Sign In] Google Sign In cancelled');
                    ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.login.google.error.cancel')});
                } else {
                    Log.alert(`[Google Sign In] Error Code: ${error.code}. ${error.message}`, {}, false);
                    ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.login.google.error.unknown')});
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <PressableWithoutFeedback
            onPress={googleSignInRequest}
            style={styles.signInIconButton}
            role={CONST.ROLE.BUTTON}
            accessibilityLabel={translate('common.signInWithGoogle')}
        >
            <BaseGoogleButton isLoading={isLoading} />
        </PressableWithoutFeedback>
    );
}

GoogleSignInButton.displayName = 'GoogleSignInButton';

export default GoogleSignInButton;
