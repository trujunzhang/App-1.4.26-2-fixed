import _ from 'lodash';
import React, {useCallback} from 'react';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import type {IPhotoLocalItemRow} from '@libs/Firebase/list/types/rows/photo';
import type {IFBPhoto, IFBSqlPhoto} from '@src/types/firebase';
import BasePhotosGridList from './BasePhotosGridList';
import type {CommonPhotosGridListProps} from './types';

function LocalPhotosGridView({photos}: CommonPhotosGridListProps) {
    /**
     * Function which renders a row in the list
     *
     * @param {Object} params
     * @param {Object} params.item
     *
     * @return {Component}
     */
    const renderPhoto = useCallback((item: IFBPhoto | IFBSqlPhoto, itemHeight: number) => {
        const localItem: IPhotoLocalItemRow = {
            photo: item as IFBSqlPhoto,
            photoHeight: itemHeight,
        };

        return (
            <PageFlashListItemWithEvent
                item={{
                    rowType: PageSection.PHOTO_GRID_LOCAL_ITEM,
                    rowData: localItem,
                    rowKey: 'PageSection.PHOTO_GRID_LOCAL_ITEM<Photo-Grid>',
                    modalName: 'photo',
                    pressType: RowPressableType.NO_EVENT,
                }}
            />
        );
    }, []);

    return (
        <BasePhotosGridList
            photos={photos}
            renderPhoto={renderPhoto}
        />
    );
}

export default LocalPhotosGridView;
