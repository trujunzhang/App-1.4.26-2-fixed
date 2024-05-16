/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import Hoverable from '@components/Hoverable';
import {PressableWithFeedback} from '@components/Pressable';
import PressableWithSecondaryInteraction from '@components/PressableWithSecondaryInteraction';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import ControlSelection from '@libs/ControlSelection';
import * as DeviceCapabilities from '@libs/DeviceCapabilities';
import {RowPressableType} from '@libs/Firebase/list/constant';
import {pageItemNavigateTo} from '@libs/ieatta/pageNavigationUtils';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import PageFlashListItem from './PageFlashListItem';
import type {PageFlashListItemEventProps} from './types';

function PageFlashListItemWithEvent({item}: PageFlashListItemEventProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {isSmallScreenWidth} = useWindowDimensions();
    const popoverAnchorRef = useRef<View>();
    const [isContextMenuActive, setIsContextMenuActive] = useState(() => false);

    const {pressType} = item;

    // /**
    //  * Show the ReportActionContextMenu modal popover.
    //  *
    //  * @param {Object} [event] - A press event.
    //  */
    // const showPopover = useCallback((event: any) => {
    //     setIsContextMenuActive(true);
    //     // const selection = SelectionScraper.getCurrentSelection();
    //     // ReportActionContextMenu.showContextMenu(
    //     //     CONST.CONTEXT_MENU_TYPES.REPORT_ACTION,
    //     //     event,
    //     //     selection,
    //     //     popoverAnchorRef,
    //     //     props.report.reportID,
    //     //     props.action.reportActionID,
    //     //     originalReportID,
    //     //     props.draftMessage,
    //     //     () => setIsContextMenuActive(true),
    //     //     toggleContextMenuFromActiveReportAction,
    //     //     ReportUtils.isArchivedRoom(originalReport),
    //     //     ReportUtils.chatIncludesChronos(originalReport),
    //     // );
    // }, []);

    const content = (hovered: boolean) => (
        <PageFlashListItem
            item={item}
            hovered={hovered}
        />
    );

    const renderItemWithEvent = () => {
        switch (pressType) {
            case RowPressableType.SINGLE_PRESS: {
                return (
                    <PressableWithFeedback
                        onPress={(event) => {
                            pageItemNavigateTo(item);
                        }}
                        wrapperStyle={[]}
                        style={[]}
                        hoverStyle={[]}
                        id={item.rowKey}
                        accessibilityLabel=""
                        role={CONST.ROLE.BUTTON}
                        hoverDimmingValue={1}
                    >
                        {/* <Hoverable shouldHandleScroll>{(hovered) => content(hovered)}</Hoverable> */}
                        {content(false)}
                    </PressableWithFeedback>
                );
            }
            case RowPressableType.SECONDARY_PRESS: {
                return (
                    <PressableWithSecondaryInteraction
                        ref={popoverAnchorRef as unknown as React.RefObject<View>}
                        style={[styles.pointerEventsAuto]}
                        onPressIn={() => isSmallScreenWidth && DeviceCapabilities.canUseTouchScreen() && ControlSelection.block()}
                        onPressOut={() => ControlSelection.unblock()}
                        onPress={() => {
                            pageItemNavigateTo(item);
                        }}
                        // onSecondaryInteraction={showPopover}
                        preventDefaultContextMenu
                        withoutFocusOnSecondaryInteraction
                        accessibilityLabel={translate('accessibilityHints.chatMessage')}
                    >
                        {/* <Hoverable shouldHandleScroll>{(hovered) => content(hovered)}</Hoverable> */}
                        {content(false)}
                    </PressableWithSecondaryInteraction>
                );
            }
            case RowPressableType.NO_EVENT: {
                return content(false);
            }
            default: {
                return null;
            }
        }
    };
    return renderItemWithEvent();
}

export default PageFlashListItemWithEvent;
