import {useQuery} from '@realm/react';
import lodashGet from 'lodash/get';
import React from 'react';
import {View} from 'react-native';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import LocalPhotosGridView from '@components/Ieatta/components/PhotosGrid/LocalPhotosGridView';
import ScreenWrapper from '@components/ScreenWrapper';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import CONST from '@src/CONST';
import type {IFBSqlPhoto} from '@src/types/firebase';
import type {IEATTALocalPhotosPageProps} from './types';

function IEATTALocalPhotosPage({route}: IEATTALocalPhotosPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const pageId = lodashGet(route, 'params.pageId', CONST.IEATTA_LOCAL_PHOTOS_SHOW_ALL);

    const sqlPhotos = useQuery(RealmCollections.SqlPhotos, RealmQuery.queryForRealmSqlPhotos(pageId));
    const sqlPhotosInPage: IFBSqlPhoto[] = toRealmModelList<IFBSqlPhoto>(sqlPhotos);

    return (
        <ScreenWrapper testID={IEATTALocalPhotosPage.displayName}>
            <View style={[styles.flex1]}>
                <HeaderWithBackButton title={translate('photos.local.title')} />
                <LocalPhotosGridView photos={sqlPhotosInPage} />;
            </View>
        </ScreenWrapper>
    );
}

IEATTALocalPhotosPage.displayName = 'IEATTALocalPhotosPage';

export default IEATTALocalPhotosPage;
