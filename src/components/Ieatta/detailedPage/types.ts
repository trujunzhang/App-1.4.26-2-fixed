import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';

type PageFlashListItemEventProps = {
    pageRow: IPageRow;
};

type PageFlashListItemProps = {
    pageRow: IPageRow;
    hovered: boolean;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    PageFlashListItemEventProps,
    PageFlashListItemProps,
};
