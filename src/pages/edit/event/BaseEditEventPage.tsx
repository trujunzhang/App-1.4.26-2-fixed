/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {Keyboard, View} from 'react-native';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import type {FormInputErrors, FormOnyxValues} from '@components/Form/types';
import EventDatePicker from '@components/Ieatta/components/EventDatePicker';
import EditPageWithSections from '@components/Ieatta/edit/EditPageWithSections';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import TextInput from '@components/TextInput';
import type {WithCurrentUserPersonalDetailsProps} from '@components/withCurrentUserPersonalDetails';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {clearDraftValuesByDraftId, setIsLoading} from '@libs/actions/FormActions';
import {ParseModelEvents} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {getAuthUserFromPersonalDetails} from '@libs/Firebase/models/auth_user_model';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import Log from '@libs/Log';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {IFBEvent} from '@src/types/firebase';
import INPUT_IDS from '@src/types/form/ieatta/EditEventForm';

const editFormID = ONYXKEYS.FORMS.IEATTA_EVENT;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_EVENT_DRAFT;

type BaseEditEventPageProps = WithCurrentUserPersonalDetailsProps & {
    restaurantId: string;
    eventId: string;
    event: IFBEvent | undefined;
    isNewModel: boolean;
};

function BaseEditEventPage({restaurantId, eventId, event, isNewModel, currentUserPersonalDetails}: BaseEditEventPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const saveModel = (values: FormOnyxValues<typeof editFormID>) => {
        console.log('');
        console.log('================================');
        console.log(`value: ${JSON.stringify(values)}`);
        console.log('================================');
        console.log('');

        Log.info('');
        Log.info('================================');
        Log.info(`value: ${JSON.stringify(values)}`);
        Log.info('================================');
        Log.info('');

        setIsLoading(editFormID, true);
        const {eventDisplayName: displayName, eventWhatWhy: want, eventStartDate: startString, eventEndDate: endString} = values;
        let lastModel = event;
        if (isNewModel) {
            const authUserModel = getAuthUserFromPersonalDetails(currentUserPersonalDetails);
            if (_.isUndefined(authUserModel)) {
                // toast.show({
                // description: 'No User Data!'
                // })
                return;
            }
            lastModel = ParseModelEvents.emptyEvent({
                authUserModel,
                restaurantId,
            });
        }

        if (lastModel === null || lastModel === undefined) {
            return;
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
                clearDraftValuesByDraftId(editFormID);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(editFormID, false);
                Navigation.goBack();
            });
    };

    const submit = (values: FormOnyxValues<typeof editFormID>) => {
        saveModel(values);
        Keyboard.dismiss();
    };

    const validate = (values: FormOnyxValues<typeof editFormID>) => {
        const errors: FormInputErrors<typeof editFormID> = {};
        if (values.eventDisplayName === '') {
            errors.eventDisplayName = 'edit.event.form.displayName.error';
        }
        return errors;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.event.form.header.new') : translate('edit.event.form.header.edit')}
            shouldShowLoading={false}
            formID={editFormID}
            editFormDraftID={editFormDraftID}
        >
            {() => (
                <FormProvider
                    // editFormUniqueId={eventId}
                    formID={editFormID}
                    submitButtonText={translate('common.save')}
                    style={[styles.mh5, styles.flexGrow1]}
                    scrollContextEnabled
                    validate={validate}
                    onSubmit={submit}
                    submitButtonStyles={[styles.justifyContentStart, {zIndex: -1}]}
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
                            inputID={INPUT_IDS.DISPLAY_NAME}
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
                                inputID={INPUT_IDS.WHAT_WHY}
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
                                inputID={INPUT_IDS.START_DATE}
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
                                inputID={INPUT_IDS.END_DATE}
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

BaseEditEventPage.displayName = 'BaseEditEventPage';

export default withCurrentUserPersonalDetails(BaseEditEventPage);

// export default BaseEditEventPage;
