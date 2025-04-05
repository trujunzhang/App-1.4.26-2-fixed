/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {Image as RNImage, View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import Divider from '@components/Ieatta/components/Divider';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IEditModelButtonRow} from '@libs/FirebaseIeatta/list/types/rows/common';
import {calcRateForRestaurant} from '@libs/FirebaseIeatta/utils/rate_utils';
import {StringUtils} from '@libs/FirebaseIeatta/utils/string_utils';
import {navigationToEditEvent, navigationToEditReview} from '@libs/ieatta/editFormUtils';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import ROUTES from '@src/ROUTES';
import type {IFBRestaurant} from '@src/types/firebase';
import HeaderActionItem from './HeaderActionItem';

// eslint-disable-next-line rulesdir/no-inline-named-export
export type RestaurantInfoPanelProps = {
    /** The ID of the report that the option is for */
    restaurant: IFBRestaurant;
};

function RestaurantInfoPanel({restaurant}: RestaurantInfoPanelProps) {
    const styles = useThemeStyles();
    const rowData: IEditModelButtonRow = {
        restaurantId: restaurant.uniqueId,
        relatedId: restaurant.uniqueId,
        modelPath: FBCollections.Restaurants,
        buttonTag: 'edit.restaurant.button',
    };
    return (
        <View style={[styles.headerPanelMobile, styles.flexColumn, styles.alignItemsCenter, styles.shadowInner]}>
            <PageFlashListItemWithEvent
                pageRow={{
                    rowType: PageSection.DETAILED_EDIT_MODEL_BUTTON,
                    rowData,
                    rowKey: 'PageSection.DETAILED_EDIT_MODEL_BUTTON<Restaurant>',
                    modalName: 'edit-button',
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
                    <Text style={[styles.w70, styles.restaurantNoteInHeaderPanel, styles.colorTextSupporting, styles.mv4]}>{StringUtils.capitalizeFirstLetter(restaurant.extraNote)}</Text>
                </>
            )}
            <Divider dividerStyle={[styles.w100]} />
            <View style={[styles.actionsBarInHeaderPanel, {backgroundColor: 'transparent'}]}>
                <HeaderActionItem
                    title="detailedActionItem.event"
                    icon={Expensicons.Plus}
                    fill={TailwindColors.red500}
                    onItemPress={() => {
                        navigationToEditEvent({restaurantId: restaurant.uniqueId});
                    }}
                />
                <Divider
                    orientation="vertical"
                    dividerStyle={[styles.h80]}
                />
                <HeaderActionItem
                    title="detailedActionItem.review"
                    icon={Expensicons.Pencil}
                    fill={TailwindColors.blue500}
                    onItemPress={() => {
                        navigationToEditReview({relatedId: restaurant.uniqueId, reviewType: ReviewType.Restaurant});
                    }}
                />
                <Divider
                    orientation="vertical"
                    dividerStyle={[styles.h80]}
                />
                <HeaderActionItem
                    title="detailedActionItem.reviews"
                    icon={Ieattaicons.QueueList}
                    fill={TailwindColors.red500}
                    onItemPress={() => {
                        Navigation.navigate(ROUTES.REVIEWS_LIST.getRoute({relatedId: restaurant.uniqueId, reviewType: ReviewType.Restaurant}));
                    }}
                />
            </View>
        </View>
    );
}

RestaurantInfoPanel.displayName = 'RestaurantInfoPanel';

export default React.memo(RestaurantInfoPanel);
