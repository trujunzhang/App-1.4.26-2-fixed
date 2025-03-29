/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-restricted-imports */

/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import type {ImageLoadEventData, ImageResizeMode, ImageSourcePropType, ImageStyle, NativeSyntheticEvent, StyleProp, TextStyle} from 'react-native';
import {Image as RNImage, View} from 'react-native';
import type {SvgProps} from 'react-native-svg';
import Image from '@components/Image';
import type {ImageOnLoadEvent} from '@components/Image/types';
import ImageSVG from '@components/ImageSVG';
import useThemeStyles from '@hooks/useThemeStyles';
import Log from '@libs/Log';
import type IconAsset from '@src/types/utils/IconAsset';
import type {ImagePlaceholderProps} from './types';

function ImagePlaceholder(props: ImagePlaceholderProps) {
    const {placeholder, onLoad, imageType, sourceUri = '', ...restProps} = props;
    const styles = useThemeStyles();
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [showOriginalImage, setShowOriginalImage] = useState(true);

    const placeContent = (
        <View style={[styles.pAbsolute, styles.t0, styles.l0, styles.r0, styles.b0, {backgroundColor: 'transparent'}]}>
            {imageType === 'svg' ? (
                <ImageSVG
                    src={placeholder as IconAsset}
                    // src={Expensicons.LargeEmptyBizSkyline}
                />
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

    const imageKey = imageUri === '' ? 'imagePlaceholder' : imageUri;

    const originalImageContent = (
        <Image
            {...restProps}
            key={imageKey}
            source={{uri: imageUri}}
            onLoad={(event: ImageOnLoadEvent) => {
                setShowPlaceholder(false);
            }}
            onError={() => {
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
