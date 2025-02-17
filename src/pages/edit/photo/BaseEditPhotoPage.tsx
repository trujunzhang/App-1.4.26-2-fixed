/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import type {FormInputErrors, FormOnyxValues} from '@components/Form/types';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import PhotoPreviewPanel from '@components/Ieatta/components/PhotoPreviewPanel';
import EditPageWithSections from '@components/Ieatta/edit/EditPageWithSections';
import Image from '@components/Image';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import TextInput from '@components/TextInput';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {setIsLoading} from '@libs/actions/FormActions';
import {ParseModelPhotos} from '@libs/FirebaseIeatta/appModel';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import {getAuthUserFromPersonalDetails} from '@libs/FirebaseIeatta/models/auth_user_model';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import {clearDraftValuesByDraftId} from '@libs/ieatta/editFormUtils';
import * as ShowNotify from '@libs/ieatta/Notify';
import Log from '@libs/Log';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBPhoto} from '@src/types/firebase';
import INPUT_IDS from '@src/types/form/ieatta/EditPhotoForm';

const editFormID = ONYXKEYS.FORMS.IEATTA_PHOTO;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_PHOTO_DRAFT;

type BaseEditPhotoPageProps = {
    photoId: string;
    photo: IFBPhoto | undefined;
    isNewModel: boolean;
};

function BaseEditPhotoPage({photoId, photo, isNewModel}: BaseEditPhotoPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const personalData = useCurrentUserPersonalDetails();

    const {isSmallScreenWidth} = useResponsiveLayout();
    const toastId = React.useRef<number | string | null>(null);

    const saveModel = (values: FormOnyxValues<typeof editFormID>) => {
        setIsLoading(editFormID, true);
        toastId.current = ShowNotify.initialAndShowNotify({
            isSmallScreenWidth,
            message: translate('notify.save.start', {modalName: 'photo'}),
            autoClose: false,
        });

        const {photoNote} = values;
        const lastModel = photo;
        if (isNewModel) {
            const authUserModel = getAuthUserFromPersonalDetails(personalData);
            if (_.isUndefined(authUserModel)) {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.auth.unAuthed')});
                return;
            }
            // lastModel = ParseModelPhotos.emptyPhoto({
            //     authUserModel,
            // });
        }

        if (lastModel === null || lastModel === undefined) {
            return;
        }

        const nextModel = ParseModelPhotos.updatePhoto({
            model: {...lastModel},
            nextExtraNote: photoNote,
        });

        new FirebaseHelper()
            .setData({
                path: FBCollections.Photos,
                model: nextModel,
            })
            .then(() => {
                clearDraftValuesByDraftId(editFormID);
            })
            .then(() => {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, message: translate('notify.save.success', {modalName: 'Photo'})});
                Navigation.goBack();
            })
            .catch((error) => {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.save.failure', {modalName: 'Photo'})});
                console.log(error);
            })
            .finally(() => {
                setIsLoading(editFormID, false);
            });
    };

    const submit = (values: FormOnyxValues<typeof editFormID>) => {
        saveModel(values);
        Keyboard.dismiss();
    };

    const validate = (values: FormOnyxValues<typeof editFormID>) => {
        const errors: FormInputErrors<typeof editFormID> = {};
        return errors;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.photo.form.header.new') : translate('edit.photo.form.header.edit')}
            shouldShowLoading={false}
            formID={editFormID}
            editFormDraftID={editFormDraftID}
        >
            {() => (
                <FormProvider
                    // editFormUniqueId={photoId}
                    formID={editFormID}
                    submitButtonText={translate('common.save')}
                    style={[styles.mh5, styles.flexGrow1]}
                    scrollContextEnabled
                    validate={validate}
                    onSubmit={submit}
                    submitButtonStyles={[styles.justifyContentStart]}
                    enabledWhenOffline
                >
                    <OfflineWithFeedback
                        onClose={
                            () => false
                            // Policy.clearCustomUnitErrors(props.policy.id, lodashGet(distanceCustomUnit, 'customUnitID', ''), lodashGet(distanceCustomRate, 'customUnitRateID', ''))
                        }
                    >
                        <View style={[styles.mt4]}>
                            <InputWrapper
                                InputComponent={PhotoPreviewPanel}
                                inputID={INPUT_IDS.PHOTO_PREVIEW}
                                defaultValue={photo?.originalUrl}
                                shouldSaveDraft
                            />
                        </View>

                        <View style={[styles.mt4]}>
                            <InputWrapper
                                InputComponent={TextInput}
                                multiline
                                numberOfLines={10}
                                inputID={INPUT_IDS.NOTE}
                                defaultValue={lodashGet(photo, 'extraNote', '')}
                                label={translate('edit.photo.form.note.title')}
                                aria-label={translate('edit.photo.form.note.placeholder')}
                                placeholder={translate('edit.photo.form.note.placeholder')}
                                autoCompleteType="off"
                                autoCorrect={false}
                                inputMode={CONST.INPUT_MODE.TEXT}
                                maxLength={300}
                                shouldSaveDraft
                            />
                        </View>
                    </OfflineWithFeedback>
                </FormProvider>
            )}
        </EditPageWithSections>
    );
}

BaseEditPhotoPage.displayName = 'BaseEditPhotoPage';

export default BaseEditPhotoPage;
