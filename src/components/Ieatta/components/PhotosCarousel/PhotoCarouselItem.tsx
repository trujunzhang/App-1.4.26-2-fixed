import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IPhotoCarouselItemRow} from '@libs/Firebase/list/types/rows/photo';
import TailwindColors from '@styles/tailwindcss/colors';

type PhotoCarouselItemProps = {
    carouselItem: IPhotoCarouselItemRow;
};

// const debugPhotoIndex = true;
const debugPhotoIndex = false;

function PhotoCarouselItem({carouselItem}: PhotoCarouselItemProps) {
    const styles = useThemeStyles();
    const {photo: item, index, photoWidth, photoHeight} = carouselItem;

    return (
        <View
            style={[
                {
                    width: photoWidth,
                    height: photoHeight,
                },
            ]}
        >
            <ImagePlaceholder
                sourceUri={item.originalUrl}
                style={[styles.w100, styles.h100]}
                imageType="svg"
                placeholder={Expensicons.LargeEmptyBizSkyline}
            />
            {debugPhotoIndex && (
                <View style={[styles.pAbsolute, styles.l0, styles.t0]}>
                    <Text
                        style={[
                            {
                                color: TailwindColors.red500,
                                fontSize: 48,
                            },
                            styles.ml4,
                            styles.mt4,
                        ]}
                    >
                        {index + 1}
                    </Text>
                </View>
            )}
        </View>
    );
}

export default PhotoCarouselItem;
