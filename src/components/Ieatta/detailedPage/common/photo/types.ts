import type {IPhotoRow} from '@libs/Firebase/list/types/rows/photo';
import type {IFBPhoto} from '@src/types/firebase';

type DetailedPhotoProps = {
    photoRow: IPhotoRow;
};

type PhotoViewProps = {
    photo: IFBPhoto;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    DetailedPhotoProps,
    PhotoViewProps,
};
