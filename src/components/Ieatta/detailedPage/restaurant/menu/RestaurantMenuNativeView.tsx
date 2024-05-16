import React from 'react';
import {Image as RNImage, View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import ImagePlaceholder from '@components/ImagePlaceholder';
import LinearGradient from '@components/LinearGradient';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import {calcRateForRestaurant} from '@libs/Firebase/utils/rate_utils';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import type {MenuViewProps} from './RestaurantMenuRow/types';

function RestaurantMenuNativeView({recipe}: MenuViewProps) {
    const styles = useThemeStyles();

    const renderPanel = (
        <View style={[styles.ph2, styles.pt1]}>
            <Text
                numberOfLines={1}
                style={[styles.textNormal, styles.textStrong]}
            >
                {recipe.displayName}
            </Text>
            <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
                {/* Left Container */}
                <RNImage
                    style={[
                        {
                            width: 92,
                            height: 13,
                        },
                        styles.mv3,
                    ]}
                    resizeMode="cover"
                    source={IeattaStars.STARS.SMALL[calcRateForRestaurant(recipe.rate, recipe.reviewCount)]}
                />
                {/* Right Container */}
                <Text
                    style={[
                        {
                            color: TailwindColors.orange500,
                        },
                    ]}
                >
                    {' '}
                    {`$${recipe.price}`}
                </Text>
            </View>
        </View>
    );

    return (
        <View
            style={[
                {
                    width: variables.menuInRestaurantMobileItemWidth,
                    height: variables.menuInRestaurantMobileItemHeight,
                },
            ]}
        >
            {/* Background Container */}
            <ImagePlaceholder
                sourceUri={recipe.originalUrl}
                style={[styles.w100, styles.h100]}
                imageType="png"
                placeholder={Expensicons.PNGBusinessMediumSquare}
            />
            {/*  Info panel   */}
            <View style={[styles.pAbsolute, styles.l0, styles.r0, styles.b0]}>
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                    start={{x: 0, y: 1}}
                    end={{x: 0, y: 1}}
                >
                    {renderPanel}
                </LinearGradient>
            </View>
        </View>
    );
}

export default RestaurantMenuNativeView;
