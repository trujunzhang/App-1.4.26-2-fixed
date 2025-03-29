/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, {useMemo} from 'react';
import {Image as RNImage, View} from 'react-native';
import Icon from '@components/Icon';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Text from '@components/Text';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {calcRateForRestaurant} from '@libs/FirebaseIeatta/utils/rate_utils';
import variables from '@styles/variables';
import type {RestaurantItemProps} from './type';

function RestaurantCardView({rowData, hovered}: RestaurantItemProps) {
    const {restaurant, isFocused} = rowData;
    const {isMediumScreenWidth} = useResponsiveLayout();
    const {windowWidth} = useWindowDimensions();
    const isTabletScreenWidth = false;
    const styles = useThemeStyles();
    const theme = useTheme();

    const cardHeight = useMemo(() => {
        return (windowWidth * 9) / 10;
    }, [windowWidth]);

    return (
        <View
            style={[
                styles.shadowXl,
                styles.restaurantCardContainer,
                styles.backgroundComponentBG,
                hovered && !isFocused ? styles.sidebarLinkHover : null,
                styles.w100,
                {
                    height: cardHeight,
                },
            ]}
        >
            <View style={[styles.flex1]}>
                <ImagePlaceholder
                    sourceUri={restaurant.originalUrl}
                    style={[styles.w100, styles.h100]}
                    imageType="png"
                    placeholder={Ieattaicons.PNGBusinessMediumSquare}
                />
            </View>
            <View style={[styles.ph3, styles.pv4]}>
                <Text style={[styles.lg, styles.textStrong]}>{restaurant.displayName}</Text>
                <View style={[styles.flexRow, styles.alignItemsCenter, styles.mv2, styles.p1]}>
                    <Text style={[styles.base, styles.streetTextInRestaurantItem, styles.colorTextSupporting, styles.mr2]}>{restaurant.locality}</Text>
                    <Icon
                        width={variables.iconSizeLarge}
                        height={variables.iconSizeLarge}
                        src={Ieattaicons.MapMarker}
                        fill={theme.textSupporting}
                    />
                    <Text style={[styles.base, styles.streetTextInRestaurantItem, styles.colorTextSupporting, styles.ml2]}>{restaurant.route}</Text>
                </View>
                <View style={[styles.flexRow, styles.alignItemsCenter, styles.mt2]}>
                    <RNImage
                        style={styles.ratingIconInRestaurantItem}
                        source={IeattaStars.STARS.SMALL[calcRateForRestaurant(restaurant.rate, restaurant.reviewCount)]}
                    />
                    <Text style={styles.ml2}>{`${restaurant.reviewCount} Reviews`}</Text>
                </View>
            </View>
        </View>
    );
}

RestaurantCardView.displayName = 'RestaurantCardView';

export default React.memo(RestaurantCardView);
