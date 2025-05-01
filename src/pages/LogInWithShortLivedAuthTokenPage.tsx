/* eslint-disable @typescript-eslint/naming-convention */
import SessionExpiredPage from '@expPages/ErrorPage/SessionExpiredPage';
import {getAuth, signInWithCustomToken} from 'firebase/auth';
import type {OAuthCredential, UserCredential} from 'firebase/auth';
import React, {useEffect} from 'react';
import {useOnyx} from 'react-native-onyx';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import {fetchCustomToken, fetchIdToken} from '@libs/actions/ieatta/betweenLogin/fetchUtils';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import * as ShowNotify from '@libs/ieatta/Notify';
import Log from '@libs/Log';
import Navigation from '@libs/Navigation/Navigation';
import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {PublicScreensParamList} from '@libs/Navigation/types';
import {saveSession, setIsLoading} from '@userActions/Firebase/UserFB';
import {setAccountError, signInWithShortLivedAuthToken, signInWithSupportAuthToken} from '@userActions/Session';
import CONFIG from '@src/CONFIG';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {Route} from '@src/ROUTES';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';
import type {IeattaModelsWithUser, IFBUser} from '@src/types/firebase';

const tokenEndpoint = 'https://oauth2.googleapis.com/token';
const clientId = CONFIG.APP_GOOGLE_SIGN_IN.WEB_CLIENT_ID;
const clientSecretId = CONFIG.APP_GOOGLE_SIGN_IN.WEB_SECRET_ID;

type LogInWithShortLivedAuthTokenPageProps = PlatformStackScreenProps<PublicScreensParamList, typeof SCREENS.TRANSITION_BETWEEN_APPS>;

function LogInWithShortLivedAuthTokenPage({route}: LogInWithShortLivedAuthTokenPageProps) {
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    const {isSmallScreenWidth} = useResponsiveLayout();
    const {translate} = useLocalize();

    const {accountID = '', shortLivedAuthToken: refreshToken = '', authTokenType, exitTo, error: routeError} = route?.params ?? {};
    const [account] = useOnyx(ONYXKEYS.ACCOUNT);

    const toastId = React.useRef<number | string | null>(null);

    useEffect(() => {
        toastId.current = ShowNotify.initialAndShowNotify({isSmallScreenWidth, message: translate('notify.login.google.start'), autoClose: false});

        if (refreshToken === '') {
            ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.login.google.error.token')});
            return;
        }

        const loggedUser: IFBUser | null = null;

        fetchIdToken(refreshToken)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then((json: {id_token: string}) => {
                const {id_token} = json;
                return fetchCustomToken(id_token);
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then((json: {custom_token: string}) => {
                const {custom_token} = json;
                return signInWithCustomToken(getAuth(), custom_token);
            })
            .then((userCredential: UserCredential | null) => {
                if (userCredential !== undefined && userCredential !== null) {
                    return new FirebaseHelper().getData({path: FBCollections.Profiles, id: `${accountID}`});
                }
                return Promise.resolve(null);
            })
            // eslint-disable-next-line rulesdir/prefer-early-return
            .then((user: IeattaModelsWithUser | null) => {
                if (user !== null && user !== undefined) {
                    saveSession({user: user as IFBUser});
                    ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, message: translate('notify.login.google.success')});
                }
            })
            .catch((error) => {
                // throw error;
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.login.google.error.unknown')});
            })
            .finally(() => {
                setIsLoading(false);
                Navigation.goBack();
                Navigation.navigate(ROUTES.HOME);
            });
    }, [accountID, isSmallScreenWidth, refreshToken, route, translate]);

    if (account?.isLoading) {
        return <FullScreenLoadingIndicator />;
    }

    return <SessionExpiredPage />;
}

LogInWithShortLivedAuthTokenPage.displayName = 'LogInWithShortLivedAuthTokenPage';

export default LogInWithShortLivedAuthTokenPage;
