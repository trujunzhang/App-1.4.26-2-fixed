/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {useQuery} from '@realm/react';
import lodashGet from 'lodash/get';
import React from 'react';
import {View} from 'react-native';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import BasePhotosGridList from '@components/Ieatta/components/PhotosGrid/BasePhotosGridList';
import ScreenWrapper from '@components/ScreenWrapper';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {IPhotoLocalItemRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import CONST from '@src/CONST';
import type {IFBPhoto, IFBSqlPhoto} from '@src/types/firebase';
import type {IEATTALocalPhotosPageProps} from './types';

function IEATTALocalPhotosPage({route}: IEATTALocalPhotosPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const pageId = lodashGet(route, 'params.pageId', CONST.IEATTA_LOCAL_PHOTOS_SHOW_ALL);

    const sqlPhotos = useQuery(RealmCollections.SqlPhotos, RealmQuery.queryForRealmSqlPhotos(pageId));
    const sqlPhotosInPage: IFBSqlPhoto[] = toRealmModelList<IFBSqlPhoto>(sqlPhotos);

    const generatePageRow = (item: IFBPhoto | IFBSqlPhoto, itemWidth: number, itemHeight: number): IPageRow => {
        const localItem: IPhotoLocalItemRow = {
            photo: item as IFBSqlPhoto,
            photoWidth: itemWidth,
            photoHeight: itemHeight,
        };
        return {
            rowType: PageSection.PHOTO_GRID_LOCAL_ITEM,
            rowData: localItem,
            rowKey: 'PageSection.PHOTO_GRID_LOCAL_ITEM<Photo-Grid>',
            modalName: 'photo',
            pressType: RowPressableType.NO_EVENT,
        };
    };

    const renderEmpty = () => {
        return (
            <View style={[styles.flex1, styles.flexColumn, styles.w100, styles.h100, styles.justifyContentCenter, styles.alignItemsCenter]}>
                <Text style={[styles.lg]}>{translate('photos.local.noPhotos')}</Text>
            </View>
        );
    };

    return (
        <ScreenWrapper testID={IEATTALocalPhotosPage.displayName}>
            <View style={[styles.flex1]}>
                <HeaderWithBackButton title={translate('photos.local.title')} />
                {sqlPhotosInPage.length === 0 ? (
                    renderEmpty()
                ) : (
                    <BasePhotosGridList
                        photos={sqlPhotosInPage}
                        generatePageRow={generatePageRow}
                    />
                )}
            </View>
        </ScreenWrapper>
    );
}

IEATTALocalPhotosPage.displayName = 'IEATTALocalPhotosPage';

export default IEATTALocalPhotosPage;
