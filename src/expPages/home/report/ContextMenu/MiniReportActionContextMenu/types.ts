import type {BaseReportActionContextMenuProps} from '@expPages/home/report/ContextMenu/BaseReportActionContextMenu';

type MiniReportActionContextMenuProps = Omit<BaseReportActionContextMenuProps, 'isMini'> & {
    /** Should the reportAction this menu is attached to have the appearance of being grouped with the previous reportAction? */
    displayAsGroup?: boolean;
};

export default MiniReportActionContextMenuProps;
