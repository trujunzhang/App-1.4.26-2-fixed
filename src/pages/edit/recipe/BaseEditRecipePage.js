/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Keyboard, View} from 'react-native';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import EditPageWithSections from '@components/Ieatta/edit/EditPageWithSections';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import TextInput from '@components/TextInput';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {clearDraftValuesByDraftId, setIsLoading} from '@libs/actions/FormActions';
import compose from '@libs/compose';
import {ParseModelRecipes} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {getAuthUserFromPersonalDetails} from '@libs/Firebase/models/auth_user_model';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import Navigation from '@libs/Navigation/Navigation';
import {recipePropTypes} from '@pages/proptypes';
import personalDetailsPropType from '@expPages/personalDetailsPropType';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';

const propTypes = {
    recipeId: PropTypes.string.isRequired,
    recipe: recipePropTypes.isRequired,
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

const editFormID = ONYXKEYS.FORMS.IEATTA_RECIPE;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_RECIPE_DRAFT;

function BaseEditRecipePage({recipeId, recipe, isNewModel, currentUserPersonalDetails}) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const saveModel = (value) => {
        setIsLoading(editFormID, true);
        const {displayName, price} = value;
        let lastModel = recipe;
        if (isNewModel === true) {
            const authUserModel = getAuthUserFromPersonalDetails(currentUserPersonalDetails);
            if (_.isUndefined(authUserModel)) {
                // toast.show({
                // description: 'No User Data!'
                // })
                return;
            }
            lastModel = ParseModelRecipes.emptyRecipe({
                authUserModel,
                restaurantId: recipe.restaurantId,
            });
        }

        const nextModel = ParseModelRecipes.updateRecipe({
            model: {...lastModel},
            nextDisplayName: displayName,
            nextPrice: price,
        });

        new FirebaseHelper()
            .setData({
                path: FBCollections.Recipes,
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

    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    const validate = (values) => {
        const errors = {};
        if (values.displayName === '') {
            errors.displayName = 'edit.recipe.form.displayName.error';
        } else if (values.price === '') {
            errors.price = 'edit.recipe.form.price.error.empty';
        } else if (!isNumeric(values.price)) {
            errors.price = 'edit.recipe.form.price.error.number';
        }
        return errors;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.recipe.form.header.new') : translate('edit.recipe.form.header.edit')}
            guidesCallTaskID={CONST.GUIDES_CALL_TASK_IDS.WORKSPACE_REIMBURSE}
            shouldSkipVBBACall
            shouldShowLoading={false}
            formID={editFormID}
            editFormDraftID={editFormDraftID}
        >
            {() => (
                <FormProvider
                    editFormUniqueId={recipeId}
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
                            defaultValue={lodashGet(recipe, 'displayName', '')}
                            label={translate('edit.recipe.form.displayName.title')}
                            aria-label={translate('edit.recipe.form.displayName.placeholder')}
                            placeholder={translate('edit.recipe.form.displayName.placeholder')}
                            autoCompleteType="off"
                            autoCorrect={false}
                            inputMode={CONST.INPUT_MODE.TEXT}
                            maxLength={30}
                            shouldSaveDraft
                        />

                        <View style={[styles.mt4]}>
                            <InputWrapper
                                InputComponent={TextInput}
                                inputID="price"
                                defaultValue={lodashGet(recipe, 'price', '')}
                                label={translate('edit.recipe.form.price.title')}
                                aria-label={translate('edit.recipe.form.price.placeholder')}
                                placeholder={translate('edit.recipe.form.price.placeholder')}
                                autoCompleteType="off"
                                autoCorrect={false}
                                inputMode={CONST.INPUT_MODE.NUMERIC}
                                shouldSaveDraft
                            />
                        </View>
                    </OfflineWithFeedback>
                </FormProvider>
            )}
        </EditPageWithSections>
    );
}

BaseEditRecipePage.propTypes = propTypes;
BaseEditRecipePage.defaultProps = defaultProps;
BaseEditRecipePage.displayName = 'BaseEditRecipePage';

// eslint-disable-next-line rulesdir/no-useless-compose
export default compose(withCurrentUserPersonalDetails)(BaseEditRecipePage);

// export default BaseEditRecipePage;
