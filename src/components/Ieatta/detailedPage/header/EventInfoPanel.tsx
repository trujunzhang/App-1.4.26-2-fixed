import moment from 'moment';
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
import type {IFBEvent, IFBRestaurant} from '@src/types/firebase';

type EventInfoPanelProps = {
    /** The ID of the report that the option is for */
    event: IFBEvent;
    restaurant: IFBRestaurant | undefined;
};

function EventInfoPanel({restaurant, event}: EventInfoPanelProps) {
    const styles = useThemeStyles();
    const rowData: IEditModelButtonRow = {
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
                item={{
                    rowType: PageSection.DETAILED_EDIT_MODEL_BUTTON,
                    rowData,
                    rowKey: 'PageSection.DETAILED_EDIT_MODEL_BUTTON<Event>',
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
                    <Text style={[styles.w70, styles.restaurantNoteInHeaderPanel, styles.mv4]}>{StringUtils.capitalizeFirstLetter(event.want)}</Text>
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
                    <Text style={styles.actionTitleInHeaderPanel}>Person</Text>
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

EventInfoPanel.displayName = 'EventInfoPanel';

export default React.memo(EventInfoPanel);
