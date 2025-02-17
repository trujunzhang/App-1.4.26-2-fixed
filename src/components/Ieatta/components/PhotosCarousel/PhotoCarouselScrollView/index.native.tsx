import type {PhotoCarouselScrollViewProps} from '@components/Ieatta/components/PhotosCarousel/types';
import variables from '@styles/variables';

function PhotoCarouselScrollView({
    relatedId,
    photoType,
    photos,
    shouldShowMask = false,
    photoWidth = variables.detailedHeaderPhotoCarouselItemWidth,
    photoHeight = variables.detailedHeaderPhotoCarouselItemHeight,
    onLeftArrowPress = () => {},
    onRightArrowPress = () => {},
}: PhotoCarouselScrollViewProps) {
    return null;
}

export default PhotoCarouselScrollView;
