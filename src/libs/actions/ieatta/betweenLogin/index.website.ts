/* eslint-disable @typescript-eslint/naming-convention */
import {getAuth, getIdToken} from 'firebase/auth';
import type {Auth, User} from 'firebase/auth';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import Onyx from 'react-native-onyx';
import type {GetMissingOnyxMessagesParams, HandleRestrictedEventParams, OpenAppParams, OpenOldDotLinkParams, ReconnectAppParams, UpdatePreferredLocaleParams} from '@libs/API/parameters';
import * as Browser from '@libs/Browser';
import Log from '@libs/Log';
import {isAnonymousUser} from '@userActions/Session';
import CONFIG from '@src/CONFIG';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {OnyxKey} from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {Locale, PersonalDetails, PersonalDetailsList, PrivatePersonalDetails} from '@src/types/onyx';
import {fetchCustomToken, fetchIdToken} from './fetchUtils';
import type {BeginDeepLinkRedirect, OpenRouteInDesktopApp} from './types';

let currentUserAccountID: number | undefined;
let currentUserEmail: string;
let currentRefreshToken: string;
Onyx.connect({
    key: ONYXKEYS.SESSION,
    callback: (val) => {
        currentUserAccountID = val?.accountID;
        currentUserEmail = val?.email ?? '';
        currentRefreshToken = val?.authToken ?? '';
    },
});

let loggedUserId: string | undefined;
Onyx.connect({
    key: ONYXKEYS.PERSONAL_DETAILS_LIST,
    callback: (val) => {
        const allPersonalDetails = val;

        const personalDetails: PersonalDetailsList = allPersonalDetails ?? {};
        const personalData: PersonalDetails | null = personalDetails[currentUserAccountID ?? ''];

        if (_.isUndefined(personalData) || _.isNull(personalData)) {
            return;
        }

        loggedUserId = personalData.userID;
    },
});

/**
 * The session information needs to be passed to the Desktop app, and the only way to do that is by using query params. There is no other way to transfer the data.
 */
const openMyRouteInDesktopApp: OpenRouteInDesktopApp = (shortLivedAuthToken = '', email = '', initialRoute = '') => {
    const params = new URLSearchParams();
    // If the user is opening the desktop app through a third party signin flow, we need to manually add the exitTo param
    // so that the desktop app redirects to the correct home route after signin is complete.
    const openingFromDesktopRedirect = window.location.pathname === `/${ROUTES.DESKTOP_SIGN_IN_REDIRECT}`;
    params.set('exitTo', `${openingFromDesktopRedirect ? '/r' : initialRoute || window.location.pathname}${window.location.search}${window.location.hash}`);
    if (email && shortLivedAuthToken) {
        params.set('email', email);
        params.set('shortLivedAuthToken', shortLivedAuthToken);
    }
    // accountID?: number;
    params.set('accountID', loggedUserId ?? '');

    const expensifyUrl = new URL(CONFIG.IEATTA.NEW_IEATTA_URL);
    const expensifyDeeplinkUrl = `${CONST.DEEPLINK_BASE_URL}${expensifyUrl.host}/transition?${params.toString()}`;

    const browser = Browser.getBrowser();

    // This check is necessary for Safari, otherwise, if the user
    // does NOT have the Expensify desktop app installed, it's gonna
    // show an error in the page saying that the address is invalid.
    // It is also necessary for Firefox, otherwise the window.location.href redirect
    // will abort the fetch request from NetInfo, which will cause the app to go offline temporarily.
    if (browser === CONST.BROWSER.SAFARI || browser === CONST.BROWSER.FIREFOX) {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        if (iframe.contentWindow) {
            iframe.contentWindow.location.href = expensifyDeeplinkUrl;
        }
        // Since we're creating an iframe for Safari to handle deeplink,
        // we need to give Safari some time to open the pop-up window.
        // After that we can just remove the iframe.
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 0);
    } else {
        // isOpenRouteInDesktop = true;
        window.location.href = expensifyDeeplinkUrl;
    }
};

/**
 * @param shouldAuthenticateWithCurrentAccount Optional, indicates whether default authentication method (shortLivedAuthToken) should be used
 */
const beginMyDeepLinkRedirect: BeginDeepLinkRedirect = (shouldAuthenticateWithCurrentAccount = true, initialRoute?: string) => {
    // There's no support for anonymous users on desktop
    if (isAnonymousUser()) {
        return;
    }

    // If the route that is being handled is a magic link, email and shortLivedAuthToken should not be attached to the url
    // to prevent signing into the wrong account
    if (!currentUserAccountID || !shouldAuthenticateWithCurrentAccount) {
        Browser.openRouteInDesktopApp();
        return;
    }

    const parameters: OpenOldDotLinkParams = {shouldRetry: false};

    openMyRouteInDesktopApp(currentRefreshToken, currentUserEmail, initialRoute);
};

export {openMyRouteInDesktopApp, beginMyDeepLinkRedirect};
