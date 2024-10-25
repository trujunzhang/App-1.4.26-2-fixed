import React from 'react';
import CONST from '@src/CONST';
import ThirdPartySignInPage from '@src/expPages/signin/ThirdPartySignInPage';

function AppleSignInDesktopPage() {
    return <ThirdPartySignInPage signInProvider={CONST.SIGN_IN_METHOD.APPLE} />;
}

export default AppleSignInDesktopPage;
