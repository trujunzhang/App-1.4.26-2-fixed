/* eslint-disable @typescript-eslint/no-explicit-any */
import type {PageSection, RowPressableType} from '@libs/Firebase/list/constant';

// eslint-disable-next-line rulesdir/no-inline-named-export
export type IPageRow = {
    rowKey: string;
    rowType: PageSection;
    rowData: any;
    pressType: RowPressableType;
};
