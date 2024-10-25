import type {PhotoType} from '@libs/Firebase/constant';
import type {IFBEvent, IFBPhoto, IFBSqlPhoto} from '@src/types/firebase';

// eslint-disable-next-line rulesdir/no-inline-named-export
type IPhotoRow = {
    relatedId: string;
    photoType: PhotoType | string;
};

type IPhotoItemRow = IPhotoRow & {
    photo: IFBPhoto;
};

// eslint-disable-next-line rulesdir/no-inline-named-export
type IWaiterRow = {
    event: IFBEvent | undefined;
    eventId: string;
    restaurantId: string;
};

type IPhotoCarouselItemRow = {
    photo: IFBPhoto;
    photoWidth?: number;
    photoHeight: number;
    index?: number;
} & IPhotoRow;

type IPhotoLocalItemRow = {
    photo: IFBSqlPhoto;
    photoWidth?: number;
    photoHeight: number;
};

export type {IPhotoRow, IPhotoItemRow, IWaiterRow, IPhotoCarouselItemRow, IPhotoLocalItemRow};
