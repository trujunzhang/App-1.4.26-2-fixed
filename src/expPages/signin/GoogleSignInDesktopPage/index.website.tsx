import React from 'react';
import CONST from '@src/CONST';
import ThirdPartySignInPage from '@src/expPages/signin/ThirdPartySignInPage';

function GoogleSignInDesktopPage() {
    return <ThirdPartySignInPage signInProvider={CONST.SIGN_IN_METHOD.GOOGLE} />;
}

export default GoogleSignInDesktopPage;
