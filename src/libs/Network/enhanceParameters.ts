import * as Environment from '@libs/Environment/Environment';
import getPlatform from '@libs/getPlatform';
import CONFIG from '@src/CONFIG';
import * as NetworkStore from './NetworkStore';

/**
 * Does this command require an authToken?
 */
function isAuthTokenRequired(command: string): boolean {
    return !['Log', 'Authenticate', 'BeginSignIn', 'SetPassword'].includes(command);
}

/**
 * Adds default values to our request data
 */
export default function enhanceParameters(command: string, parameters: Record<string, unknown>): Record<string, unknown> {
    const finalParameters = {...parameters};

    if (isAuthTokenRequired(command) && !parameters.authToken) {
        finalParameters.authToken = NetworkStore.getAuthToken();
    }

    finalParameters.referer = CONFIG.EXPENSIFY.EXPENSIFY_CASH_REFERER;

    // In addition to the referer (ecash), we pass the platform to help differentiate what device type
    // is sending the request.
    finalParameters.platform = getPlatform();

    // This application does not save its authToken in cookies like the classic Ieatta app.
    // Setting api_setCookie to false will ensure that the Ieatta API doesn't set any cookies
    // and prevents interfering with the cookie authToken that Ieatta classic uses.
    finalParameters.api_setCookie = false;

    // Include current user's email in every request and the server logs
    finalParameters.email = parameters.email ?? NetworkStore.getCurrentUserEmail();

    finalParameters.isFromDevEnv = Environment.isDevelopment();

    return finalParameters;
}
