/* eslint-disable @typescript-eslint/naming-convention */
import Log from '@libs/Log';
import CONFIG from '@src/CONFIG';
import CONST from '@src/CONST';

// How to fetch custom token
//   see: https://stackoverflow.com/questions/58110378/firebase-sign-in-with-a-token

/**
 * Needed to acquire a refresh_token
 * @param refresh_token string
 */
// function getIdToken_success(refreshToken: string) {
function fetchIdToken(refreshToken: string) {
    return fetch(`https://securetoken.googleapis.com/v1/token?key=${CONFIG.FIREBASE_API_KEY}`, {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
}

function fetchWoof() {
    return fetch(
        // `https://example.com/api/users`,
        'https://random.dog/woof.json',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded', // 'Content-Type': 'application/json'
            },
            body: `name=john`,
        },
    );
}

/**
 * Generates a custom token we can use to sign in given an id_token
 * @param id_token string
 */
function fetchCustomToken_error(idToken: string) {
    // return request.get({
    //     url: `https://us-central1-${firebase_config['projectId']}.cloudfunctions.net/create_custom_token?id_token=${id_token}`,
    //     json: true,
    // });

    // Firebase Cloud Function host
    // const host = `https://us-central1-${CONFIG.FIREBASE_PROJECT_ID}.cloudfunctions.net/create_custom_token`;

    // http://localhost:3000/api/token?id_token=123
    // const host = 'http://localhost:3000/api/token';

    const host = 'https://firebasetoken-ten.vercel.app/api/token';

    // return fetch(`${host}?id_token=${idToken}`, {
    //     method: 'GET',
    // });

    // return fetch('http://localhost:3000/api/token?id_token=123', {
    //     method: 'GET',
    // });

    const url = 'https://example.com/api/users';
    const body = {name: 'john'};

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
    });
}

/**
 * Generates a custom token we can use to sign in given an id_token
 * @param id_token string
 */
function fetchCustomToken(idToken: string) {
    // Firebase Cloud Function host
    //   url: `https://us-central1-${firebase_config['projectId']}.cloudfunctions.net/create_custom_token?id_token=${id_token}`,
    // const host = `https://us-central1-${CONFIG.FIREBASE_PROJECT_ID}.cloudfunctions.net/create_custom_token`;

    // http:// localhost:3000/api/token?id_token=123
    // const host = 'http://localhost:3000/api/token';

    // vercel next.js host
    const host = 'https://firebasetoken-ten.vercel.app/api/token';

    const url = `${host}?id_token=${idToken}`;

    Log.info('');
    Log.info('================================');
    Log.info(`url: ${url}`);
    Log.info('================================');
    Log.info('');

    return fetch(url, {
        method: 'GET',
        // mode: 'no-cors',
        // headers: {
        //     // Accept: 'application/json',
        //     // 'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Headers': '*',
        //     'Access-Control-Allow-Credentials': 'true',
        // },
    });
}

export {fetchIdToken, fetchCustomToken};
