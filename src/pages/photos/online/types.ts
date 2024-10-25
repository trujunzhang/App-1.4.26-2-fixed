import type {PhotoType} from '@libs/Firebase/constant';
import type {IFBPhoto} from '@src/types/firebase';

type TopModalInfoPanelProps = {
    relatedId: string;
    photoType: PhotoType | string;
};
type PhotosGridPageProps = {
    relatedId: string;
    photoType: PhotoType | string;
    photosInPage: IFBPhoto[];
};
type PhotosPagePageProps = PhotosGridPageProps & {
    pageIndex: number;
    // initialPhotoId: string;
};

export type {TopModalInfoPanelProps, PhotosGridPageProps, PhotosPagePageProps};
