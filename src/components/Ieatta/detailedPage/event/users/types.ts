import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {IUserInEventRow} from '@libs/FirebaseIeatta/list/types/rows/event';

type OrderedUserViewProps = {
    pageRow: IPageRow;
    rowData: IUserInEventRow;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    OrderedUserViewProps,
};
