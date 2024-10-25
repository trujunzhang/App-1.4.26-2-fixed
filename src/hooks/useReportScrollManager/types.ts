import type {FlatListRefType} from '@src/expPages/home/ReportScreenContext';

type ReportScrollManagerData = {
    ref: FlatListRefType;
    scrollToIndex: (index: number, isEditing?: boolean) => void;
    scrollToBottom: () => void;
};

export default ReportScrollManagerData;
