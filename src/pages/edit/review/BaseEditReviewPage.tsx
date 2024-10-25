/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
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
import type {WithCurrentUserPersonalDetailsProps} from '@components/withCurrentUserPersonalDetails';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {clearDraftValuesByDraftId, setIsLoading} from '@libs/actions/FormActions';
import {ParseModelReviews} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {getAuthUserFromPersonalDetails} from '@libs/Firebase/models/auth_user_model';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import ReviewHelper, {ReviewHookType} from '@libs/Firebase/services/help/review-helper';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBReview} from '@src/types/firebase';
import INPUT_IDS from '@src/types/form/ieatta/EditReviewForm';

const editFormID = ONYXKEYS.FORMS.IEATTA_REVIEW;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_REVIEW_DRAFT;

type BaseEditReviewPageProps = WithCurrentUserPersonalDetailsProps & {
    review: IFBReview | undefined;
    relatedId: string;
    reviewType: string;
    isNewModel: boolean;
};

function BaseEditReviewPage({review, relatedId, reviewType, isNewModel, currentUserPersonalDetails}: BaseEditReviewPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const lastReviewRate = lodashGet(review, 'rate', 0);

    const saveModel = (values: FormOnyxValues<typeof editFormID>) => {
        setIsLoading(editFormID, true);
        const {reviewRating: rate, reviewNote: note} = values;
        let lastModel = review;
        if (isNewModel) {
            const authUserModel = getAuthUserFromPersonalDetails(currentUserPersonalDetails);
            if (_.isUndefined(authUserModel)) {
                // toast.show({
                // description: 'No User Data!'
                // })
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

export default withCurrentUserPersonalDetails(BaseEditReviewPage);

// export default BaseEditReviewPage;
