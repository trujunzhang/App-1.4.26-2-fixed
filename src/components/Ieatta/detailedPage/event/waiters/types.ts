import type {IWaiterRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import type {IFBPhoto} from '@src/types/firebase';

type WaitersRowInEventProps = {
    waiterRow: IWaiterRow;
};

type WaiterViewProps = {
    photo: IFBPhoto;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    WaitersRowInEventProps,
    WaiterViewProps,
};
