import type {PhotoType} from '@libs/Firebase/constant';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import type {IPhotoRow, IWaiterRow} from '@libs/Firebase/list/types/rows/photo';
import type {IFBEvent} from '@src/types/firebase';

/**
 |--------------------------------------------------
 | Photos
 |--------------------------------------------------
 */
const buildPhotos = (isSmallScreenWidth: boolean, relatedId: string, photoType: PhotoType) => {
    if (!isSmallScreenWidth) {
        return [];
    }
    const photoItem: IPhotoRow = {
        relatedId,
        photoType,
    };
    return [
        {
            rowType: PageSection.SECTION_PHOTO_TITLE,
            rowData: photoItem,
            rowKey: 'PageSection.SECTION_PHOTO_TITLE',
            pressType: RowPressableType.NO_EVENT,
        },
        {
            rowType: PageSection.SECTION_PHOTO_ROW,
            rowData: photoItem,
            rowKey: 'PageSection.SECTION_PHOTO_ROW',
            pressType: RowPressableType.NO_EVENT,
        },
    ];
};

/**
 |--------------------------------------------------
 | Waiters
 |--------------------------------------------------
 */
const buildWaiters = (isSmallScreenWidth: boolean, event: IFBEvent) => {
    const waiterItem: IWaiterRow = {
        event,
        eventId: event.uniqueId,
        restaurantId: event.restaurantId,
    };
    return [
        {
            rowType: PageSection.EVENT_WAITER_TITLE,
            rowData: waiterItem,
            rowKey: 'PageSection.EVENT_WAITER_TITLE',
            pressType: RowPressableType.NO_EVENT,
        },
        {
            rowType: PageSection.EVENT_WAITER_ROW,
            rowData: waiterItem,
            rowKey: 'PageSection.EVENT_WAITER_ROW',
            pressType: RowPressableType.NO_EVENT,
        },
    ];
};

export {
    // eslint-disable-next-line import/prefer-default-export
    buildPhotos,
    buildWaiters,
};
