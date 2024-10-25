import type {IPhotoItemRow, IPhotoRow} from '@libs/Firebase/list/types/rows/photo';
import type {IFBPhoto} from '@src/types/firebase';

type DetailedPhotoProps = {
    photoRow: IPhotoRow;
};

type DetailedPhotoItemProps = {
    photoRow: IPhotoItemRow;
    // photo: IFBPhoto;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    DetailedPhotoProps,
    DetailedPhotoItemProps,
};
