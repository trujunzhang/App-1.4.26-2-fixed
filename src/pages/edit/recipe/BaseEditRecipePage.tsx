/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {Keyboard, View} from 'react-native';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import type {FormInputErrors, FormOnyxValues} from '@components/Form/types';
import EditPageWithSections from '@components/Ieatta/edit/EditPageWithSections';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import TextInput from '@components/TextInput';
import type {WithCurrentUserPersonalDetailsProps} from '@components/withCurrentUserPersonalDetails';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {clearDraftValuesByDraftId, setIsLoading} from '@libs/actions/FormActions';
import {ParseModelRecipes} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {getAuthUserFromPersonalDetails} from '@libs/Firebase/models/auth_user_model';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import {IFBRecipe} from '@src/types/firebase';
import INPUT_IDS from '@src/types/form/ieatta/EditRecipeForm';

const editFormID = ONYXKEYS.FORMS.IEATTA_RECIPE;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_RECIPE_DRAFT;

type BaseEditRecipePageProps = WithCurrentUserPersonalDetailsProps & {
    restaurantId: string;
    recipeId: string;
    recipe: IFBRecipe | undefined;
    isNewModel: boolean;
};

function BaseEditRecipePage({restaurantId, recipe, isNewModel, currentUserPersonalDetails}: BaseEditRecipePageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const saveModel = (values: FormOnyxValues<typeof editFormID>) => {
        setIsLoading(editFormID, true);
        const {recipeDisplayName: displayName, recipePrice: price} = values;
        let lastModel = recipe;
        if (isNewModel) {
            const authUserModel = getAuthUserFromPersonalDetails(currentUserPersonalDetails);
            if (_.isUndefined(authUserModel)) {
                // toast.show({
                // description: 'No User Data!'
                // })
                return;
            }
            lastModel = ParseModelRecipes.emptyRecipe({
                authUserModel,
                restaurantId,
            });
        }

        if (lastModel === null || lastModel === undefined) {
            return;
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

    function isNumeric(value: string) {
        return /^-?\d+$/.test(value);
    }

    const validate = (values: FormOnyxValues<typeof editFormID>) => {
        const errors: FormInputErrors<typeof editFormID> = {};
        if (values.recipeDisplayName === '') {
            errors.recipeDisplayName = 'edit.recipe.form.displayName.error';
        } else if (values.recipePrice === '') {
            errors.recipePrice = 'edit.recipe.form.price.error.empty';
        } else if (!isNumeric(values.recipePrice)) {
            errors.recipePrice = 'edit.recipe.form.price.error.number';
        }
        return errors;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.recipe.form.header.new') : translate('edit.recipe.form.header.edit')}
            shouldShowLoading={false}
            formID={editFormID}
            editFormDraftID={editFormDraftID}
        >
            {() => (
                <FormProvider
                    // editFormUniqueId={recipeId}
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
                            InputComponent={TextInput}
                            role={CONST.ROLE.PRESENTATION}
                            inputID={INPUT_IDS.DISPLAY_NAME}
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
                                inputID={INPUT_IDS.PRICE}
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

BaseEditRecipePage.displayName = 'BaseEditRecipePage';

export default withCurrentUserPersonalDetails(BaseEditRecipePage);

// export default BaseEditRecipePage;
