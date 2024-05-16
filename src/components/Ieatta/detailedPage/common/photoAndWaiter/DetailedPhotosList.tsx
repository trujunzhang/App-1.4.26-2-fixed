/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, {useCallback, useRef, useState} from 'react';
import {FlatList, GestureResponderEvent, StyleSheet, View} from 'react-native';
import Hoverable from '@components/Hoverable';
import SectionEmptyView from '@components/Ieatta/detailedPage/common/SectionEmptyView';
import SectionPhotoEmptyView from '@components/Ieatta/detailedPage/common/SectionPhotoEmptyView';
import PressableWithSecondaryInteraction from '@components/PressableWithSecondaryInteraction';
import useLocalize from '@hooks/useLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import ControlSelection from '@libs/ControlSelection';
import * as DeviceCapabilities from '@libs/DeviceCapabilities';
import Log from '@libs/Log';
import SelectionScraper from '@libs/SelectionScraper';
import Navigation from '@navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import ROUTES from '@src/ROUTES';
import type {IFBPhoto} from '@src/types/firebase';
import DetailedPhotosNativeView from './DetailedPhotoNativeView';

type DetailedPhotosListProps = {
    photos: IFBPhoto[];
    isSmallScreenWidth: boolean;
    isLoading?: boolean;
};

const keyExtractor = (item: IFBPhoto) => `row_${item.uniqueId}`;

function DetailedPhotosList({photos, isSmallScreenWidth, isLoading = false}: DetailedPhotosListProps) {
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();

    const {translate} = useLocalize();
    const [isContextMenuActive, setIsContextMenuActive] = useState(() => false);
    const popoverAnchorRef = useRef<View>();

    /**
     * Show the ReportActionContextMenu modal popover.
     *
     * @param {Object} [event] - A press event.
     */
    const showPopover = useCallback((event: GestureResponderEvent | MouseEvent) => {
        setIsContextMenuActive(true);
        const selection = SelectionScraper.getCurrentSelection();
        // ReportActionContextMenu.showContextMenu(
        //     CONST.CONTEXT_MENU_TYPES.REPORT_ACTION,
        //     event,
        //     selection,
        //     popoverAnchorRef,
        //     props.report.reportID,
        //     props.action.reportActionID,
        //     originalReportID,
        //     props.draftMessage,
        //     () => setIsContextMenuActive(true),
        //     toggleContextMenuFromActiveReportAction,
        //     ReportUtils.isArchivedRoom(originalReport),
        //     ReportUtils.chatIncludesChronos(originalReport),
        // );
    }, []);
    /**
     * Function which renders a row in the list
     *
     * @param {Object} params
     * @param {Object} params.item
     *
     * @return {Component}
     */
    const renderItem = useCallback(
        // eslint-disable-next-line react/no-unused-prop-types
        ({
            item,
        }: {
            // eslint-disable-next-line react/no-unused-prop-types
            item: IFBPhoto;
        }) => {
            return (
                <View style={[]}>
                    <PressableWithSecondaryInteraction
                        ref={popoverAnchorRef as unknown as React.RefObject<View>}
                        style={[styles.pointerEventsAuto]}
                        onPressIn={() => isSmallScreenWidth && DeviceCapabilities.canUseTouchScreen() && ControlSelection.block()}
                        onPressOut={() => ControlSelection.unblock()}
                        onPress={() => {
                            // Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(restaurant.uniqueId));
                        }}
                        onSecondaryInteraction={showPopover}
                        preventDefaultContextMenu
                        withoutFocusOnSecondaryInteraction
                        accessibilityLabel={translate('accessibilityHints.chatMessage')}
                    >
                        <Hoverable shouldHandleScroll>
                            {(hovered) => (
                                <View style={[hovered && styles.shadowLg]}>
                                    <DetailedPhotosNativeView photo={item} />
                                </View>
                            )}
                        </Hoverable>
                    </PressableWithSecondaryInteraction>
                </View>
            );
        },
        [isSmallScreenWidth, showPopover, styles.pointerEventsAuto, styles.shadowLg, translate],
    );

    return (
        <View
            style={[
                styles.flexColumn,
                styles.w100,
                {
                    height: variables.photoInRestaurantMobileItemHeight,
                },
            ]}
        >
            {photos.length > 0 ? (
                <FlatList
                    horizontal
                    indicatorStyle="white"
                    keyboardShouldPersistTaps="always"
                    data={photos}
                    testID="page-photos-flashlist"
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={StyleSheet.flatten([styles.ph4])}
                    ItemSeparatorComponent={() => <View style={{width: 10}} />}
                />
            ) : (
                <SectionPhotoEmptyView />
            )}
        </View>
    );
}

export default DetailedPhotosList;
