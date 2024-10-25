import type {StackScreenProps} from '@react-navigation/stack';
import lodashGet from 'lodash/get';
import React from 'react';
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import {FBCollections} from '@libs/Firebase/constant';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import {emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBRestaurant} from '@src/types/firebase';
import BaseEditRestaurantPage from './BaseEditRestaurantPage';

type EditRestartNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.RESTAURANT>;

type EditRestaurantPageProps = EditRestartNavigationProps & {};

function EditRestaurantPage(props: EditRestaurantPageProps) {
    const restaurantId = lodashGet(props.route, 'params.restaurantId', emptyRestaurantTag);
    /**
      |--------------------------------------------------
      | Single(Restaurant)
      |--------------------------------------------------
      */
    const [restaurant, loadingForRestaurant, errorForRestaurant] = useDocumentDataOnce<IFBRestaurant>(
        FirebaseQuery.querySingle({
            path: FBCollections.Restaurants,
            id: restaurantId,
        }),
    );

    return (
        <BaseEditRestaurantPage
            key={lodashGet(restaurant, 'uniqueId', emptyRestaurantTag)}
            restaurantId={restaurantId}
            restaurant={restaurant}
            isNewModel={restaurantId === CONST.IEATTA_EDIT_MODEL_NEW}
        />
    );
}

EditRestaurantPage.displayName = 'EditRestaurantPage';

export default EditRestaurantPage;
