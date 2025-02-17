/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {StackScreenProps} from '@react-navigation/stack';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {useCollectionOnce, useDocumentData} from 'react-firebase-hooks/firestore';
import {FBCollections, PhotoType} from '@libs/FirebaseIeatta/constant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import Variables from '@styles/variables';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBPhoto, IFBRestaurant} from '@src/types/firebase';
import BaseEditRestaurantPage from './BaseEditRestaurantPage';

type EditRestartNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.RESTAURANT>;

// eslint-disable-next-line @typescript-eslint/ban-types
type EditRestaurantPageProps = EditRestartNavigationProps & {};

function EditRestaurantPage(props: EditRestaurantPageProps) {
    const restaurantId = lodashGet(props.route, 'params.restaurantId', emptyRestaurantTag);
    /**
      |--------------------------------------------------
      | Single(Restaurant)
      |--------------------------------------------------
      */
    const [restaurant, loadingForRestaurant, errorForRestaurant] = useDocumentData<IFBRestaurant>(
        FirebaseQuery.querySingle({
            path: FBCollections.Restaurants,
            id: restaurantId,
        }),
    );

    /**
     |--------------------------------------------------
     | List(photos)
     |--------------------------------------------------
     */
    const [photosSnapshot, loader] = useCollectionOnce(
        FirebaseQuery.queryForPhotos({
            relatedId: restaurantId,
            photoType: PhotoType.Restaurant,
        }),
    );

    const photosInPage = photosSnapshot === undefined ? [] : _.map(photosSnapshot.docs, (item) => item.data() as IFBPhoto);

    // eslint-disable-next-line @lwc/lwc/no-async-await
    const onAfterSelectedCover = async (firebasePhotoId: string) => {};

    return (
        <BaseEditRestaurantPage
            key={lodashGet(restaurant, 'uniqueId', emptyRestaurantTag)}
            initialPanelWidth={Variables.sideBarWidth - 40 * 2}
            restaurantId={restaurantId}
            restaurant={restaurant}
            isNewModel={restaurantId === CONST.IEATTA_EDIT_MODEL_NEW}
            photosInPage={photosInPage}
            onAfterSelectedCover={onAfterSelectedCover}
        />
    );
}

EditRestaurantPage.displayName = 'EditRestaurantPage';

export default EditRestaurantPage;
