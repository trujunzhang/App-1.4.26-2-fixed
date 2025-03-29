// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import type {OnyxEntry, OnyxUpdate} from 'react-native-onyx';
import Onyx from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import type {FormOnyxValues} from '@components/Form/types';
import * as API from '@libs/API';
import type {
    OpenPublicProfilePageParams,
    SetPersonalDetailsAndShipExpensifyCardsParams,
    UpdateAutomaticTimezoneParams,
    UpdateDateOfBirthParams,
    UpdateDisplayNameParams,
    UpdateHomeAddressParams,
    UpdateLegalNameParams,
    UpdatePhoneNumberParams,
    UpdatePronounsParams,
    UpdateSelectedTimezoneParams,
    UpdateUserAvatarParams,
} from '@libs/API/parameters';
import {READ_COMMANDS, WRITE_COMMANDS} from '@libs/API/types';
import type {CustomRNImageManipulatorResult} from '@libs/cropOrRotateImage/types';
import DateUtils from '@libs/DateUtils';
import * as ErrorUtils from '@libs/ErrorUtils';
import {getAuthUserFromPersonalDetails} from '@libs/FirebaseIeatta/models/auth_user_model';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import type {UserProperties} from '@libs/FirebaseIeatta/services/firebase-helper/types';
import FirebasePhoto from '@libs/FirebaseIeatta/services/firebase-photo';
import {documentIdFromCurrentDate} from '@libs/FirebaseIeatta/utils/md5_utils';
import * as LoginUtils from '@libs/LoginUtils';
import Navigation from '@libs/Navigation/Navigation';
import * as PersonalDetailsUtils from '@libs/PersonalDetailsUtils';
import * as UserUtils from '@libs/UserUtils';
import type {Country} from '@src/CONST';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {DateOfBirthForm} from '@src/types/form';
import type {Locale, PersonalDetails, PersonalDetailsList, PrivatePersonalDetails} from '@src/types/onyx';
import type {SelectedTimezone, Timezone} from '@src/types/onyx/PersonalDetails';

let currentUserEmail = '';
let currentUserAccountID = -1;
Onyx.connect({
    key: ONYXKEYS.SESSION,
    callback: (val) => {
        currentUserEmail = val?.email ?? '';
        currentUserAccountID = val?.accountID ?? CONST.DEFAULT_NUMBER_ID;
    },
});

let allPersonalDetails: OnyxEntry<PersonalDetailsList>;
let loggedUserId: string | undefined;
Onyx.connect({
    key: ONYXKEYS.PERSONAL_DETAILS_LIST,
    callback: (val) => {
        allPersonalDetails = val;

        const personalDetails: PersonalDetailsList = allPersonalDetails ?? {};
        const personalData: PersonalDetails | null = personalDetails[currentUserAccountID];

        if (_.isUndefined(personalData) || _.isNull(personalData)) {
            return;
        }

        loggedUserId = personalData.userID;
    },
});

let privatePersonalDetails: OnyxEntry<PrivatePersonalDetails>;
Onyx.connect({
    key: ONYXKEYS.PRIVATE_PERSONAL_DETAILS,
    callback: (val) => (privatePersonalDetails = val),
});

function updatePronouns(pronouns: string) {
    if (!currentUserAccountID) {
        return;
    }

    const parameters: UpdatePronounsParams = {pronouns};

    API.write(WRITE_COMMANDS.UPDATE_PRONOUNS, parameters, {
        optimisticData: [
            {
                onyxMethod: Onyx.METHOD.MERGE,
                key: ONYXKEYS.PERSONAL_DETAILS_LIST,
                value: {
                    [currentUserAccountID]: {
                        pronouns,
                    },
                },
            },
        ],
    });
}

function setDisplayName(firstName: string, lastName: string) {
    if (!currentUserAccountID) {
        return;
    }

    Onyx.merge(ONYXKEYS.PERSONAL_DETAILS_LIST, {
        [currentUserAccountID]: {
            firstName,
            lastName,
            displayName: PersonalDetailsUtils.createDisplayName(currentUserEmail ?? '', {
                firstName,
                lastName,
            }),
        },
    });
}

function setFBUserLanguage(locale: Locale) {
    if (!currentUserAccountID) {
        return;
    }

    if (_.isUndefined(loggedUserId)) {
        return;
    }
    const properties: UserProperties = {
        preferredLocale: locale,
    };
    new FirebaseHelper().updateUserProperties({userId: loggedUserId, properties});
}

function updateFBUserTheme(theme: ValueOf<typeof CONST.THEME>) {
    if (!currentUserAccountID) {
        return;
    }

    if (_.isUndefined(loggedUserId)) {
        return;
    }
    const properties: UserProperties = {
        preferredTheme: theme,
    };
    new FirebaseHelper().updateUserProperties({userId: loggedUserId, properties});
}

function updateFBDisplayName(firstName: string, lastName: string) {
    if (!currentUserAccountID) {
        return;
    }

    if (_.isUndefined(loggedUserId)) {
        return;
    }
    const displayName = PersonalDetailsUtils.createDisplayName(currentUserEmail ?? '', {
        firstName,
        lastName,
    });
    const properties: UserProperties = {
        username: displayName,
        firstName,
        lastName,
    };
    new FirebaseHelper().updateUserProperties({userId: loggedUserId, properties});
}

function updateLegalName(legalFirstName: string, legalLastName: string) {
    const parameters: UpdateLegalNameParams = {legalFirstName, legalLastName};
    const optimisticData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.PRIVATE_PERSONAL_DETAILS,
            value: {
                legalFirstName,
                legalLastName,
            },
        },
    ];
    // In case the user does not have a display name, we will update the display name based on the legal name
    if (!allPersonalDetails?.[currentUserAccountID]?.firstName && !allPersonalDetails?.[currentUserAccountID]?.lastName) {
        optimisticData.push({
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.PERSONAL_DETAILS_LIST,
            value: {
                [currentUserAccountID]: {
                    displayName: PersonalDetailsUtils.createDisplayName(currentUserEmail ?? '', {
                        firstName: legalFirstName,
                        lastName: legalLastName,
                    }),
                    firstName: legalFirstName,
                    lastName: legalLastName,
                },
            },
        });
    }
    API.write(WRITE_COMMANDS.UPDATE_LEGAL_NAME, parameters, {
        optimisticData,
    });
    Navigation.goBack();
}

/**
 * @param dob - date of birth
 */
function updateDateOfBirth({dob}: DateOfBirthForm) {
    const parameters: UpdateDateOfBirthParams = {dob};

    API.write(WRITE_COMMANDS.UPDATE_DATE_OF_BIRTH, parameters, {
        optimisticData: [
            {
                onyxMethod: Onyx.METHOD.MERGE,
                key: ONYXKEYS.PRIVATE_PERSONAL_DETAILS,
                value: {
                    dob,
                },
            },
        ],
    });

    Navigation.goBack();
}

function updatePhoneNumber(phoneNumber: string, currenPhoneNumber: string) {
    const parameters: UpdatePhoneNumberParams = {phoneNumber};
    API.write(WRITE_COMMANDS.UPDATE_PHONE_NUMBER, parameters, {
        optimisticData: [
            {
                onyxMethod: Onyx.METHOD.MERGE,
                key: ONYXKEYS.PRIVATE_PERSONAL_DETAILS,
                value: {
                    phoneNumber,
                },
            },
        ],
        failureData: [
            {
                onyxMethod: Onyx.METHOD.MERGE,
                key: ONYXKEYS.PRIVATE_PERSONAL_DETAILS,
                value: {
                    phoneNumber: currenPhoneNumber,
                    errorFields: {
                        phoneNumber: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('privatePersonalDetails.error.invalidPhoneNumber'),
                    },
                },
            },
        ],
    });
}

function clearPhoneNumberError() {
    Onyx.merge(ONYXKEYS.PRIVATE_PERSONAL_DETAILS, {
        errorFields: {
            phoneNumber: null,
        },
    });
}

function updateAddress(street: string, street2: string, city: string, state: string, zip: string, country: Country | '') {
    const parameters: UpdateHomeAddressParams = {
        homeAddressStreet: street,
        addressStreet2: street2,
        homeAddressCity: city,
        addressState: state,
        addressZipCode: zip,
        addressCountry: country,
    };

    // State names for the United States are in the form of two-letter ISO codes
    // State names for other countries except US have full names, so we provide two different params to be handled by server
    if (country !== CONST.COUNTRY.US) {
        parameters.addressStateLong = state;
    }

    API.write(WRITE_COMMANDS.UPDATE_HOME_ADDRESS, parameters, {
        optimisticData: [
            {
                onyxMethod: Onyx.METHOD.MERGE,
                key: ONYXKEYS.PRIVATE_PERSONAL_DETAILS,
                value: {
                    addresses: [
                        ...(privatePersonalDetails?.addresses ?? []),
                        {
                            street: PersonalDetailsUtils.getFormattedStreet(street, street2),
                            city,
                            state,
                            zip,
                            country,
                            current: true,
                        },
                    ],
                },
            },
        ],
    });

    Navigation.goBack();
}

/**
 * Updates timezone's 'automatic' setting, and updates
 * selected timezone if set to automatically update.
 */
function updateAutomaticTimezone(timezone: Timezone) {
    if (!currentUserAccountID) {
        return;
    }

    const formatedTimezone = DateUtils.formatToSupportedTimezone(timezone);
    const parameters: UpdateAutomaticTimezoneParams = {
        timezone: JSON.stringify(formatedTimezone),
    };

    API.write(WRITE_COMMANDS.UPDATE_AUTOMATIC_TIMEZONE, parameters, {
        optimisticData: [
            {
                onyxMethod: Onyx.METHOD.MERGE,
                key: ONYXKEYS.PERSONAL_DETAILS_LIST,
                value: {
                    [currentUserAccountID]: {
                        timezone: formatedTimezone,
                    },
                },
            },
        ],
    });
}

/**
 * Updates user's 'selected' timezone, then navigates to the
 * initial Timezone page.
 */
function updateSelectedTimezone(selectedTimezone: SelectedTimezone) {
    const timezone: Timezone = {
        selected: selectedTimezone,
    };

    const parameters: UpdateSelectedTimezoneParams = {
        timezone: JSON.stringify(timezone),
    };

    if (currentUserAccountID) {
        API.write(WRITE_COMMANDS.UPDATE_SELECTED_TIMEZONE, parameters, {
            optimisticData: [
                {
                    onyxMethod: Onyx.METHOD.MERGE,
                    key: ONYXKEYS.PERSONAL_DETAILS_LIST,
                    value: {
                        [currentUserAccountID]: {
                            timezone,
                        },
                    },
                },
            ],
        });
    }

    Navigation.goBack(ROUTES.SETTINGS_TIMEZONE);
}

/**
 * Fetches public profile info about a given user.
 * The API will only return the accountID, displayName, and avatar for the user
 * but the profile page will use other info (e.g. contact methods and pronouns) if they are already available in Onyx
 */
function openPublicProfilePage(accountID: number) {
    const optimisticData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.PERSONAL_DETAILS_METADATA,
            value: {
                [accountID]: {
                    isLoading: true,
                },
            },
        },
    ];

    const successData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.PERSONAL_DETAILS_METADATA,
            value: {
                [accountID]: {
                    isLoading: false,
                },
            },
        },
    ];

    const failureData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.PERSONAL_DETAILS_METADATA,
            value: {
                [accountID]: {
                    isLoading: false,
                },
            },
        },
    ];

    const parameters: OpenPublicProfilePageParams = {accountID};

    API.read(READ_COMMANDS.OPEN_PUBLIC_PROFILE_PAGE, parameters, {optimisticData, successData, failureData});
}

/**
 * Updates the user's avatar image
 * three menus(on native):
 *    "Take photo"
 *    "Choose from gallery"
 *    "Choose file"
 * file:
 *     - File object
 *     file.uri:
 *        web:
 *          blob:https://dev.new.ieatta.com:8082/f689dcc6-43b9-46dc-90cd-59f1137e7d0b
 *        native:
 *          file:///Volumes/MacUser/djzhang/Library/Developer/CoreSimulator/Devices/E325FE60-321C-491B-8650-C59B10380E5C/data/Containers/Data/Application/B2B13DB1-D592-4C4F-BAB7-4675D957F73C/Library/Caches/ImageManipulator/D4526B36-30FC-468F-B545-02741DAA0EBC.png
 */
function updateFBAvatar(file: File | CustomRNImageManipulatorResult) {
    if (!currentUserAccountID) {
        return;
    }

    if (_.isUndefined(loggedUserId)) {
        return;
    }

    if (_.isUndefined(file.uri)) {
        return;
    }

    FirebasePhoto.saveUserPhoto({
        userId: loggedUserId,
        fileUriOrBlobHttps: file.uri,
    });
}

/**
 * Replaces the user's avatar image with a default avatar
 */
function deleteFBAvatar() {
    if (!currentUserAccountID) {
        return;
    }

    // We want to use the old dot avatar here as this affects both platforms.
    const defaultAvatar = UserUtils.getDefaultAvatarURL(currentUserAccountID);

    const optimisticData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.PERSONAL_DETAILS_LIST,
            value: {
                [currentUserAccountID]: {
                    avatar: defaultAvatar,
                    fallbackIcon: null,
                },
            },
        },
    ];
    const failureData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: ONYXKEYS.PERSONAL_DETAILS_LIST,
            value: {
                [currentUserAccountID]: {
                    avatar: allPersonalDetails?.[currentUserAccountID]?.avatar,
                    fallbackIcon: allPersonalDetails?.[currentUserAccountID]?.fallbackIcon,
                },
            },
        },
    ];

    API.write(WRITE_COMMANDS.DELETE_USER_AVATAR, null, {optimisticData, failureData});
}

/**
 * Clear error and pending fields for the current user's avatar
 */
function clearAvatarErrors() {
    if (!currentUserAccountID) {
        return;
    }

    Onyx.merge(ONYXKEYS.PERSONAL_DETAILS_LIST, {
        [currentUserAccountID]: {
            errorFields: {
                avatar: null,
            },
            pendingFields: {
                avatar: null,
            },
        },
    });
}

/**
 * Clear errors for the current user's personal details
 */
function clearPersonalDetailsErrors() {
    Onyx.merge(ONYXKEYS.PRIVATE_PERSONAL_DETAILS, {
        errors: null,
    });
}

function updatePersonalDetailsAndShipExpensifyCards(values: FormOnyxValues<typeof ONYXKEYS.FORMS.PERSONAL_DETAILS_FORM>, validateCode: string) {
    const parameters: SetPersonalDetailsAndShipExpensifyCardsParams = {
        legalFirstName: values.legalFirstName?.trim() ?? '',
        legalLastName: values.legalLastName?.trim() ?? '',
        phoneNumber: LoginUtils.appendCountryCode(values.phoneNumber?.trim() ?? ''),
        addressCity: values.city.trim(),
        addressStreet: values.addressLine1?.trim() ?? '',
        addressStreet2: values.addressLine2?.trim() ?? '',
        addressZip: values.zipPostCode?.trim().toUpperCase() ?? '',
        addressCountry: values.country,
        addressState: values.state.trim(),
        dob: values.dob,
        validateCode,
    };

    API.write(WRITE_COMMANDS.SET_PERSONAL_DETAILS_AND_SHIP_EXPENSIFY_CARDS, parameters, {
        optimisticData: [
            {
                onyxMethod: Onyx.METHOD.MERGE,
                key: ONYXKEYS.PRIVATE_PERSONAL_DETAILS,
                value: {
                    isLoading: true,
                },
            },
        ],
        finallyData: [
            {
                onyxMethod: Onyx.METHOD.MERGE,
                key: ONYXKEYS.PRIVATE_PERSONAL_DETAILS,
                value: {
                    isLoading: false,
                },
            },
        ],
    });
}

export {
    clearAvatarErrors,
    deleteFBAvatar,
    openPublicProfilePage,
    updateAddress,
    updateAutomaticTimezone,
    updateFBAvatar,
    updateDateOfBirth,
    setDisplayName,
    updateFBDisplayName,
    updateLegalName,
    updatePhoneNumber,
    clearPhoneNumberError,
    updatePronouns,
    updateSelectedTimezone,
    updatePersonalDetailsAndShipExpensifyCards,
    clearPersonalDetailsErrors,
    setFBUserLanguage,
    updateFBUserTheme,
};
