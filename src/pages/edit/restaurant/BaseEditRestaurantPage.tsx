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
import {ParseModelRestaurants} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {getAuthUserFromPersonalDetails} from '@libs/Firebase/models/auth_user_model';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {IFBRestaurant} from '@src/types/firebase';
import INPUT_IDS from '@src/types/form/ieatta/EditRestaurantForm';

type BaseEditRestaurantPageProps = WithCurrentUserPersonalDetailsProps & {
    restaurantId: string;
    restaurant: IFBRestaurant | undefined;
    isNewModel: boolean;
    userLocation?: {latitude: number; longitude: number};
};

const editFormID = ONYXKEYS.FORMS.IEATTA_RESTAURANT;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_RESTAURANT_DRAFT;

function BaseEditRestaurantPage({restaurantId, restaurant, isNewModel, userLocation = CONST.DEFAULT_LOCATION, currentUserPersonalDetails}: BaseEditRestaurantPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const saveModel = (values: FormOnyxValues<typeof editFormID>) => {
        setIsLoading(editFormID, true);
        const {restaurantDisplayName, restaurantNote} = values;
        let lastModel = restaurant;
        if (isNewModel) {
            if (_.isUndefined(userLocation)) {
                // toast.show({
                //   description: 'No GPS!'
                // })
                return;
            }

            const authUserModel = getAuthUserFromPersonalDetails(currentUserPersonalDetails);
            if (_.isUndefined(authUserModel)) {
                // toast.show({
                // description: 'No User Data!'
                // })
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
        if (values.restaurantDisplayName === '') {
            errors.restaurantDisplayName = 'edit.restaurant.form.displayName.error';
        }
        return errors;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.restaurant.form.header.new') : translate('edit.restaurant.form.header.edit')}
            shouldShowLoading={false}
            formID={editFormID}
            editFormDraftID={editFormDraftID}
        >
            {() => (
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
            )}
        </EditPageWithSections>
    );
}

BaseEditRestaurantPage.displayName = 'BaseEditRestaurantPage';

export default withCurrentUserPersonalDetails(BaseEditRestaurantPage);

// export default BaseEditRestaurantPage;
