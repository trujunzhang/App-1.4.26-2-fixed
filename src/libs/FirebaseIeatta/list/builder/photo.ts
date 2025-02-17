import type {PhotoType} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {IPhotoRow, IWaiterRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import type {IFBEvent} from '@src/types/firebase';

/**
 |--------------------------------------------------
 | Photos
 |--------------------------------------------------
 */
const buildPhotos = (isSmallScreenWidth: boolean, relatedId: string, photoType: PhotoType): IPageRow[] => {
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
            modalName: 'title',
            pressType: RowPressableType.NO_EVENT,
        },
        {
            rowType: PageSection.SECTION_PHOTO_ROW,
            rowData: photoItem,
            rowKey: 'PageSection.SECTION_PHOTO_ROW',
            modalName: 'photo-row',
            pressType: RowPressableType.NO_EVENT,
        },
    ];
};

/**
 |--------------------------------------------------
 | Waiters
 |--------------------------------------------------
 */
const buildWaiters = (isSmallScreenWidth: boolean, event: IFBEvent): IPageRow[] => {
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
            modalName: 'title',
            pressType: RowPressableType.NO_EVENT,
        },
        {
            rowType: PageSection.EVENT_WAITER_ROW,
            rowData: waiterItem,
            rowKey: 'PageSection.EVENT_WAITER_ROW',
            modalName: 'waiter-row',
            pressType: RowPressableType.NO_EVENT,
        },
    ];
};

export {buildPhotos, buildWaiters};
