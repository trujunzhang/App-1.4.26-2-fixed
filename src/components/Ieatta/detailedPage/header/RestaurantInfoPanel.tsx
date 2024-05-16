import PropTypes from 'prop-types';
import React from 'react';
import {Image as RNImage, View} from 'react-native';
import Divider from '@components/Divider';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import {FBCollections} from '@libs/Firebase/constant';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import type {IEditModelButtonRow} from '@libs/Firebase/list/types/rows/common';
import {calcRateForRestaurant} from '@libs/Firebase/utils/rate_utils';
import {StringUtils} from '@libs/Firebase/utils/string_utils';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import type {IFBRestaurant} from '@src/types/firebase';

type RestaurantInfoPanelProps = {
    /** The ID of the report that the option is for */
    restaurant: IFBRestaurant;
};

function RestaurantInfoPanel({restaurant}: RestaurantInfoPanelProps) {
    const styles = useThemeStyles();
    const rowData: IEditModelButtonRow = {
        relatedId: restaurant.uniqueId,
        modelPath: FBCollections.Restaurants,
        buttonTag: 'edit.restaurant.button',
    };
    return (
        <View style={[styles.headerPanelMobile, styles.flexColumn, styles.alignItemsCenter, styles.shadowInner]}>
            <PageFlashListItemWithEvent
                item={{
                    rowType: PageSection.DETAILED_EDIT_MODEL_BUTTON,
                    rowData,
                    rowKey: 'PageSection.DETAILED_EDIT_MODEL_BUTTON<Restaurant>',
                    pressType: RowPressableType.SINGLE_PRESS,
                }}
            />
            <Text style={[styles.restaurantTitleInHeaderPanel, styles.textAlignCenter, styles.alignItemsCenter, styles.mh12, styles.mv2]}>{restaurant.displayName}</Text>
            <RNImage
                style={[styles.ratingIconInHeaderPanel, styles.mt2, styles.mb4]}
                source={IeattaStars.STARS.SMALL[calcRateForRestaurant(restaurant.rate, restaurant.reviewCount)]}
            />
            {restaurant.extraNote !== '' && (
                <>
                    <Divider dividerStyle={[styles.w70]} />
                    <Text style={[styles.w70, styles.restaurantNoteInHeaderPanel, styles.mv4]}>{StringUtils.capitalizeFirstLetter(restaurant.extraNote)}</Text>
                </>
            )}
            <Divider dividerStyle={[styles.w100]} />
            <View style={[styles.actionsBarInHeaderPanel, {backgroundColor: 'transparent'}]}>
                <View style={[styles.flex1, styles.actionRowInHeaderPanel, {backgroundColor: 'transparent'}]}>
                    <Icon
                        fill={TailwindColors.red500}
                        width={variables.iconSizeNormal}
                        height={variables.iconSizeNormal}
                        src={Expensicons.Plus}
                    />
                    <Text style={styles.actionTitleInHeaderPanel}>Event</Text>
                </View>
                <Divider
                    orientation="vertical"
                    dividerStyle={[styles.h80]}
                />
                <View style={[styles.flex1, styles.actionRowInHeaderPanel, {backgroundColor: 'transparent'}]}>
                    <Icon
                        fill={TailwindColors.blue500}
                        width={variables.iconSizeNormal}
                        height={variables.iconSizeNormal}
                        src={Expensicons.Pencil}
                    />
                    <Text style={styles.actionTitleInHeaderPanel}>Review</Text>
                </View>
                <Divider
                    orientation="vertical"
                    dividerStyle={[styles.h80]}
                />
                <View style={[styles.flex1, styles.actionRowInHeaderPanel, {backgroundColor: 'transparent'}]}>
                    <Icon
                        fill={TailwindColors.red500}
                        width={variables.iconSizeNormal}
                        height={variables.iconSizeNormal}
                        src={Expensicons.QueueList}
                    />
                    <Text style={styles.actionTitleInHeaderPanel}>Reviews</Text>
                </View>
            </View>
        </View>
    );
}

RestaurantInfoPanel.displayName = 'RestaurantInfoPanel';

export default React.memo(RestaurantInfoPanel);
