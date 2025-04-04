/* eslint-disable jsdoc/no-types */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import Onyx from 'react-native-onyx';
import type {OnyxEntry, OnyxUpdate} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import {generateLoggedUserId} from '@libs/FirebaseIeatta/utils/md5_utils';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBUser} from '@src/types/firebase';
import type {Locale, PersonalDetails, PersonalDetailsList, PrivatePersonalDetails} from '@src/types/onyx';

let currentUserTheme: ValueOf<typeof CONST.THEME> = CONST.THEME.DEFAULT;
Onyx.connect({
    key: ONYXKEYS.PREFERRED_THEME,
    callback: (val) => {
        currentUserTheme = val ?? CONST.THEME.DEFAULT;
    },
});

let currentUserLocale: Locale = CONST.LOCALES.DEFAULT;
Onyx.connect({
    key: ONYXKEYS.NVP_PREFERRED_LOCALE,
    callback: (val) => {
        currentUserLocale = val ?? CONST.LOCALES.DEFAULT;
    },
});

let currentUserEmail = '';
let currentUserAccountID: number | undefined;
Onyx.connect({
    key: ONYXKEYS.SESSION,
    callback: (val) => {
        currentUserEmail = val?.email ?? '';
        currentUserAccountID = val?.accountID;
    },
});

let allPersonalDetails: OnyxEntry<PersonalDetailsList>;
let loggedUserId: string | undefined;
Onyx.connect({
    key: ONYXKEYS.PERSONAL_DETAILS_LIST,
    callback: (val) => {
        allPersonalDetails = val;

        const personalDetails: PersonalDetailsList = allPersonalDetails ?? {};
        const personalData: PersonalDetails | null = personalDetails[currentUserAccountID ?? ''];

        if (_.isUndefined(personalData) || _.isNull(personalData)) {
            return;
        }

        loggedUserId = personalData.userID;
    },
});

/**
 * @param user
 * @param accountID
 * @returns {PersonalDetails}
 */
function buildPersonalDetails(user: IFBUser, accountID: number): PersonalDetails {
    const originalUrl = lodashGet(user, 'originalUrl', '');
    return {
        accountID,
        userID: user.id,
        login: user.email,
        avatar: originalUrl,
        avatarThumbnail: originalUrl,
        // originalUrl,
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
    const userId = user.id;
    if (userId === loggedUserId) {
        const accountID = currentUserAccountID ?? generateLoggedUserId();
        Onyx.merge(ONYXKEYS.PERSONAL_DETAILS_LIST, {[accountID]: buildPersonalDetails(user, accountID)});

        // update the logged user's theme
        if (currentUserTheme !== user.preferredTheme) {
            Onyx.set(ONYXKEYS.PREFERRED_THEME, user.preferredTheme ?? CONST.THEME.DEFAULT);
        }

        // update the logged user's locale
        if (currentUserLocale !== user.preferredLocale) {
            Onyx.set(ONYXKEYS.NVP_PREFERRED_LOCALE, user.preferredLocale ?? CONST.LOCALES.DEFAULT);
        }
    }
    const accountID = generateLoggedUserId();
    Onyx.merge(ONYXKEYS.PERSONAL_DETAILS_LIST, {[userId]: buildPersonalDetails(user, accountID)});
}

function updateFBUserTheme(theme: ValueOf<typeof CONST.THEME>) {
    Onyx.set(ONYXKEYS.PREFERRED_THEME, theme);
}

export {
    // eslint-disable-next-line import/prefer-default-export
    saveSession,
    setIsLoading,
    setLoginError,
    upsetPersonalDetail,
    // updateFBUserTheme,
};
