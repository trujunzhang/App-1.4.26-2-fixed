/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Keyboard, View} from 'react-native';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import ReviewRatingPanel from '@components/Ieatta/components/ReviewRatingPanel';
import EditPageWithSections from '@components/Ieatta/edit/EditPageWithSections';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import TextInput from '@components/TextInput';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {clearDraftValuesByDraftId, setIsLoading} from '@libs/actions/FormActions';
import compose from '@libs/compose';
import {ParseModelReviews} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {getAuthUserFromPersonalDetails} from '@libs/Firebase/models/auth_user_model';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import ReviewHelper, {ReviewHookType} from '@libs/Firebase/services/help/review-helper';
import Navigation from '@libs/Navigation/Navigation';
import {reviewPropTypes} from '@pages/proptypes';
import personalDetailsPropType from '@expPages/personalDetailsPropType';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';

const propTypes = {
    review: reviewPropTypes.isRequired,
    relatedId: PropTypes.string.isRequired,
    reviewType: PropTypes.string.isRequired,

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

const editFormID = ONYXKEYS.FORMS.IEATTA_REVIEW;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_REVIEW_DRAFT;

function BaseEditReviewPage({review, relatedId, reviewType, isNewModel, currentUserPersonalDetails}) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const lastReviewRate = lodashGet(review, 'rate', 0);

    const saveModel = (value) => {
        setIsLoading(editFormID, true);
        const {rate, note} = value;
        let lastModel = review;
        if (isNewModel === true) {
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

        const nextModel = ParseModelReviews.updateReview({
            model: {...lastModel},
            nextRate: rate,
            nextExtraNote: note,
        });

        new FirebaseHelper()
            .setData({
                path: FBCollections.Reviews,
                model: nextModel,
            })
            .then(() => {
                return new ReviewHelper({lastReviewRate, selectedStar: rate, isNew: isNewModel}).onSaveOrRemoveReviewAfterHook({
                    reviewHookType: ReviewHookType.Add,
                    reviewType,
                    relatedId,
                });
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
            errors.displayName = 'edit.review.form.displayName.error';
        }
        return errors;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.review.form.header.new') : translate('edit.review.form.header.edit')}
            guidesCallTaskID={CONST.GUIDES_CALL_TASK_IDS.WORKSPACE_REIMBURSE}
            shouldSkipVBBACall
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
                            inputID="rate"
                            containerStyles={[styles.mt4]}
                            defaultValue={lodashGet(review, 'rate', 3)}
                            shouldSaveDraft
                        />

                        <View style={[styles.mt4]}>
                            <InputWrapper
                                InputComponent={TextInput}
                                multiline
                                numberOfLines={10}
                                inputID="note"
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

BaseEditReviewPage.propTypes = propTypes;
BaseEditReviewPage.defaultProps = defaultProps;
BaseEditReviewPage.displayName = 'BaseEditReviewPage';

// eslint-disable-next-line rulesdir/no-useless-compose
export default compose(withCurrentUserPersonalDetails)(BaseEditReviewPage);

// export default BaseEditReviewPage;
