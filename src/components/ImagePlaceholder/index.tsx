/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-restricted-imports */

/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {Image as RNImage, View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import Image from '@components/Image';
import ImageSVG from '@components/ImageSVG';
import useThemeStyles from '@hooks/useThemeStyles';
import Log from '@libs/Log';

type ImagePlaceholderProps = {
    // placeholder: AvatarSource | ImageSourcePropType;
    placeholder: any;
    onLoad?: () => void;
    imageType?: 'svg' | 'png';
    // source?: AvatarSource | ImageURISource | number | string;
    sourceUri: string | undefined;
    // style?: StyleProp<ImageStyle> | undefined;
    style?: any;
};

function ImagePlaceholder(props: ImagePlaceholderProps) {
    const {placeholder, onLoad, imageType, sourceUri = '', ...restProps} = props;
    const styles = useThemeStyles();
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [showOriginalImage, setShowOriginalImage] = useState(true);

    const placeContent = (
        <View style={[styles.pAbsolute, styles.t0, styles.l0, styles.r0, styles.b0, {backgroundColor: 'transparent'}]}>
            {imageType === 'svg' ? (
                <ImageSVG
                    src={placeholder}
                    // src={Expensicons.LargeEmptyBizSkyline}
                />
            ) : (
                <RNImage
                    style={[styles.w100, styles.h100, restProps.style]}
                    resizeMode="cover"
                    source={placeholder}
                    // source={Expensicons.PNGBusinessMediumSquare}
                />
            )}
        </View>
    );

    const imageUri = sourceUri.replace('http://res.cloudinary.com', 'https://res.cloudinary.com');

    // Log.info('');
    // Log.info('================================');
    // Log.info(`imgUri on the ImagePlaceholder: ${imageUri}`);
    // Log.info('================================');
    // Log.info('');

    const originalImageContent = (
        <Image
            {...restProps}
            source={{uri: imageUri}}
            onLoad={() => {
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
