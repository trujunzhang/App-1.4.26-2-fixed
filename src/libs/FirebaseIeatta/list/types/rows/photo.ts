import type {PhotoType} from '@libs/FirebaseIeatta/constant';
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

type OnCarouselItemPressed = (photo: IFBPhoto, isSelected: boolean) => void;

type IPhotoCarouselItemRow = {
    photo: IFBPhoto;
    containerWidth?: number;
    photoWidth?: number;
    photoHeight: number;
    index?: number;
    section?: {
        isSelected: boolean;
        onItemPressed: OnCarouselItemPressed;
    };
} & IPhotoRow;

type IPhotoLocalItemRow = {
    photo: IFBSqlPhoto;
    photoWidth?: number;
    photoHeight: number;
};

export type {IPhotoRow, IPhotoItemRow, IWaiterRow, IPhotoCarouselItemRow, IPhotoLocalItemRow, OnCarouselItemPressed};
