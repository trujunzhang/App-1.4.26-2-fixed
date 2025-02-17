import type {IPhotoItemRow, IPhotoRow} from '@libs/FirebaseIeatta/list/types/rows/photo';

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
