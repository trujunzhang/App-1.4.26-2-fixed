import React from 'react';
import {View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import type {DetailedPhotoItemProps} from '@components/Ieatta/detailedPage/common/photos/types';
import ImagePlaceholder from '@components/ImagePlaceholder';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';

function DetailedPhotosNativeView({photoRow}: DetailedPhotoItemProps) {
    const {photo} = photoRow;
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
