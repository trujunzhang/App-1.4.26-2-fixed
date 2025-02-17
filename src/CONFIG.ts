import {Platform} from 'react-native';
import type {NativeConfig} from 'react-native-config';
import Config from 'react-native-config';
import appConfig from './appConfig/appConfig';
import CONST from './CONST';
import getPlatform from './libs/getPlatform';
import * as Url from './libs/Url';

// react-native-config doesn't trim whitespace on iOS for some reason so we
// add a trim() call to prevent headaches
const get = (config: NativeConfig, key: string, defaultValue: string): string => (config?.[key] ?? defaultValue).trim();

// Set default values to contributor friendly values to make development work out of the box without an .env file
const ENVIRONMENT = get(Config, 'ENVIRONMENT', CONST.ENVIRONMENT.DEV);
const newIeattaURL = Url.addTrailingForwardSlash(get(Config, 'NEW_EXPENSIFY_URL', 'https://new.ieatta.com/'));
const ieattaURL = Url.addTrailingForwardSlash(get(Config, 'EXPENSIFY_URL', 'https://www.ieatta.com/'));
const stagingIeattaURL = Url.addTrailingForwardSlash(get(Config, 'STAGING_EXPENSIFY_URL', 'https://staging.ieatta.com/'));
const stagingSecureIeattaUrl = Url.addTrailingForwardSlash(get(Config, 'STAGING_SECURE_EXPENSIFY_URL', 'https://staging-secure.ieatta.com/'));
const ngrokURL = Url.addTrailingForwardSlash(get(Config, 'NGROK_URL', ''));
const secureNgrokURL = Url.addTrailingForwardSlash(get(Config, 'SECURE_NGROK_URL', ''));
const secureIeattaUrl = Url.addTrailingForwardSlash(get(Config, 'SECURE_EXPENSIFY_URL', 'https://secure.ieatta.com/'));
const useNgrok = get(Config, 'USE_NGROK', 'false') === 'true';
const useWebProxy = get(Config, 'USE_WEB_PROXY', 'true') === 'true';
const ieattaComWithProxy = getPlatform() === 'web' && useWebProxy ? '/' : ieattaURL;
const googleGeolocationAPIKey = get(Config, 'GCP_GEOLOCATION_API_KEY', '');

// Throw errors on dev if config variables are not set correctly
if (ENVIRONMENT === CONST.ENVIRONMENT.DEV) {
    if (!useNgrok && ieattaURL.includes('dev') && !secureIeattaUrl.includes('dev')) {
        throw new Error('SECURE_EXPENSIFY_URL must end with .dev when EXPENSIFY_URL ends with .dev');
    }

    if (useNgrok && !secureNgrokURL) {
        throw new Error('SECURE_NGROK_URL must be defined in .env when USE_NGROK=true');
    }
}

const secureURLRoot = useNgrok && secureNgrokURL ? secureNgrokURL : secureIeattaUrl;

// Ngrok helps us avoid many of our cross-domain issues with connecting to our API
// and is required for viewing images on mobile and for developing on android
// To enable, set the USE_NGROK value to true in .env and update the NGROK_URL
const ieattaURLRoot = useNgrok && ngrokURL ? ngrokURL : ieattaComWithProxy;

export default {
    APP_NAME: 'NewIeatta',
    AUTH_TOKEN_EXPIRATION_TIME: 1000 * 60 * 90,
    ENVIRONMENT,
    // App configure
    ...appConfig,
    EXPENSIFY: {
        // Note: This will be EXACTLY what is set for EXPENSIFY_URL whether the proxy is enabled or not.
        EXPENSIFY_URL: ieattaURL,
        SECURE_EXPENSIFY_URL: secureIeattaUrl,
        NEW_EXPENSIFY_URL: newIeattaURL,

        // The DEFAULT API is the API used by most environments, except staging, where we use STAGING (defined below)
        // The "staging toggle" in settings toggles between DEFAULT and STAGING APIs
        // On both STAGING and PROD this (DEFAULT) address points to production
        // On DEV it can be configured through ENV settings and can be a proxy or ngrok address (defaults to PROD)
        // Usually you don't need to use this URL directly - prefer `ApiUtils.getApiRoot()`
        DEFAULT_API_ROOT: ieattaURLRoot,
        DEFAULT_SECURE_API_ROOT: secureURLRoot,
        STAGING_API_ROOT: stagingIeattaURL,
        STAGING_SECURE_API_ROOT: stagingSecureIeattaUrl,
        PARTNER_NAME: get(Config, 'EXPENSIFY_PARTNER_NAME', 'chat-ieatta-com'),
        PARTNER_PASSWORD: get(Config, 'EXPENSIFY_PARTNER_PASSWORD', 'e21965746fd75f82bb66'),
        EXPENSIFY_CASH_REFERER: 'ecash',
        CONCIERGE_URL_PATHNAME: 'concierge/',
        DEVPORTAL_URL_PATHNAME: '_devportal/',
        CONCIERGE_URL: `${ieattaURL}concierge/`,
        SAML_URL: `${ieattaURL}authentication/saml/login`,
    },
    IS_IN_PRODUCTION: Platform.OS === 'web' ? process.env.NODE_ENV === 'production' : !__DEV__,
    IS_IN_STAGING: ENVIRONMENT === CONST.ENVIRONMENT.STAGING,
    IS_USING_LOCAL_WEB: useNgrok || ieattaURLRoot.includes('dev'),
    PUSHER: {
        APP_KEY: get(Config, 'PUSHER_APP_KEY', '268df511a204fbb60884'),
        SUFFIX: ENVIRONMENT === CONST.ENVIRONMENT.DEV ? get(Config, 'PUSHER_DEV_SUFFIX', '') : '',
        CLUSTER: 'mt1',
    },
    SITE_TITLE: 'New Ieatta',
    FAVICON: {
        DEFAULT: '/favicon.png',
        UNREAD: '/favicon-unread.png',
    },
    CAPTURE_METRICS: get(Config, 'CAPTURE_METRICS', 'false') === 'true',
    ONYX_METRICS: get(Config, 'ONYX_METRICS', 'false') === 'true',
    DEV_PORT: process.env.PORT ?? 8082,
    E2E_TESTING: get(Config, 'E2E_TESTING', 'false') === 'true',
    SEND_CRASH_REPORTS: get(Config, 'SEND_CRASH_REPORTS', 'false') === 'true',
    IS_USING_WEB_PROXY: getPlatform() === 'web' && useWebProxy,
    APPLE_SIGN_IN: {
        SERVICE_ID: 'com.chat.ieatta.chat.AppleSignIn',
        REDIRECT_URI: `${newIeattaURL}appleauth`,
    },
    GCP_GEOLOCATION_API_KEY: googleGeolocationAPIKey,
    // to read more about StrictMode see: contributingGuides/STRICT_MODE.md
    USE_REACT_STRICT_MODE_IN_DEV: false,
    GOOGLE_SIGN_IN: {
        WEB_CLIENT_ID: '921154746561-gpsoaqgqfuqrfsjdf8l7vohfkfj7b9up.apps.googleusercontent.com',
        IOS_CLIENT_ID: '921154746561-s3uqn2oe4m85tufi6mqflbfbuajrm2i3.apps.googleusercontent.com',
    },
    FIREBASE_WEB_CONFIG: {
        apiKey: get(Config, 'FB_API_KEY', 'AIzaSyDxzigVLZl4G8MP7jACQ0qpmADMzmrrON0'),
        appId: get(Config, 'FB_APP_ID', '1:921154746561:web:7b8213357d07d6e4027c40'),
        projectId: get(Config, 'FB_PROJECT_ID', 'expensify-chat'),
    },
} as const;
