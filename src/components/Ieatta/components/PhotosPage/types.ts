import type {ZoomableProps} from '@likashefqet/react-native-image-zoom';
import type {SharedValue} from 'react-native-reanimated';

type ImageInfo = {
    url: string;
};

type ZoomableViewProps = {
    /**
     * An array of image urls
     */
    imageUrls: ImageInfo[];

    /**
     * Default index
     */
    defaultIndex: number;

    onPhotoIndexChanged: (index?: number) => void;
    onClick: () => void;
};

type PhotosPageViewProps = ZoomableViewProps & {
    /**
     * Render indicator
     */
    renderIndicator: (currentIndex?: number, allSize?: number) => React.ReactNode;
};

type ExpoImageZoomProps = {
    uri: string;
    scale?: SharedValue<number>;
    minScale?: number;
    maxScale?: number;
    // ref: ForwardedRef<ZoomableRef>;
    setIsZoomed: (value: boolean) => void;
    style?: ZoomableProps['style'];
    onClick: () => void;
};

// eslint-disable-next-line import/prefer-default-export
export type {ZoomableViewProps, PhotosPageViewProps, ImageInfo, ExpoImageZoomProps};
