import type {WindowDimensionsProps} from '@components/withWindowDimensions/types';
import type {IFBPhoto} from '@src/types/firebase';

type PhotoCarouselScrollViewProps = {
    relatedId: string;
    photoType: string;
    photos: IFBPhoto[];
    shouldShowMask?: boolean;
    photoWidth?: number;
    photoHeight?: number;
    onLeftArrowPress?: () => void;
    onRightArrowPress?: () => void;
};

type PhotoCarouselPageViewProps = WindowDimensionsProps &
    PhotoCarouselScrollViewProps & {
        // initialPhotoId: string;
        pageIndex: number;
        onPhotoChanged: (photo: IFBPhoto) => void;
    };

// export {propTypes, defaultProps, pagePropTypes, pageDefaultProps};
export type {PhotoCarouselPageViewProps, PhotoCarouselScrollViewProps};
