/* eslint-disable rulesdir/prefer-early-return */
// import {useGoogleLogin, useGoogleOneTapLogin} from '@react-oauth/google';
import type {OAuthCredential} from 'firebase/auth';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {transform} from 'lodash';
import React, {useCallback} from 'react';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import FirebaseLogin from '@libs/Firebase/services/firebase-login';
import * as ShowNotify from '@libs/ieatta/Notify';
import Log from '@libs/Log';
import {setIsLoading} from '@userActions/Firebase/UserFB';
import CONST from '@src/CONST';
// eslint-disable-next-line import/extensions
import BaseGoogleButton from './BaseGoogleButton';
import type {GoogleSignInButtonProps} from './types';

/**
 * Google Sign In button for Web.
 * @returns
 */
function GoogleSignInButton({isLoading = false}: GoogleSignInButtonProps) {
    const {isSmallScreenWidth} = useWindowDimensions();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const toastId = React.useRef<number | string | null>(null);

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

    /**
     * Sign in with google
     * */
    const login = () => {
        setIsLoading(true);
        toastId.current = ShowNotify.initialAndShowNotify({isSmallScreenWidth, message: translate('notify.login.google.start'), autoClose: false});

        signInWithPopup(getAuth(), new GoogleAuthProvider())
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                return new FirebaseLogin().saveUser(user);
            })
            .then(() => {
                Log.info('[Google Sign In] <web> Google Sign In success');
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
                if (error.code === 'auth/popup-closed-by-user') {
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

export default GoogleSignInButton;
