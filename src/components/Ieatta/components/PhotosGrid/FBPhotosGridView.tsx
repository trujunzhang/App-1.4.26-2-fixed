import _ from 'lodash';
import React, {useCallback} from 'react';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import type {PhotoType} from '@libs/Firebase/constant';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import type {IPhotoCarouselItemRow} from '@libs/Firebase/list/types/rows/photo';
import type {IFBPhoto, IFBSqlPhoto} from '@src/types/firebase';
import BasePhotosGridList from './BasePhotosGridList';
import type {FBPhotosGridListProps} from './types';

function FBPhotosGridView({relatedId, photoType, photos, ...otherProps}: FBPhotosGridListProps) {
    /**
     * Function which renders a row in the list
     *
     * @param {Object} params
     * @param {Object} params.item
     *
     * @return {Component}
     */
    const renderPhoto = useCallback(
        (item: IFBPhoto | IFBSqlPhoto, itemHeight: number) => {
            const carouselItem: IPhotoCarouselItemRow = {
                relatedId,
                photoType,
                photo: item as IFBPhoto,
                photoHeight: itemHeight,
            };

            return (
                <PageFlashListItemWithEvent
                    item={{
                        rowType: PageSection.PHOTO_GRID_ITEM_WITH_EVENT,
                        rowData: carouselItem,
                        rowKey: 'PageSection.PHOTO_GRID_ITEM_WITH_EVENT<Photo-Grid>',
                        modalName: 'photo',
                        pressType: RowPressableType.SECONDARY_PRESS,
                    }}
                />
            );
        },
        [photoType, relatedId],
    );

    return (
        <BasePhotosGridList
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            photos={photos}
            renderPhoto={renderPhoto}
        />
    );
}

export default FBPhotosGridView;
