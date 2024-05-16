import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';
import React from 'react';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import withLocalize, {withLocalizePropTypes} from '@components/withLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import FirebaseLogin from '@libs/Firebase/services/firebase-login';
import Log from '@libs/Log';
import {setIsLoading} from '@userActions/Firebase/UserFB';
import CONFIG from '@src/CONFIG';
import CONST from '@src/CONST';
// eslint-disable-next-line import/extensions
import BaseGoogleButton from './BaseGoogleButton';

const propTypes = {
    /** Whether we're rendering in the Desktop Flow, if so show a different button. */
    isDesktopFlow: PropTypes.bool,

    /** Controls the loading state of the form */
    isLoading: PropTypes.bool,

    ...withLocalizePropTypes,
};

const defaultProps = {
    isDesktopFlow: false,
    isLoading: false,
};

/**
 * Google Sign In method for iOS and android that returns identityToken.
 */
function googleSignInRequest() {
    GoogleSignin.configure({
        webClientId: CONFIG.GOOGLE_SIGN_IN.WEB_CLIENT_ID,
        iosClientId: CONFIG.GOOGLE_SIGN_IN.IOS_CLIENT_ID,
        offlineAccess: false,
    });

    // The package on android can sign in without prompting
    // the user which is not what we want. So we sign out
    // before signing in to ensure the user is prompted.
    GoogleSignin.signOut();

    setIsLoading(true);
    GoogleSignin.signIn()
        .then((response) => response.idToken)
        .then((id_token) => {
            Log.info(`[Google Signin] <token: '${id_token}'>`);

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(id_token);

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
        })
        .catch((error) => {
            // Handle unexpected error shape
            if (error === undefined || error.code === undefined) {
                Log.alert(`[Google Sign In] Google sign in failed: ${error}`);
            }
            /** The logged code is useful for debugging any new errors that are not specifically handled. To decode, see:
             - The common status codes documentation: https://developers.google.com/android/reference/com/google/android/gms/common/api/CommonStatusCodes
             - The Google Sign In codes documentation: https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInStatusCodes
             */
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Log.info('[Google Sign In] Google Sign In cancelled');
            } else {
                Log.alert(`[Google Sign In] Error Code: ${error.code}. ${error.message}`, {}, false);
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
}

/**
 * Google Sign In button for mobile.
 * We have to load the gis script and then determine if the page is focused before rendering the button.
 * @returns {React.JSX.Element}
 */
function GoogleSignInButton({translate, isDesktopFlow, isLoading}) {
    const styles = useThemeStyles();

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
GoogleSignInButton.propTypes = propTypes;
GoogleSignInButton.defaultProps = defaultProps;

// @ts-ignore
export default withLocalize(GoogleSignInButton);
