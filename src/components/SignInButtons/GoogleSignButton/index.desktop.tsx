/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable rulesdir/prefer-early-return */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {getAuth, signInWithCustomToken} from 'firebase/auth';
import type {OAuthCredential, UserCredential} from 'firebase/auth';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
// import {google} from 'googleapis';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import IconButton from '@components/SignInButtons/IconButton';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {ParseModelUsers} from '@libs/FirebaseIeatta/appModel';
import {db} from '@libs/FirebaseIeatta/config/firebase';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import FirestoreParams from '@libs/FirebaseIeatta/services/firestore_params';
import {documentIdFromCurrentDate} from '@libs/FirebaseIeatta/utils/md5_utils';
import * as ShowNotify from '@libs/ieatta/Notify';
import {saveSession, setIsLoading} from '@userActions/Firebase/UserFB';
import CONFIG from '@src/CONFIG';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import type {IFBUser} from '@src/types/firebase';
import BaseGoogleButton from './BaseGoogleButton';
import type {GoogleSignInButtonProps} from './types';

const googleSignInWebRouteForDesktopFlow = `${CONFIG.IEATTA.NEW_IEATTA_URL}${ROUTES.GOOGLE_SIGN_IN}`;

// const tokenEndpoint = 'https://oauth2.googleapis.com/token';
// const clientId = CONFIG.APP_GOOGLE_SIGN_IN.WEB_CLIENT_ID;
// const clientSecretId = CONFIG.APP_GOOGLE_SIGN_IN.WEB_SECRET_ID;

/**
 * Google Sign In button for desktop flow.
 */
function GoogleSignInButton() {
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    const {isSmallScreenWidth} = useResponsiveLayout();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    // const [loggedUser, setLoggedUser] = useState<IFBUser | null>(null);

    // const [accessToken, setAccessToken] = useState<string>('');

    // const toastId = React.useRef<number | string | null>(null);

    // useEffect(() => {
    //     if (loggedUser !== undefined && loggedUser !== null) {
    //         setIsLoading(true);
    //         toastId.current = ShowNotify.initialAndShowNotify({isSmallScreenWidth, message: translate('notify.login.google.start'), autoClose: false});
    //
    //         const requestBody = new URLSearchParams({
    //             grant_type: 'refresh_token',
    //             refresh_token: loggedUser.refreshToken ?? '',
    //             client_id: clientId,
    //             client_secret: clientSecretId,
    //         });
    //
    //         fetch(tokenEndpoint, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             body: requestBody.toString(),
    //         })
    //             .then((response) => response.json())
    //             .then(({access_token}: {access_token: string | undefined | null}) => {
    //                 setAccessToken(access_token ?? 'not found');
    //                 if (access_token !== undefined && access_token !== null && access_token !== '') {
    //                     return signInWithCustomToken(getAuth(), access_token);
    //                 }
    //                 ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.login.google.error.token')});
    //                 return Promise.resolve(null);
    //             })
    //             .then((userCredential: UserCredential | null) => {
    //                 if (userCredential !== undefined && userCredential !== null) {
    //                     saveSession(loggedUser);
    //                     ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, message: translate('notify.login.google.success')});
    //                 }
    //                 return Promise.resolve(null);
    //             })
    //             .catch((error) => {
    //                 throw error;
    //                 ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.login.google.error.unknown')});
    //             })
    //             .finally(() => {
    //                 setIsLoading(false);
    //             });
    //     }
    // }, [isSmallScreenWidth, translate, loggedUser]);

    // const renderDebugAccessToken = () => {
    //     return (
    //         <View>
    //             <Text>Access Token:</Text>
    //             <Text>{accessToken}</Text>
    //         </View>
    //     );
    // };

    return (
        <PressableWithoutFeedback
            onPress={() => {
                window.open(`${googleSignInWebRouteForDesktopFlow}`);
            }}
            style={styles.signInIconButton}
            role={CONST.ROLE.BUTTON}
            accessibilityLabel={translate('common.signInWithGoogle')}
        >
            <BaseGoogleButton isLoading={false} />
        </PressableWithoutFeedback>
    );
}

GoogleSignInButton.displayName = 'GoogleSignInButton';

export default GoogleSignInButton;
