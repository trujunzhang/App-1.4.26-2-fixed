import type {StackScreenProps} from '@react-navigation/stack';
import {useObject} from '@realm/react';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {emptyPhotoTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBPhoto} from '@src/types/firebase';
import BaseEditPhotoPage from './BaseEditPhotoPage';

type EditPhotoNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.PHOTO>;

// eslint-disable-next-line @typescript-eslint/ban-types
type EditPhotoPageProps = EditPhotoNavigationProps & {};

function EditPhotoPage(props: EditPhotoPageProps) {
    const photoId = lodashGet(props.route, 'params.photoId', emptyPhotoTag);

    /**
      |--------------------------------------------------
      | Single(Photo)
      |--------------------------------------------------
      */
    const photoInRealm = useObject<IFBPhoto>(RealmCollections.Photos, photoId);
    const photo: IFBPhoto | undefined = _.isNull(photoInRealm) === false ? (photoInRealm as IFBPhoto) : undefined;

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
