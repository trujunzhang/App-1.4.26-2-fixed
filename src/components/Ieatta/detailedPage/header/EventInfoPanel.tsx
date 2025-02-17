/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import moment from 'moment';
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
import {navigationToEditReview} from '@libs/ieatta/editFormUtils';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import ROUTES from '@src/ROUTES';
import type {IFBEvent, IFBRestaurant} from '@src/types/firebase';
import HeaderActionItem from './HeaderActionItem';

type EventInfoPanelProps = {
    /** The ID of the report that the option is for */
    event: IFBEvent;
    restaurant: IFBRestaurant | undefined;
};

function EventInfoPanel({restaurant, event}: EventInfoPanelProps) {
    const styles = useThemeStyles();
    const rowData: IEditModelButtonRow = {
        restaurantId: event.restaurantId,
        relatedId: event.uniqueId,
        modelPath: FBCollections.Events,
        buttonTag: 'edit.event.button',
    };

    const dateTable = () => {
        return (
            <View style={[styles.flexColumn, styles.mb1]}>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <View style={[styles.mr1]}>
                        <Text style={[styles.labelStrong]}>Start Date:</Text>
                    </View>
                    <View>
                        <Text>{moment(event.start).format('YYYY-MM-DD hh:mm')}</Text>
                    </View>
                </View>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <View style={[styles.mr1]}>
                        <Text style={[styles.labelStrong]}>{'  End Date:'}</Text>
                    </View>
                    <View>
                        <Text>{moment(event.end).format('YYYY-MM-DD hh:mm')}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.headerPanelMobile, styles.flexColumn, styles.alignItemsCenter, styles.shadowInner]}>
            <PageFlashListItemWithEvent
                pageRow={{
                    rowType: PageSection.DETAILED_EDIT_MODEL_BUTTON,
                    rowData,
                    rowKey: 'PageSection.DETAILED_EDIT_MODEL_BUTTON<Event>',
                    modalName: 'edit-button',
                    pressType: RowPressableType.SINGLE_PRESS,
                }}
            />
            <Text style={[styles.restaurantTitleInHeaderPanel, styles.textAlignCenter, styles.alignItemsCenter, styles.mh12, styles.mv2]}>{restaurant?.displayName}</Text>
            <Text style={[styles.eventTitleInHeaderPanel, styles.textAlignCenter, styles.alignItemsCenter, styles.mh12, styles.mv2]}>{event.displayName}</Text>
            {dateTable()}
            <RNImage
                style={[styles.ratingIconInHeaderPanel, styles.mt2, styles.mb4]}
                source={IeattaStars.STARS.SMALL[calcRateForRestaurant(event.rate, event.reviewCount)]}
            />
            {event.want !== '' && (
                <>
                    <Divider dividerStyle={[styles.w70]} />
                    <Text style={[styles.w70, styles.restaurantNoteInHeaderPanel, styles.colorTextSupporting, styles.mv4]}>{StringUtils.capitalizeFirstLetter(event.want)}</Text>
                </>
            )}

            <Divider dividerStyle={[styles.w100]} />
            <View style={[styles.actionsBarInHeaderPanel, {backgroundColor: 'transparent'}]}>
                <HeaderActionItem
                    title="detailedActionItem.person"
                    icon={Expensicons.Plus}
                    fill={TailwindColors.red500}
                    onItemPress={() => {
                        Navigation.navigate(ROUTES.ADD_USERS_IN_EVENT.getRoute({restaurantId: restaurant?.uniqueId ?? '', eventId: event.uniqueId}));
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
                        navigationToEditReview({relatedId: event.uniqueId, reviewType: ReviewType.Event});
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
                        Navigation.navigate(ROUTES.REVIEWS_LIST.getRoute({relatedId: event.uniqueId, reviewType: ReviewType.Event}));
                    }}
                />
            </View>
        </View>
    );
}

EventInfoPanel.displayName = 'EventInfoPanel';

export default React.memo(EventInfoPanel);
