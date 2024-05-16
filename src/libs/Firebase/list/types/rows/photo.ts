import type {PhotoType} from '@libs/Firebase/constant';
import type {IFBEvent, IFBPhoto} from '@src/types/firebase';

// eslint-disable-next-line rulesdir/no-inline-named-export
type IPhotoRow = {
    relatedId: string;
    photoType: PhotoType;
};

// eslint-disable-next-line rulesdir/no-inline-named-export
type IWaiterRow = {
    event: IFBEvent | undefined;
    eventId: string;
    restaurantId: string;
};

type IPhotoCarouselItemRow = {
    photo: IFBPhoto;
    index: number;
    photoWidth: number;
    photoHeight: number;
} & IPhotoRow;

export type {IPhotoRow, IWaiterRow, IPhotoCarouselItemRow};
