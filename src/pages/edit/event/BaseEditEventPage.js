/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Keyboard, View} from 'react-native';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import EventDatePicker from '@components/Ieatta/components/EventDatePicker';
import EditPageWithSections from '@components/Ieatta/edit/EditPageWithSections';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import TextInput from '@components/TextInput';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {clearDraftValuesByDraftId, setIsLoading} from '@libs/actions/FormActions';
import compose from '@libs/compose';
import {ParseModelEvents} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {getAuthUserFromPersonalDetails} from '@libs/Firebase/models/auth_user_model';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import Log from '@libs/Log';
import Navigation from '@libs/Navigation/Navigation';
import {eventPropTypes} from '@pages/proptypes';
import personalDetailsPropType from '@expPages/personalDetailsPropType';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';

const propTypes = {
    eventId: PropTypes.string.isRequired,
    event: eventPropTypes.isRequired,
    isNewModel: PropTypes.bool.isRequired,

    /** The personal details of the person who is logged in */
    currentUserPersonalDetails: personalDetailsPropType,
};

const defaultProps = {
    currentUserPersonalDetails: {
        pendingFields: {avatar: ''},
        accountID: '',
        avatar: '',
    },
};

const editFormID = ONYXKEYS.FORMS.IEATTA_EVENT;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_EVENT_DRAFT;

function BaseEditEventPage({eventId, event, isNewModel, currentUserPersonalDetails}) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const saveModel = (value) => {
        console.log('');
        console.log('================================');
        console.log(`value: ${JSON.stringify(value)}`);
        console.log('================================');
        console.log('');

        Log.info('');
        Log.info('================================');
        Log.info(`value: ${JSON.stringify(value)}`);
        Log.info('================================');
        Log.info('');

        setIsLoading(editFormID, true);
        const {displayName, want, startString, endString} = value;
        let lastModel = event;
        if (isNewModel === true) {
            const authUserModel = getAuthUserFromPersonalDetails(currentUserPersonalDetails);
            if (_.isUndefined(authUserModel)) {
                // toast.show({
                // description: 'No User Data!'
                // })
                return;
            }
            lastModel = ParseModelEvents.emptyEvent({
                authUserModel,
                restaurantId: event.restaurantId,
            });
        }

        const nextModel = ParseModelEvents.updateEvent({
            model: {...lastModel},
            nextDisplayName: displayName,
            nextWant: want,
            nextStartDate: startString,
            nextEndDate: endString,
        });

        new FirebaseHelper()
            .setData({
                path: FBCollections.Events,
                model: nextModel,
            })
            .then(() => {
                clearDraftValuesByDraftId(editFormDraftID);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(editFormID, false);
                Navigation.goBack(ROUTES.HOME);
            });
    };

    const submit = (values) => {
        saveModel(values);
        Keyboard.dismiss();
    };

    const validate = (values) => {
        const errors = {};
        if (values.displayName === '') {
            errors.displayName = 'edit.event.form.displayName.error';
        }
        return errors;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.event.form.header.new') : translate('edit.event.form.header.edit')}
            guidesCallTaskID={CONST.GUIDES_CALL_TASK_IDS.WORKSPACE_REIMBURSE}
            shouldSkipVBBACall
            shouldShowLoading={false}
            formID={editFormID}
            editFormDraftID={editFormDraftID}
        >
            {() => (
                <FormProvider
                    editFormUniqueId={eventId}
                    formID={editFormID}
                    submitButtonText={translate('common.save')}
                    style={[styles.mh5, styles.flexGrow1]}
                    scrollContextEnabled
                    validate={validate}
                    onSubmit={submit}
                    enabledWhenOffline
                >
                    <OfflineWithFeedback
                        onClose={
                            () => false
                            // Policy.clearCustomUnitErrors(props.policy.id, lodashGet(distanceCustomUnit, 'customUnitID', ''), lodashGet(distanceCustomRate, 'customUnitRateID', ''))
                        }
                    >
                        <InputWrapper
                            InputComponent={TextInput}
                            role={CONST.ROLE.PRESENTATION}
                            inputID="displayName"
                            containerStyles={[styles.mt4]}
                            defaultValue={lodashGet(event, 'displayName', '')}
                            label={translate('edit.event.form.displayName.title')}
                            aria-label={translate('edit.event.form.displayName.placeholder')}
                            placeholder={translate('edit.event.form.displayName.placeholder')}
                            autoCompleteType="off"
                            autoCorrect={false}
                            inputMode={CONST.INPUT_MODE.TEXT}
                            maxLength={30}
                            shouldSaveDraft
                        />

                        <View style={[styles.mt4]}>
                            <InputWrapper
                                InputComponent={TextInput}
                                multiline
                                numberOfLines={10}
                                inputID="want"
                                defaultValue={lodashGet(event, 'want', '')}
                                label={translate('edit.event.form.want.title')}
                                aria-label={translate('edit.event.form.want.placeholder')}
                                placeholder={translate('edit.event.form.want.placeholder')}
                                autoCompleteType="off"
                                autoCorrect={false}
                                inputMode={CONST.INPUT_MODE.TEXT}
                                maxLength={300}
                                shouldSaveDraft
                            />
                        </View>
                        <View style={[styles.mt4]}>
                            <InputWrapper
                                InputComponent={EventDatePicker}
                                inputID="startString"
                                defaultValue={lodashGet(event, 'start', '')}
                                label={translate('edit.event.form.start.title')}
                                aria-label={translate('edit.event.form.start.placeholder')}
                                placeholder={translate('edit.event.form.start.placeholder')}
                                shouldSaveDraft
                            />
                        </View>
                        <View style={[styles.mt4, {zIndex: -1}]}>
                            <InputWrapper
                                InputComponent={EventDatePicker}
                                inputID="endString"
                                defaultValue={lodashGet(event, 'end', '')}
                                label={translate('edit.event.form.end.title')}
                                aria-label={translate('edit.event.form.end.placeholder')}
                                placeholder={translate('edit.event.form.end.placeholder')}
                                shouldSaveDraft
                            />
                        </View>
                    </OfflineWithFeedback>
                </FormProvider>
            )}
        </EditPageWithSections>
    );
}

BaseEditEventPage.propTypes = propTypes;
BaseEditEventPage.defaultProps = defaultProps;
BaseEditEventPage.displayName = 'BaseEditEventPage';

// eslint-disable-next-line rulesdir/no-useless-compose
export default compose(withCurrentUserPersonalDetails)(BaseEditEventPage);

// export default BaseEditEventPage;
