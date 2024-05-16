import React from 'react';
import {Image as RNImage, View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import type {PhotoViewProps} from '@components/Ieatta/detailedPage/common/photo/types';
import ImagePlaceholder from '@components/ImagePlaceholder';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';

function DetailedPhotosNativeView({photo}: PhotoViewProps) {
    const styles = useThemeStyles();

    return (
        <View
            style={[
                {
                    width: variables.photoInRestaurantMobileItemWidth,
                    height: variables.photoInRestaurantMobileItemHeight,
                },
            ]}
        >
            {/* Background Container */}
            <ImagePlaceholder
                sourceUri={photo.originalUrl}
                style={[styles.w100, styles.h100]}
                imageType="png"
                placeholder={Expensicons.PNGBusinessMediumSquare}
            />
        </View>
    );
}

export default DetailedPhotosNativeView;
