import type {IPageRow} from '@libs/Firebase/list/types/page-row';

type PageFlashListItemEventProps = {
    item: IPageRow;
};

type PageFlashListItemProps = {
    item: IPageRow;
    hovered: boolean;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    PageFlashListItemEventProps,
    PageFlashListItemProps,
};
