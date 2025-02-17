import type {NativeConfig} from 'react-native-config';
import Config from 'react-native-config';

// react-native-config doesn't trim whitespace on iOS for some reason so we
// add a trim() call to prevent headaches
const get = (config: NativeConfig, key: string, defaultValue: string): string => (config?.[key] ?? defaultValue).trim();

const firebaseAPIKey = get(Config, 'NEXT_PUBLIC_FIREBASE_API_KEY', 'AIzaSyBJ1Hcdu4G5H0N-rj7AF-N2SrJbvDxIqQo');
const firebaseAuthDomain = get(Config, 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'new-ieatta.firebaseapp.com');
const firebaseDatabaseUrl = get(Config, 'NEXT_PUBLIC_FIREBASE_DATABASE_URL', 'https://new-ieatta.firebaseio.com');
const firebaseProjectId = get(Config, 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'new-ieatta');
const firebaseStorageBucket = get(Config, 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'new-ieatta.appspot.com');
const firebaseMessagingSenderId = get(Config, 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', '229321919225');
const firebaseAppId = get(Config, 'NEXT_PUBLIC_FIREBASE_APP_ID', '1:229321919225:web:a33c8895c8e3cd6e9f3028');

const cloudinaryCloudName = get(Config, 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'di3fvexj8');
const cloudinaryCloudUploadPreset = get(Config, 'NEXT_PUBLIC_CLOUDINARY_CLOUD_UPLOAD_PRESET', 'ieatta');

export default {
    APP_GOOGLE_SIGN_IN: {
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
    FIREBASE_WEB_CONFIGURE: {
        // apiKey: get(Config, 'FB_API_KEY', 'AIzaSyDxzigVLZl4G8MP7jACQ0qpmADMzmrrON0'),
        // appId: get(Config, 'FB_APP_ID', '1:921154746561:web:7b8213357d07d6e4027c40'),
        // projectId: get(Config, 'FB_PROJECT_ID', 'expensify-chat'),
        apiKey: firebaseAPIKey,
        appId: firebaseAppId,
        projectId: firebaseProjectId,
        authDomain: firebaseAuthDomain,
    },
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
