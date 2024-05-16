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
import {ParseModelRestaurants} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {getAuthUserFromPersonalDetails} from '@libs/Firebase/models/auth_user_model';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import Navigation from '@libs/Navigation/Navigation';
import {restaurantPropTypes} from '@pages/proptypes';
import personalDetailsPropType from '@expPages/personalDetailsPropType';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';

const propTypes = {
    restaurantId: PropTypes.string.isRequired,
    restaurant: restaurantPropTypes.isRequired,
    isNewModel: PropTypes.bool.isRequired,

    /* Current location coordinates of the user */
    userLocation: PropTypes.shape({
        /** Latitude of the location */
        latitude: PropTypes.number,

        /** Longitude of the location */
        longitude: PropTypes.number,
    }),

    /** The personal details of the person who is logged in */
    currentUserPersonalDetails: personalDetailsPropType,
};

const defaultProps = {
    userLocation: CONST.DEFAULT_LOCATION,
    currentUserPersonalDetails: {
        pendingFields: {avatar: ''},
        accountID: '',
        avatar: '',
    },
};

const editFormID = ONYXKEYS.FORMS.IEATTA_RESTAURANT;
const editFormDraftID = ONYXKEYS.FORMS.IEATTA_RESTAURANT_DRAFT;

function BaseEditRestaurantPage({restaurantId, restaurant, isNewModel, userLocation, currentUserPersonalDetails}) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const saveModel = (value) => {
        setIsLoading(editFormID, true);
        const {displayName, note} = value;
        let lastModel = restaurant;
        if (isNewModel === true) {
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

        const nextModel = ParseModelRestaurants.updateRestaurant({
            model: {...lastModel},
            nextDisplayName: displayName,
            nextExtraNote: note,
        });

        new FirebaseHelper()
            .setData({
                path: FBCollections.Restaurants,
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

    const validate = (values) => {
        const errors = {};
        if (values.displayName === '') {
            errors.displayName = 'edit.restaurant.form.displayName.error';
        }
        return errors;
    };

    return (
        <EditPageWithSections
            headerText={isNewModel ? translate('edit.restaurant.form.header.new') : translate('edit.restaurant.form.header.edit')}
            guidesCallTaskID={CONST.GUIDES_CALL_TASK_IDS.WORKSPACE_REIMBURSE}
            shouldSkipVBBACall
            shouldShowLoading={false}
            formID={editFormID}
            editFormDraftID={editFormDraftID}
        >
            {() => (
                <FormProvider
                    editFormUniqueId={restaurantId}
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
                                inputID="note"
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

BaseEditRestaurantPage.propTypes = propTypes;
BaseEditRestaurantPage.defaultProps = defaultProps;
BaseEditRestaurantPage.displayName = 'BaseEditRestaurantPage';

// eslint-disable-next-line rulesdir/no-useless-compose
export default compose(withCurrentUserPersonalDetails)(BaseEditRestaurantPage);

// export default BaseEditRestaurantPage;
