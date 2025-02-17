import React from 'react';
import {View} from 'react-native';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import type {ZoomableViewProps} from '@components/Ieatta/components/PhotosPage/types';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
// eslint-disable-next-line import/no-named-as-default
import ImageViewer from '../../../../../../plugins/react-native-image-zoom-viewer/src';

type RenderImageProps = {
    source: {
        uri: string;
    };
};

function ZoomableView({imageUrls, defaultIndex, onPhotoIndexChanged, onClick}: ZoomableViewProps) {
    const styles = useThemeStyles();
    return (
        <ImageViewer
            imageUrls={imageUrls}
            renderImage={(props: RenderImageProps) => (
                <ImagePlaceholder
                    // key={props.uniqueId}
                    // key={currentPhoto?.uniqueId}
                    // key={props.url}
                    sourceUri={props.source.uri}
                    style={[styles.w100, styles.h100]}
                    imageType="png"
                    placeholder={Ieattaicons.PNGBusinessMediumSquare}
                />
            )}
            renderIndicator={(currentIndex?: number, allSize?: number) => (
                <View style={[styles.count]}>
                    <Text style={[styles.countText]}>{`${currentIndex}/${allSize}`}</Text>
                </View>
            )}
            backgroundColor="black"
            onChange={onPhotoIndexChanged}
            onClick={onClick}
            index={defaultIndex}
        />
    );
}

export default ZoomableView;
