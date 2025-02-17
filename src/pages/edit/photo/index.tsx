/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {StackScreenProps} from '@react-navigation/stack';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {emptyPhotoTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBPhoto} from '@src/types/firebase';
import BaseEditPhotoPage from './BaseEditPhotoPage';

type EditPhotoNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.PHOTO>;

// eslint-disable-next-line @typescript-eslint/ban-types
type EditPhotoPageProps = EditPhotoNavigationProps & {};

function EditPhotoPage(props: EditPhotoPageProps) {
    const photoId = lodashGet(props.route, 'params.photoId', emptyPhotoTag);
    const restaurantId = lodashGet(props.route, 'params.restaurantId', emptyRestaurantTag);

    /**
      |--------------------------------------------------
      | Single(Photo)
      |--------------------------------------------------
      */
    const [photo, loadingForPhoto, errorForPhoto] = useDocumentDataOnce<IFBPhoto>(
        FirebaseQuery.querySingle({
            path: FBCollections.Photos,
            id: photoId,
        }),
    );

    return (
        <BaseEditPhotoPage
            key={lodashGet(photo, 'uniqueId', emptyPhotoTag)}
            photoId={photoId}
            photo={photo}
            isNewModel={photoId === CONST.IEATTA_EDIT_MODEL_NEW}
        />
    );
}

EditPhotoPage.displayName = 'EditPhotoPage';

export default EditPhotoPage;
