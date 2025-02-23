import ThirdPartySignInPage from '@expPages/signin/ThirdPartySignInPage';
import React from 'react';
import CONST from '@src/CONST';

function GoogleSignInDesktopPage() {
    return <ThirdPartySignInPage signInProvider={CONST.SIGN_IN_METHOD.GOOGLE} />;
}

export default GoogleSignInDesktopPage;
