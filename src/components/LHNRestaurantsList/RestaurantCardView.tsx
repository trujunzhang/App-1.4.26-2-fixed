import React, {useMemo} from 'react';
import {Image as RNImage, View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Text from '@components/Text';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {calcRateForRestaurant} from '@libs/Firebase/utils/rate_utils';
import variables from '@styles/variables';
import type {RestaurantItemProps} from './type';

function RestaurantCardView({rowData, hovered}: RestaurantItemProps) {
    const {restaurant, isFocused} = rowData;
    // const {isMediumScreenWidth, isTabletScreenWidth} = useWindowDimensions();
    const {isMediumScreenWidth, windowWidth} = useWindowDimensions();
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
                hovered && !isFocused ? styles.sidebarLinkHover : null,
                styles.w100,
                {
                    // height: isMediumScreenWidth || isTabletScreenWidth ? variables.restaurantCardViewTableHeight : variables.restaurantCardViewPhoneHeight,
                    height: cardHeight,
                },
            ]}
        >
            <View style={[styles.flex1]}>
                <ImagePlaceholder
                    sourceUri={restaurant.originalUrl}
                    style={[styles.w100, styles.h100]}
                    imageType="png"
                    placeholder={Expensicons.PNGBusinessMediumSquare}
                />
            </View>
            <View style={[styles.ph3, styles.pv4]}>
                <Text style={[styles.lg, styles.textStrong]}>{restaurant.displayName}</Text>
                <View style={[styles.flexRow, styles.alignItemsCenter, styles.mv2, styles.p1]}>
                    <Text style={[styles.base, styles.streetTextInRestaurantItem, styles.mr2]}>{restaurant.locality}</Text>
                    <Icon
                        width={variables.iconSizeLarge}
                        height={variables.iconSizeLarge}
                        src={Expensicons.MapMarker}
                        fill={theme.textSupporting}
                    />
                    <Text style={[styles.base, styles.streetTextInRestaurantItem, styles.ml2]}>{restaurant.route}</Text>
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
