// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React from 'react';
import {View} from 'react-native';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import ImagePlaceholder from '@components/ImagePlaceholder';
import SelectCircle from '@components/SelectCircle';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IPhotoCarouselItemRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import TailwindColors from '@styles/tailwindcss/colors';

type PhotoCarouselItemProps = {
    carouselItem: IPhotoCarouselItemRow;
    /** Whether to use the Checkbox (multiple selection) instead of the Checkmark (single selection) */
    canSelectMultiple?: boolean;
    isSelected?: boolean;
};

// const debugPhotoIndex = true;
const debugPhotoIndex = false;

function PhotoCarouselItem({carouselItem, canSelectMultiple = true, isSelected = false}: PhotoCarouselItemProps) {
    const styles = useThemeStyles();
    const {photo: item, index = 0, photoWidth, photoHeight, containerWidth} = carouselItem;

    const renderDebug = () => {
        return (
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
        );
    };

    const renderSelect = () => {
        if (!isSelected) {
            return null;
        }

        return (
            <View style={[styles.pAbsolute, styles.r2, styles.t2]}>
                <SelectCircle
                    isChecked={isSelected ?? false}
                    selectCircleStyles={styles.ml0}
                />
            </View>
        );
    };

    return (
        <View
            style={[
                _.isUndefined(containerWidth) ? styles.w100 : {width: containerWidth},
                {
                    height: photoHeight,
                },
            ]}
        >
            <ImagePlaceholder
                sourceUri={item.originalUrl}
                style={[styles.w100, styles.h100]}
                imageType="svg"
                placeholder={Ieattaicons.LargeEmptyBizSkyline}
                width={photoWidth}
                height={photoHeight}
            />
            {debugPhotoIndex && renderDebug()}
            {canSelectMultiple && renderSelect()}
        </View>
    );
}

export default PhotoCarouselItem;
