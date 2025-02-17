/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';

export type ModalNames =
    | 'unknown'
    | 'edit-button'
    | 'display-name'
    | 'restaurant'
    | 'review'
    | 'review-action-bar'
    | 'review-logged-user-bar'
    | 'event'
    | 'ordered user'
    | 'waiter'
    | 'waiter-row'
    | 'photo'
    | 'photo-row'
    | 'photo-carousel'
    | 'recipe'
    | 'ordered recipe'
    | 'address'
    | 'title'
    | 'skeleton'
    | 'empty'
    | 'header';

export type IPageRow = {
    rowKey: string;
    rowType: PageSection;
    rowData: any;
    modalName: ModalNames;
    pressType: RowPressableType;
};
