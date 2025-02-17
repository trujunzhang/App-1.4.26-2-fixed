/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {Keyboard, View} from 'react-native';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import type {FormInputErrors, FormOnyxValues} from '@components/Form/types';
import ReviewRatingPanel from '@components/Ieatta/components/ReviewRatingPanel';
import EditPageWithSections from '@components/Ieatta/edit/EditPageWithSections';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import TextInput from '@components/TextInput';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {setIsLoading} from '@libs/actions/FormActions';
import {ParseModelReviews} from '@libs/FirebaseIeatta/appModel';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import {getAuthUserFromPersonalDetails} from '@libs/FirebaseIeatta/models/auth_user_model';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import ReviewHelper, {ReviewHookType} from '@libs/FirebaseIeatta/services/help/review-helper';
import {clearDraftValuesByDraftId} from '@libs/ieatta/editFormUtils';
import * as ShowNotify from '@libs/ieatta/Notify';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBReview} from '@src/types/firebase';
import INPUT_IDS from '@src/types/form/ieatta/EditReviewForm';

const editFormID = ONYXKEYS.FORMS.IEATTA_REVIEW;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_REVIEW_DRAFT;

type BaseEditReviewPageProps = {
    review: IFBReview | undefined;
    relatedId: string;
    reviewType: string;
    isNewModel: boolean;
};

function BaseEditReviewPage({review, relatedId, reviewType, isNewModel}: BaseEditReviewPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const personalData = useCurrentUserPersonalDetails();

    const {isSmallScreenWidth} = useResponsiveLayout();
    const toastId = React.useRef<number | string | null>(null);

    const lastReviewRate = lodashGet(review, 'rate', 0);

    const saveModel = (values: FormOnyxValues<typeof editFormID>) => {
        setIsLoading(editFormID, true);
        toastId.current = ShowNotify.initialAndShowNotify({
            isSmallScreenWidth,
            message: translate('notify.save.start', {modalName: 'Restaurant'}),
            autoClose: false,
        });

        const {reviewRating: rate, reviewNote: note} = values;
        let lastModel = review;
        if (isNewModel) {
            const authUserModel = getAuthUserFromPersonalDetails(personalData);
            if (_.isUndefined(authUserModel)) {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.auth.unAuthed')});
                return;
            }
            lastModel = ParseModelReviews.emptyReview({
                authUserModel,
                relatedId,
                reviewType,
            });
        }

        if (lastModel === null || lastModel === undefined) {
            return;
        }

        const nextRate: number = parseFloat(rate);
        const nextModel = ParseModelReviews.updateReview({
            model: {...lastModel},
            nextRate,
            nextExtraNote: note,
        });

        new FirebaseHelper()
            .setData({
                path: FBCollections.Reviews,
                model: nextModel,
            })
            .then(() => {
                return new ReviewHelper({lastReviewRate, selectedStar: nextRate, isNew: isNewModel}).onSaveOrRemoveReviewAfterHook({
                    reviewHookType: ReviewHookType.Add,
                    reviewType,
                    relatedId,
                });
            })
            .then(() => {
                clearDraftValuesByDraftId(editFormID);
            })
            .then(() => {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, message: translate('notify.save.success', {modalName: 'Restaurant'})});
                Navigation.goBack();
            })
            .catch((error) => {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.save.failure', {modalName: 'Restaurant'})});
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
        if (values.reviewNote === '') {
            errors.reviewNote = 'edit.review.form.displayName.error';
        }
        return errors;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.review.form.header.new') : translate('edit.review.form.header.edit')}
            shouldShowLoading={false}
            formID={editFormID}
            editFormDraftID={editFormDraftID}
        >
            {() => (
                <FormProvider
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
                        <InputWrapper
                            InputComponent={ReviewRatingPanel}
                            role={CONST.ROLE.PRESENTATION}
                            inputID={INPUT_IDS.RATING}
                            containerStyles={[styles.mt4]}
                            defaultValue={`${lodashGet(review, 'rate', 3)}`}
                            shouldSaveDraft
                        />

                        <View style={[styles.mt4]}>
                            <InputWrapper
                                InputComponent={TextInput}
                                multiline
                                numberOfLines={10}
                                inputID={INPUT_IDS.NOTE}
                                defaultValue={lodashGet(review, 'body', '')}
                                label={translate('edit.review.form.note.title')}
                                aria-label={translate('edit.review.form.note.placeholder')}
                                placeholder={translate('edit.review.form.note.placeholder')}
                                autoCompleteType="off"
                                autoCorrect={false}
                                inputMode={CONST.INPUT_MODE.TEXT}
                                maxLength={3000}
                                shouldSaveDraft
                            />
                        </View>
                    </OfflineWithFeedback>
                </FormProvider>
            )}
        </EditPageWithSections>
    );
}

BaseEditReviewPage.displayName = 'BaseEditReviewPage';

export default BaseEditReviewPage;
