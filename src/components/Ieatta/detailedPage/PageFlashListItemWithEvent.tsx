/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, {useCallback, useRef, useState} from 'react';
import type {GestureResponderEvent} from 'react-native';
import {View} from 'react-native';
import Hoverable from '@components/Hoverable';
import {PressableWithFeedback} from '@components/Pressable';
import PressableWithSecondaryInteraction from '@components/PressableWithSecondaryInteraction';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import ControlSelection from '@libs/ControlSelection';
import * as DeviceCapabilities from '@libs/DeviceCapabilities';
import DomUtils from '@libs/DomUtils';
import {RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import {pageItemNavigateTo} from '@libs/ieatta/pageNavigationUtils';
import CONST from '@src/CONST';
import * as DetailedPageActionContextMenu from './ContextMenu/DetailedPageActionContextMenu';
import PageFlashListItem from './PageFlashListItem';
import type {PageFlashListItemEventProps} from './types';

function PageFlashListItemWithEvent({pageRow}: PageFlashListItemEventProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {isSmallScreenWidth} = useResponsiveLayout();
    const popoverAnchor = useRef<View>(null);
    const [isContextMenuActive, setIsContextMenuActive] = useState(() => false);

    /**
     * Show the ReportActionContextMenu modal popover.
     *
     * @param {Object} [event] - A press event.
     */
    const showPopover = useCallback(
        (event: MouseEvent | GestureResponderEvent) => {
            setIsContextMenuActive(true);
            DetailedPageActionContextMenu.showContextMenu(
                CONST.CONTEXT_MENU_TYPES.PAGE_ACTION,
                event,
                pageRow,
                popoverAnchor.current,
                () => {},
                () => setIsContextMenuActive(false),
            );
        },
        [pageRow],
    );

    const content = (hovered: boolean) => (
        <PageFlashListItem
            pageRow={pageRow}
            hovered={hovered || isContextMenuActive}
        />
    );

    const renderItemWithEvent = () => {
        switch (pageRow.pressType) {
            case RowPressableType.SINGLE_PRESS: {
                return (
                    <PressableWithFeedback
                        onPress={(event) => {
                            pageItemNavigateTo(pageRow);
                        }}
                        wrapperStyle={[]}
                        style={[]}
                        hoverStyle={[]}
                        id={pageRow.rowKey}
                        accessibilityLabel=""
                        role={CONST.ROLE.BUTTON}
                        hoverDimmingValue={1}
                    >
                        <Hoverable shouldHandleScroll>{(hovered: boolean) => content(hovered)}</Hoverable>
                    </PressableWithFeedback>
                );
            }
            case RowPressableType.SECONDARY_PRESS: {
                return (
                    <PressableWithSecondaryInteraction
                        ref={popoverAnchor}
                        style={[styles.pointerEventsAuto, isContextMenuActive ? styles.sidebarLinkHover : null]}
                        onPressIn={() => isSmallScreenWidth && DeviceCapabilities.canUseTouchScreen() && ControlSelection.block()}
                        onPressOut={() => ControlSelection.unblock()}
                        onPress={() => {
                            pageItemNavigateTo(pageRow);
                        }}
                        onSecondaryInteraction={(event) => {
                            showPopover(event);
                            // Ensure that we blur the composer when opening context menu, so that only one component is focused at a time
                            if (DomUtils.getActiveElement()) {
                                (DomUtils.getActiveElement() as HTMLElement | null)?.blur();
                            }
                        }}
                        withoutFocusOnSecondaryInteraction
                        activeOpacity={0.8}
                        accessibilityLabel={translate('accessibilityHints.chatMessage')}
                    >
                        <Hoverable shouldHandleScroll>{(hovered) => content(hovered)}</Hoverable>
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
