import type {BeginDeepLinkRedirect, OpenRouteInDesktopApp} from './types';

const openMyRouteInDesktopApp: OpenRouteInDesktopApp = (shortLivedAuthToken = '', email = '', initialRoute = '') => {};

const beginMyDeepLinkRedirect: BeginDeepLinkRedirect = (shouldAuthenticateWithCurrentAccount = true, initialRoute?: string) => {};

export {openMyRouteInDesktopApp, beginMyDeepLinkRedirect};
