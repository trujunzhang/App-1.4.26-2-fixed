import type {ZoomableRef} from '@likashefqet/react-native-image-zoom';
import {ZOOM_TYPE, Zoomable} from '@likashefqet/react-native-image-zoom';
import type {ForwardedRef} from 'react';
import React, {forwardRef} from 'react';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import type {ExpoImageZoomProps} from '@components/Ieatta/components/PhotosPage/types';
import ImagePlaceholder from '@components/ImagePlaceholder';
import useThemeStyles from '@hooks/useThemeStyles';

function ExpoImageZoom({uri, scale, minScale = 0.5, maxScale = 5, setIsZoomed, style, onClick}: ExpoImageZoomProps, ref: ForwardedRef<ZoomableRef>) {
    const styles = useThemeStyles();

    // eslint-disable-next-line rulesdir/prefer-early-return
    const onZoom = (zoomType?: ZOOM_TYPE) => {
        if (!zoomType || zoomType === ZOOM_TYPE.ZOOM_IN) {
            setIsZoomed(true);
        }
    };

    const onAnimationEnd = (finished?: boolean) => {
        if (finished) {
            setIsZoomed(false);
        }
    };

    return (
        <Zoomable
            ref={ref}
            minScale={minScale}
            maxScale={maxScale}
            doubleTapScale={3}
            isSingleTapEnabled
            isPanEnabled
            isDoubleTapEnabled={false}
            onInteractionStart={() => {
                console.log('onInteractionStart');
                onZoom();
            }}
            onInteractionEnd={() => console.log('onInteractionEnd')}
            onPanStart={() => console.log('onPanStart')}
            onPanEnd={() => console.log('onPanEnd')}
            onPinchStart={() => console.log('onPinchStart')}
            onPinchEnd={() => console.log('onPinchEnd')}
            onSingleTap={() => {
                onClick();
                console.log('onSingleTap');
            }}
            onDoubleTap={(zoomType) => {
                console.log('onDoubleTap', zoomType);
                onZoom(zoomType);
            }}
            onProgrammaticZoom={(zoomType) => {
                console.log('onZoom', zoomType);
                onZoom(zoomType);
            }}
            style={[styles.flex1, styles.w100, styles.h100, {overflow: 'hidden'}]}
            onResetAnimationEnd={(finished, values) => {
                console.log('onResetAnimationEnd', finished);
                console.log('lastScaleValue:', values?.SCALE.lastValue);
                onAnimationEnd(finished);
            }}
        >
            <ImagePlaceholder
                sourceUri={uri}
                style={[styles.flex1, styles.w100, styles.h100, {overflow: 'hidden'}]}
                resizeMode="contain"
                imageType="svg"
                placeholder={Ieattaicons.LargeEmptyBizSkyline}
            />
        </Zoomable>
    );
}

export default forwardRef(ExpoImageZoom);
