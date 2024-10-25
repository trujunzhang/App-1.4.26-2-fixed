import {Platform} from 'react-native';
import type {NativeConfig} from 'react-native-config';
import Config from 'react-native-config';
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

const firebaseAPIKey = get(Config, 'NEXT_PUBLIC_FIREBASE_API_KEY', 'AIzaSyBJ1Hcdu4G5H0N-rj7AF-N2SrJbvDxIqQo');
const firebaseAuthDomain = get(Config, 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'new-ieatta.firebaseapp.com');
const firebaseDatabaseUrl = get(Config, 'NEXT_PUBLIC_FIREBASE_DATABASE_URL', 'https://new-ieatta.firebaseio.com');
const firebaseProjectId = get(Config, 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'new-ieatta');
const firebaseStorageBucket = get(Config, 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'new-ieatta.appspot.com');
const firebaseMessagingSenderId = get(Config, 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', '229321919225');
const firebaseAppId = get(Config, 'NEXT_PUBLIC_FIREBASE_APP_ID', '1:229321919225:web:a33c8895c8e3cd6e9f3028');

const cloudinaryCloudName = get(Config, 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'di3fvexj8');
const cloudinaryCloudUploadPreset = get(Config, 'NEXT_PUBLIC_CLOUDINARY_CLOUD_UPLOAD_PRESET', 'ieatta');

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
    // GOOGLE_SIGN_IN: {
    //     WEB_CLIENT_ID: '921154746561-gpsoaqgqfuqrfsjdf8l7vohfkfj7b9up.apps.googleusercontent.com',
    //     IOS_CLIENT_ID: '921154746561-s3uqn2oe4m85tufi6mqflbfbuajrm2i3.apps.googleusercontent.com',
    // },
    GOOGLE_SIGN_IN: {
        // WEB_CLIENT_ID: '921154746561-gpsoaqgqfuqrfsjdf8l7vohfkfj7b9up.apps.googleusercontent.com',
        // IOS_CLIENT_ID: '921154746561-s3uqn2oe4m85tufi6mqflbfbuajrm2i3.apps.googleusercontent.com',
        // android client for com.ieatta.track.dev (manual created by trujunzhang)
        CLIENT_ID_ANDROID_DEBUG: '229321919225-6kog6st2nn7m384tem009fgg68fv4fr9.apps.googleusercontent.com',
        // android client for com.ieatta.track (manual created by trujunzhang)
        ANDROID_CLIENT_ID: '229321919225-5kuhq3vq7og1pakg52ata091b0uiu3tt.apps.googleusercontent.com',
        // iOS client for com.ieatta.track (auto created by Google Service)
        IOS_CLIENT_ID: '229321919225-bvhcakm216dta1p0tb1fb5m4cp8pqse5.apps.googleusercontent.com',
        // Web client (auto created by Google Service)
        WEB_CLIENT_ID: '229321919225-b8p6bdbjn11pokqmkj934dkkoniur67o.apps.googleusercontent.com',
    },
    GCP_GEOLOCATION_API_KEY: googleGeolocationAPIKey,
    FIREBASE_API_KEY: firebaseAPIKey,
    FIREBASE_AUTH_DOMAIN: firebaseAuthDomain,
    FIREBASE_DATA_BASE_URL: firebaseDatabaseUrl,
    FIREBASE_PROJECT_ID: firebaseProjectId,
    FIREBASE_STORAGE_BUCKET: firebaseStorageBucket,
    FIREBASE_MESSAGING_SENDER_ID: firebaseMessagingSenderId,
    FIREBASE_APP_ID: firebaseAppId,
    CLOUDINARY_CLOUD_NAME: cloudinaryCloudName,
    CLOUDINARY_CLOUD_UPLOAD_PRESET: cloudinaryCloudUploadPreset,
} as const;
