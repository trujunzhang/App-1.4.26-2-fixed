/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {Image as RNImage, View} from 'react-native';
import Icon from '@components/Icon';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Text from '@components/Text';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import {calcRateForRestaurant} from '@libs/FirebaseIeatta/utils/rate_utils';
import variables from '@styles/variables';
import type {RestaurantItemProps} from './type';

function RestaurantRowView({rowData, hovered}: RestaurantItemProps) {
    const {restaurant, isFocused} = rowData;
    const styles = useThemeStyles();
    const theme = useTheme();

    return (
        <View
            style={[
                styles.rowContainerInSidebar,
                styles.backgroundComponentBG,
                styles.flexRow,
                isFocused ? styles.sidebarLinkActive : null,
                hovered && !isFocused ? styles.sidebarLinkHover : null,
            ]}
        >
            <View style={[styles.h100, {width: variables.restaurantRowViewWidth}]}>
                <ImagePlaceholder
                    sourceUri={restaurant.originalUrl}
                    style={[styles.w100, styles.h100]}
                    imageType="png"
                    placeholder={Ieattaicons.PNGBusinessMediumSquare}
                />
            </View>
            <View style={[styles.p3, styles.gap2]}>
                <Text style={[styles.base, styles.fontSemiBold]}>{restaurant.displayName}</Text>
                <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                    <Text style={[styles.streetTextInRestaurantItem, styles.colorTextSupporting]}>{restaurant.locality}</Text>
                    <Icon
                        width={variables.iconSizeLarge}
                        height={variables.iconSizeLarge}
                        src={Ieattaicons.MapMarker}
                        fill={theme.textSupporting}
                    />
                    <Text style={[styles.streetTextInRestaurantItem, styles.colorTextSupporting]}>{restaurant.route}</Text>
                </View>
                <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                    <RNImage
                        style={styles.ratingIconInRestaurantItem}
                        source={IeattaStars.STARS.SMALL[calcRateForRestaurant(restaurant.rate, restaurant.reviewCount)]}
                    />
                    <Text style={[styles.sm, styles.fontNormal, styles.textSupporting]}>{`${restaurant.reviewCount} Reviews`}</Text>
                </View>
            </View>
        </View>
    );
}

RestaurantRowView.displayName = 'RestaurantRowView';

export default React.memo(RestaurantRowView);
