import type {StackScreenProps} from '@react-navigation/stack';
import type {PhotoType} from '@libs/FirebaseIeatta/constant';
import type {AuthScreensParamList} from '@libs/Navigation/types';
import type SCREENS from '@src/SCREENS';
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

type FBPhotosPageViewProps = StackScreenProps<AuthScreensParamList, typeof SCREENS.CENTER_IEATTA.PHOTO_PAGE_VIEW>;

type PhotosPagePageProps = PhotosGridPageProps &
    FBPhotosPageViewProps & {
        pageIndex: number;
        // initialPhotoId: string;
    };

export type {TopModalInfoPanelProps, PhotosGridPageProps, PhotosPagePageProps};
