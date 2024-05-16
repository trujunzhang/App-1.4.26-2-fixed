import {useGoogleLogin, useGoogleOneTapLogin} from '@react-oauth/google';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import {GestureResponderEvent, PressableProps as RNPressableProps, View} from 'react-native';
import Icon from '@components/Icon';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import withLocalize, {withLocalizePropTypes} from '@components/withLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import FirebaseLogin from '@libs/Firebase/services/firebase-login';
import Log from '@libs/Log';
import {setIsLoading} from '@userActions/Firebase/UserFB';
import * as Session from '@userActions/Session';
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
 * Google Sign In button for Web.
 * @returns {React.Component}
 */
function GoogleSignInButton({translate, isDesktopFlow, isLoading}) {
    const styles = useThemeStyles();

    /**
     * Sign in with google one tap
     * Because it can not get google's access token, only response google's credential.
     */
    // useGoogleOneTapLogin({
    //     onSuccess: (credentialResponse) => {
    //         // const decoded = jwtDecode(credentialResponse.credential || "");
    //         // const credentialUser = {
    //         //     uid: decoded.sub,
    //         //     displayName: decoded.name,
    //         //     email: decoded.email,
    //         //     photoURL: decoded.picture
    //         // }
    //         // new FirebaseLogin().saveUser(credentialUser).then(() => {
    //         //     const x = 0
    //         // })
    //         test(credentialResponse)
    //     },
    //     onError: () => {
    //         console.log('Login Failed');
    //     },
    //     // flow: 'auth-code',
    //     flow: 'implicit',
    // });

    /**
     * Sign in with google tapping the button
     * @type {(overrideConfig?: OverridableTokenClientConfig) => void}
     */
    // const login = useGoogleLogin({
    //     onSuccess: (tokenResponse) => {
    //         // https://firebase.google.com/docs/auth/web/google-signin
    //         const {access_token} = tokenResponse;
    //
    //         test(tokenResponse)
    //
    //         console.log(tokenResponse);
    //     },
    // });

    const login = () => {
        setIsLoading(true);
        signInWithPopup(getAuth(), new GoogleAuthProvider())
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                return new FirebaseLogin().saveUser(user);
            })
            .then(() => {
                Log.info('[Google Sign In] <web> Google Sign In success');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <PressableWithoutFeedback
            onPress={login}
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

export default withLocalize(GoogleSignInButton);
