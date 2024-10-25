import type {StackScreenProps} from '@react-navigation/stack';
import {useQuery} from '@realm/react';
import lodashGet from 'lodash/get';
import React from 'react';
import PhotosPageLayout from '@components/Ieatta/photos/PhotosPageLayout';
import {PhotoType} from '@libs/Firebase/constant';
import type {AuthScreensParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBPhoto} from '@src/types/firebase';
import PhotosGridSmallPage from './PhotosGridSmallPage';

type FBPhotosGridViewProps = StackScreenProps<AuthScreensParamList, typeof SCREENS.CENTER_IEATTA.PHOTO_GRID_VIEW>;

function FBPhotosGridView({route}: FBPhotosGridViewProps) {
    const relatedId = lodashGet(route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const photoType = lodashGet(route, 'params.photoType', PhotoType.Unknown);

    const photos = useQuery(RealmCollections.Photos, RealmQuery.queryForRealmPhotos({relatedId, photoType}));
    const photosInPage: IFBPhoto[] = toRealmModelList<IFBPhoto>(photos);

    return (
        <PhotosPageLayout shouldShowNotFoundPage={false}>
            <PhotosGridSmallPage
                relatedId={relatedId}
                photoType={photoType}
                photosInPage={photosInPage}
            />
        </PhotosPageLayout>
    );
}

export default FBPhotosGridView;
