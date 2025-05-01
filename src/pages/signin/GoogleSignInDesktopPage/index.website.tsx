import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useIsAuthenticated from '@hooks/useIsAuthenticated';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import {getDateStringForCreatedOrUpdatedDate} from '@libs/FirebaseIeatta/utils/timeago_helper';
import ThirdPartySignInPage from '@pages/signin/ThirdPartySignInPage';
import CONST from '@src/CONST';
import type {PersonalDetails} from '@src/types/onyx';

function GoogleSignInDesktopPage() {
    const isAuthenticated = useIsAuthenticated();
    const personalData: PersonalDetails = useCurrentUserPersonalDetails();

    const route = useRoute();

    // eslint-disable-next-line rulesdir/prefer-early-return
    useEffect(() => {
        if (isAuthenticated && personalData !== null) {
            // new FirebaseHelper().updateUserProperties({
            //     userId: personalData.userID ?? '',
            //     properties: {
            //         updatedAt: getDateStringForCreatedOrUpdatedDate(),
            //     },
            // });
        }
    }, [isAuthenticated, personalData, personalData.userID]);

    return <ThirdPartySignInPage signInProvider={CONST.SIGN_IN_METHOD.GOOGLE} />;
}

export default GoogleSignInDesktopPage;
