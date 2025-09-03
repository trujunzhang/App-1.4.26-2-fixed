import React, {useCallback} from 'react';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import {FBModelNames} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {IPhotoCarouselItemRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import type {IFBPhoto, IFBSqlPhoto} from '@src/types/firebase';
import BasePhotosGridList from './BasePhotosGridList';
import type {FBPhotosGridListProps} from './types';

function FBPhotosGridView({relatedId, photoType, photos, ...otherProps}: FBPhotosGridListProps) {
    const generatePageRow = (item: IFBPhoto | IFBSqlPhoto, itemWidth: number, itemHeight: number): IPageRow => {
        const carouselItem: IPhotoCarouselItemRow = {
            relatedId,
            photoType,
            photo: item as IFBPhoto,
            containerWidth: undefined,
            photoWidth: itemWidth,
            photoHeight: itemHeight,
        };

        return {
            rowType: PageSection.PHOTO_GRID_ITEM_WITH_EVENT,
            rowData: carouselItem,
            rowKey: 'PageSection.PHOTO_GRID_ITEM_WITH_EVENT<Photo-Grid>',
            modalName: FBModelNames.Photos,
            pressType: RowPressableType.SECONDARY_PRESS,
        };
    };

    return (
        <BasePhotosGridList
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            photos={photos}
            generatePageRow={generatePageRow}
        />
    );
}

export default FBPhotosGridView;
