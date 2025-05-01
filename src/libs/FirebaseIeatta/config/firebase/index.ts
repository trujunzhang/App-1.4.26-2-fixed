// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp} from 'firebase/app';
import type {Auth, User} from 'firebase/auth';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getFunctions} from 'firebase/functions';
import {firebaseApp} from '@libs/Firebase/firebaseWebConfig';
import Config from '@src/CONFIG';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: Config.FIREBASE_API_KEY,
//     authDomain: Config.FIREBASE_AUTH_DOMAIN,
//     projectId: Config.FIREBASE_PROJECT_ID,
//     storageBucket: Config.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
//     appId: Config.FIREBASE_APP_ID,
// };

// Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const app = firebaseApp;
const db = getFirestore(app);
const auth: Auth = getAuth(app);
const functions = getFunctions(app);

/**
 |--------------------------------------------------
 | emulators
 |--------------------------------------------------
 */
if (process.env.NODE_ENV !== 'production') {
    // connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    // connectFirestoreEmulator(db, "localhost", 8082);
    // connectFunctionsEmulator(functions, "localhost", 5001);
}

export {app, db, auth, functions};
