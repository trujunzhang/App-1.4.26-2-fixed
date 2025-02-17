import {GoogleOAuthProvider} from '@react-oauth/google';
import React from 'react';
import CONFIG from '@src/CONFIG';

type GoogleProviderProps = {
    children: React.ReactNode;
};

function GoogleProvider(props: GoogleProviderProps) {
    return <GoogleOAuthProvider clientId={CONFIG.APP_GOOGLE_SIGN_IN.WEB_CLIENT_ID}>{props.children}</GoogleOAuthProvider>;
}

GoogleProvider.displayName = 'GoogleProvider';

export default GoogleProvider;
