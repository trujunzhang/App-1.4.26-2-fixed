/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line lodash/import-scope
import {useRealm} from '@realm/react';
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
import {ParseModelRestaurants} from '@libs/FirebaseIeatta/appModel';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {IPhotoCarouselItemRow, OnCarouselItemPressed} from '@libs/FirebaseIeatta/list/types/rows/photo';
import type {IAuthUser} from '@libs/FirebaseIeatta/models/auth_user_model';
import {getAuthUserFromPersonalDetails} from '@libs/FirebaseIeatta/models/auth_user_model';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import {clearDraftValuesByDraftId} from '@libs/ieatta/editFormUtils';
import * as ShowNotify from '@libs/ieatta/Notify';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBEvent, IFBPhoto, IFBRestaurant, IFBSqlPhoto, IFBUser} from '@src/types/firebase';
import INPUT_IDS from '@src/types/form/ieatta/EditRestaurantForm';

type BaseEditRestaurantPageProps = {
    restaurantId: string;
    restaurant: IFBRestaurant | undefined;
    photosInPage: IFBPhoto[];
    isNewModel: boolean;
    initialPanelWidth: number;
    userLocation?: {latitude: number; longitude: number};
    onAfterSelectedCover: (firebasePhotoId: string) => Promise<void>;
};

const editFormID = ONYXKEYS.FORMS.IEATTA_RESTAURANT;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_RESTAURANT_DRAFT;

function BaseEditRestaurantPage({
    restaurantId,
    restaurant,
    photosInPage,
    isNewModel,
    userLocation = CONST.DEFAULT_LOCATION,
    initialPanelWidth,
    onAfterSelectedCover,
}: BaseEditRestaurantPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const personalData = useCurrentUserPersonalDetails();

    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    const {isSmallScreenWidth} = useResponsiveLayout();
    const toastId = React.useRef<number | string | null>(null);

    const coverUrl = lodashGet(restaurant, 'originalUrl', '');

    const saveModel = (values: FormOnyxValues<typeof editFormID>) => {
        setIsLoading(editFormID, true);
        toastId.current = ShowNotify.initialAndShowNotify({
            isSmallScreenWidth,
            message: translate('notify.save.start', {modalName: FBCollections.Restaurants}),
            autoClose: false,
        });

        const {restaurantDisplayName, restaurantNote} = values;
        let lastModel = restaurant;
        if (isNewModel) {
            if (userLocation === undefined || userLocation === null || userLocation === CONST.DEFAULT_LOCATION || userLocation.latitude === 0 || userLocation.longitude === 0) {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.location.disabled')});
                return;
            }

            const authUserModel: IAuthUser | null = getAuthUserFromPersonalDetails(personalData);
            if (_.isUndefined(authUserModel) || _.isNull(authUserModel)) {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.auth.unAuthed')});
                return;
            }
            lastModel = ParseModelRestaurants.emptyRestaurant({
                authUserModel,
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
            });
        }

        if (lastModel === null || lastModel === undefined) {
            return;
        }

        const nextModel = ParseModelRestaurants.updateRestaurant({
            model: {...lastModel},
            nextDisplayName: restaurantDisplayName,
            nextExtraNote: restaurantNote,
        });

        new FirebaseHelper()
            .setData({
                path: FBCollections.Restaurants,
                model: nextModel,
            })
            .then(() => {
                clearDraftValuesByDraftId(editFormID);
            })
            .then(() => {
                Navigation.goBack();
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, message: translate('notify.save.success', {modalName: FBCollections.Restaurants})});
            })
            .catch((error) => {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.save.failure', {modalName: FBCollections.Restaurants})});
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
        if (values.restaurantDisplayName === '') {
            errors.restaurantDisplayName = 'edit.restaurant.form.displayName.error';
        }
        return errors;
    };

    const renderHeader = (
        <FormProvider
            // editFormUniqueId={restaurantId}
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
                    defaultValue={lodashGet(restaurant, 'displayName', '')}
                    label={translate('edit.restaurant.form.displayName.title')}
                    aria-label={translate('edit.restaurant.form.displayName.placeholder')}
                    placeholder={translate('edit.restaurant.form.displayName.placeholder')}
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
                        inputID={INPUT_IDS.NOTE}
                        defaultValue={lodashGet(restaurant, 'extraNote', '')}
                        label={translate('edit.restaurant.form.note.title')}
                        aria-label={translate('edit.restaurant.form.note.placeholder')}
                        placeholder={translate('edit.restaurant.form.note.placeholder')}
                        autoCompleteType="off"
                        autoCorrect={false}
                        inputMode={CONST.INPUT_MODE.TEXT}
                        maxLength={300}
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
            path: FBCollections.Restaurants,
            uniqueId: restaurantId,
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
            return (
                <SectionCommonTitle
                    paddingLeft={{paddingLeft: 0}}
                    titleRow={{title: 'sections.titles.cover', isSmallScreenWidth, titleColor: TailwindColors.red500}}
                />
            );
        }
        return null;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.restaurant.form.header.new') : translate('edit.restaurant.form.header.edit')}
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

BaseEditRestaurantPage.displayName = 'BaseEditRestaurantPage';

export default BaseEditRestaurantPage;
