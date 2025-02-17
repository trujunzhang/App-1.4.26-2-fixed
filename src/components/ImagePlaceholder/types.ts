/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import type {ImageLoadEventData, ImageResizeMode, ImageSourcePropType, ImageStyle, NativeSyntheticEvent, StyleProp, TextStyle} from 'react-native';
import {Image as RNImage, View} from 'react-native';
import type {SvgProps} from 'react-native-svg';
import ImageSVG from '@components/ImageSVG';
import type IconAsset from '@src/types/utils/IconAsset';

type ImagePlaceholderProps = {
    // placeholder: AvatarSource | ImageSourcePropType;
    // placeholder: any;
    placeholder: ImageSourcePropType | IconAsset;
    /** Event for when the image is fully loaded and returns the natural dimensions of the image */
    onLoad?: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
    imageType?: 'svg' | 'png';
    // source?: AvatarSource | ImageURISource | number | string;
    sourceUri: string | undefined;
    // style?: StyleProp<ImageStyle> | undefined;
    // style?: any;
    style?: StyleProp<ImageStyle>;
    /** How should the image fit within its container */
    resizeMode?: ImageResizeMode;

    /** The width of the image. */
    width?: number | `${number}%` | 'auto';

    /** The height of the image. */
    height?: number | `${number}%` | 'auto';
};

// eslint-disable-next-line import/prefer-default-export
export type {ImagePlaceholderProps};
