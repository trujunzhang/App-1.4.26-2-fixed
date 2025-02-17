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
import BasePhotosGridList from '@components/Ieatta/components/PhotosGrid/BasePhotosGridList';
import {SectionCommonTitle} from '@components/Ieatta/detailedPage/common';
import EditPageWithSections from '@components/Ieatta/edit/EditPageWithSections';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import TextInput from '@components/TextInput';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {setIsLoading} from '@libs/actions/FormActions';
import {ParseModelRecipes} from '@libs/FirebaseIeatta/appModel';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {IPhotoCarouselItemRow, OnCarouselItemPressed} from '@libs/FirebaseIeatta/list/types/rows/photo';
import {getAuthUserFromPersonalDetails} from '@libs/FirebaseIeatta/models/auth_user_model';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import {clearDraftValuesByDraftId} from '@libs/ieatta/editFormUtils';
import * as ShowNotify from '@libs/ieatta/Notify';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBPhoto, IFBRecipe, IFBSqlPhoto} from '@src/types/firebase';
import INPUT_IDS from '@src/types/form/ieatta/EditRecipeForm';

const editFormID = ONYXKEYS.FORMS.IEATTA_RECIPE;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_RECIPE_DRAFT;

type BaseEditRecipePageProps = {
    restaurantId: string;
    recipeId: string;
    recipe: IFBRecipe | undefined;
    photosInPage: IFBPhoto[];
    isNewModel: boolean;
    initialPanelWidth: number;
    onAfterSelectedCover: (firebasePhotoId: string) => Promise<void>;
};

function BaseEditRecipePage({restaurantId, recipeId, recipe, photosInPage, isNewModel, initialPanelWidth, onAfterSelectedCover}: BaseEditRecipePageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const coverUrl = lodashGet(recipe, 'originalUrl', '');

    const personalData = useCurrentUserPersonalDetails();

    const {isSmallScreenWidth} = useResponsiveLayout();
    const toastId = React.useRef<number | string | null>(null);

    const saveModel = (values: FormOnyxValues<typeof editFormID>) => {
        setIsLoading(editFormID, true);
        toastId.current = ShowNotify.initialAndShowNotify({
            isSmallScreenWidth,
            message: translate('notify.save.start', {modalName: 'Restaurant'}),
            autoClose: false,
        });

        const {recipeDisplayName: displayName, recipePrice: price} = values;
        let lastModel = recipe;
        if (isNewModel) {
            const authUserModel = getAuthUserFromPersonalDetails(personalData);
            if (_.isUndefined(authUserModel)) {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.auth.unAuthed')});
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
            .then(() => {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, message: translate('notify.save.success', {modalName: 'Recipe'})});
                Navigation.goBack();
            })
            .catch((error) => {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.save.failure', {modalName: 'Recipe'})});
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

    const renderHeader = (
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
    );

    // eslint-disable-next-line @lwc/lwc/no-async-await, @typescript-eslint/no-misused-promises
    const onCarouselItemPressed: OnCarouselItemPressed = async (photo: IFBPhoto, isSelected: boolean) => {
        const {originalUrl: photoCover, uniqueId: firebasePhotoId} = photo;

        await new FirebaseHelper().updateCover({
            path: FBCollections.Recipes,
            uniqueId: recipeId,
            coverData: {
                originalUrl: photoCover,
            },
        });
        await onAfterSelectedCover(firebasePhotoId);
    };

    const generatePageRow = (item: IFBPhoto | IFBSqlPhoto, itemWidth: number, itemHeight: number): IPageRow => {
        const photo = item as IFBPhoto;
        const photoUrl = lodashGet(photo, 'originalUrl', '');
        const carouselItem: IPhotoCarouselItemRow = {
            relatedId: '',
            photoType: '',
            photo,
            containerWidth: itemWidth,
            photoWidth: itemWidth,
            photoHeight: itemHeight,
            section: {
                isSelected: coverUrl === photoUrl,
                onItemPressed: onCarouselItemPressed,
            },
        };

        return {
            rowType: PageSection.PHOTO_SELECT_COVERR_FOR_RESTAURANT_AND_RECIPE,
            rowData: carouselItem,
            rowKey: 'PageSection.PHOTO_SELECT_COVERR_FOR_RESTAURANT_AND_RECIPE<Photo-Grid>',
            modalName: 'restaurant',
            pressType: RowPressableType.SINGLE_PRESS,
        };
    };

    const renderCoverTitle = () => {
        if (photosInPage.length > 0) {
            return <SectionCommonTitle titleRow={{title: 'sections.titles.cover', isSmallScreenWidth, titleColor: TailwindColors.red500}} />;
        }
        return null;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.recipe.form.header.new') : translate('edit.recipe.form.header.edit')}
            shouldShowLoading={false}
            formID={editFormID}
            editFormDraftID={editFormDraftID}
        >
            {() => (
                <BasePhotosGridList
                    initialPanelWidth={initialPanelWidth}
                    isCoverPage
                    headerContent={
                        <>
                            {renderHeader}
                            {renderCoverTitle()}
                        </>
                    }
                    photos={photosInPage}
                    generatePageRow={generatePageRow}
                />
            )}
        </EditPageWithSections>
    );
}

BaseEditRecipePage.displayName = 'BaseEditRecipePage';

export default BaseEditRecipePage;
