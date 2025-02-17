/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-restricted-imports */

/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import type {ImageLoadEventData, ImageResizeMode, ImageSourcePropType, ImageStyle, NativeSyntheticEvent, StyleProp, TextStyle} from 'react-native';
import {Image as RNImage, View} from 'react-native';
import type {SvgProps} from 'react-native-svg';
import ImageSVG from '@components/ImageSVG';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import Log from '@libs/Log';
import CONST from '@src/CONST';
import type IconAsset from '@src/types/utils/IconAsset';
// eslint-disable-next-line import/no-relative-packages
import {CachedImage} from '../../../plugins/react-native-expo-image-cache/src';
import type {ImagePlaceholderProps} from './types';

// import {CachedImage} from '../../../plugins/react-native-expo-image-cache/src';

function ImagePlaceholder(props: ImagePlaceholderProps) {
    const {placeholder, onLoad, imageType, sourceUri = '', width, height, ...restProps} = props;
    const styles = useThemeStyles();
    const {windowWidth, windowHeight} = useWindowDimensions();
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [showOriginalImage, setShowOriginalImage] = useState(true);

    const placeContent = (
        <View style={[styles.pAbsolute, styles.t0, styles.l0, styles.r0, styles.b0, {backgroundColor: 'transparent'}]}>
            {imageType === 'svg' ? (
                <View style={[styles.flexColumn, styles.w100, styles.h100, styles.alignItemsCenter, styles.justifyContentCenter]}>
                    <ImageSVG
                        src={placeholder as IconAsset}
                        // src={Expensicons.LargeEmptyBizSkyline}
                        width={width ?? windowWidth}
                        height={height ?? 300}
                    />
                </View>
            ) : (
                <RNImage
                    style={[styles.w100, styles.h100, restProps.style]}
                    resizeMode="cover"
                    source={placeholder as ImageSourcePropType}
                    // source={Expensicons.PNGBusinessMediumSquare}
                />
            )}
        </View>
    );

    if (sourceUri === undefined || sourceUri === null || sourceUri === '') {
        return placeContent;
    }

    const imageUri = (sourceUri || '').replace('http://res.cloudinary.com', 'https://res.cloudinary.com');

    // Log.info('');
    // Log.info('================================');
    // Log.info(`imgUri on the ImagePlaceholder: ${imageUri}`);
    // Log.info('================================');
    // Log.info('');

    const originalImageContent = (
        <CachedImage
            {...restProps}
            uri={imageUri}
            onLoad={(event: NativeSyntheticEvent<ImageLoadEventData>) => {
                setShowPlaceholder(false);
                if (props.onLoad) {
                    props.onLoad(event);
                }
            }}
            onError={() => {
                Log.info('');
                Log.info('================================');
                Log.info(`[ERROR] imgUri on the ImagePlaceholder on the mobile: ${imageUri}`);
                Log.info('================================');
                Log.info('');
                setShowOriginalImage(false);
                setShowPlaceholder(true);
            }}
        />
    );

    return (
        <>
            {showPlaceholder && placeContent}
            {showOriginalImage && originalImageContent}
        </>
    );
}

ImagePlaceholder.displayName = 'ImagePlaceholder';

export default ImagePlaceholder;
