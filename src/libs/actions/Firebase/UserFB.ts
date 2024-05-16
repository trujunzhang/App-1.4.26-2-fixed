import {isBefore} from 'date-fns';
import lodashGet from 'lodash/get';
import {number} from 'prop-types';
import Onyx from 'react-native-onyx';
// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import * as API from '@libs/API';
import * as ErrorUtils from '@libs/ErrorUtils';
import {generateLoggedUserId} from '@libs/Firebase/utils/md5_utils';
import Log from '@libs/Log';
import Navigation from '@libs/Navigation/Navigation';
import * as SequentialQueue from '@libs/Network/SequentialQueue';
import * as Pusher from '@libs/Pusher/pusher';
import PusherUtils from '@libs/PusherUtils';
import * as ReportActionsUtils from '@libs/ReportActionsUtils';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {IFBUser} from '@src/types/firebase';
import type PersonalDetails from '@src/types/onyx/PersonalDetails';

let currentUserAccountID = '';
let currentEmail = '';
Onyx.connect({
    key: ONYXKEYS.SESSION,
    callback: (val) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentUserAccountID = lodashGet(val, 'accountID', -1);
        currentEmail = lodashGet(val, 'email', '');
    },
});

let myPersonalDetails = {};
Onyx.connect({
    key: ONYXKEYS.PERSONAL_DETAILS_LIST,
    callback: (val) => {
        if (!val || !currentUserAccountID) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        myPersonalDetails = val[currentUserAccountID];
    },
});

/**
 * @param user
 * @param accountID
 * @returns {PersonalDetails}
 */
function buildPersonalDetails(user: IFBUser, accountID: number): PersonalDetails {
    return {
        accountID,
        userID: user.id,
        login: user.email,
        avatar: user.originalUrl ?? '',
        avatarThumbnail: user.originalUrl,
        originalUrl: user.originalUrl,
        displayName: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        pronouns: '',
        timezone: CONST.DEFAULT_TIME_ZONE,
        phoneNumber: '',
    };
}

function saveSession(user: IFBUser) {
    const accountID = generateLoggedUserId();
    const optimisticData = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.CREDENTIALS,
            value: {
                login: user.email,
            },
        },
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.ACCOUNT,
            value: {
                validated: true,
            },
        },
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.SESSION,
            value: {
                accountID,
                userID: user.id,
                email: user.email,
                authToken: 'logged',
            },
        },
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.PERSONAL_DETAILS_LIST,
            value: {
                [accountID]: buildPersonalDetails(user, accountID),
            },
        },
    ];

    // Log.info("")
    // Log.info("================================")
    // Log.info(`saveSession: ${JSON.stringify(optimisticData)}`)
    // Log.info("================================")
    // Log.info("")

    Onyx.update(optimisticData);
}

function setIsLoading(isLoading: boolean) {
    Onyx.merge(ONYXKEYS.ACCOUNT, {isLoading});
}

function setLoginError(errorMessage: string) {
    Onyx.merge(ONYXKEYS.ACCOUNT, {errors: {error: errorMessage}});
}

function upsetPersonalDetail(user: IFBUser) {
    const accountID = generateLoggedUserId();
    Onyx.merge(ONYXKEYS.PERSONAL_DETAILS_LIST, {[user.id]: buildPersonalDetails(user, accountID)});
}

export {
    // eslint-disable-next-line import/prefer-default-export
    saveSession,
    setIsLoading,
    setLoginError,
    upsetPersonalDetail,
};
