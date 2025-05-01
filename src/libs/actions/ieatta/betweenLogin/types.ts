type OpenRouteInDesktopApp = (shortLivedAuthToken?: string, email?: string, initialRoute?: string) => void;

type BeginDeepLinkRedirect = (shouldAuthenticateWithCurrentAccount?: boolean, initialRoute?: string) => void;

export type {OpenRouteInDesktopApp, BeginDeepLinkRedirect};
