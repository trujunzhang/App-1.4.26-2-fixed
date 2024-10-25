import React from 'react';
import {Image as RNImage, View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import {calcRateForRestaurant} from '@libs/Firebase/utils/rate_utils';
import variables from '@styles/variables';
import type {MenuViewProps} from './RestaurantMenuRow/types';

function RestaurantMenuWebView({recipe}: MenuViewProps) {
    const styles = useThemeStyles();

    const renderPhoto = (
        <View style={[styles.flex1]}>
            <ImagePlaceholder
                sourceUri={recipe.originalUrl}
                style={[styles.w100, styles.h100]}
                imageType="png"
                placeholder={Expensicons.PNGBusinessMediumSquare}
            />
            {/*  Info panel   */}
            <View
                style={[
                    styles.pAbsolute,
                    styles.r0,
                    styles.b0,
                    styles.justifyContentCenter,
                    styles.alignItemsCenter,
                    {
                        width: 100,
                        height: 100,
                        backgroundColor: '#0000004d',
                    },
                ]}
            >
                <Text style={[styles.textXXLarge, styles.textStrong, styles.textWhite]}> {`$${recipe.price}`}</Text>
            </View>
        </View>
    );

    const renderInfo = (
        <View style={[styles.flexColumn]}>
            <Text
                numberOfLines={1}
                style={[styles.textLarge, styles.textStrong]}
            >
                {recipe.displayName}
            </Text>
            <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
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
                <Text style={[]}> {`${recipe.reviewCount} reviews`}</Text>
            </View>
        </View>
    );

    return (
        <View
            style={[
                styles.flexColumn,
                styles.gap2,
                styles.restaurantMenuWebItem,
                {
                    // borderWidth: 5,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
            ]}
        >
            {renderPhoto}
            <View
                style={[
                    {
                        height: 50,
                        // backgroundColor: 'red'
                    },
                ]}
            >
                {renderInfo}
            </View>
        </View>
    );
}

export default RestaurantMenuWebView;
