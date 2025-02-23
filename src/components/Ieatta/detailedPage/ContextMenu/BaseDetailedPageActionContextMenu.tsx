/* eslint-disable @typescript-eslint/no-explicit-any */
import type {MutableRefObject, RefObject} from 'react';
import React, {memo, useRef, useState} from 'react';
// eslint-disable-next-line no-restricted-imports
import type {GestureResponderEvent, Text as RNText, View as ViewType} from 'react-native';
import {InteractionManager, View} from 'react-native';
import type {ContextMenuItemHandle} from '@components/ContextMenuItem';
import ContextMenuItem from '@components/ContextMenuItem';
import useArrowKeyFocusManager from '@hooks/useArrowKeyFocusManager';
import useKeyboardShortcut from '@hooks/useKeyboardShortcut';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useStyleUtils from '@hooks/useStyleUtils';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import * as Session from '@userActions/Session';
import CONST from '@src/CONST';
import type {ContextMenuActionPayload} from './ContextMenuActions';
import ContextMenuActions from './ContextMenuActions';
import type {ContextMenuAnchor, ContextMenuType} from './DetailedPageActionContextMenu';
import {hideContextMenu, showContextMenu} from './DetailedPageActionContextMenu';

type BaseDetailedPageActionContextMenuProps = {
    /** Controls the visibility of this component. */
    isVisible?: boolean;

    /** The copy selection. */
    selection: IPageRow;

    /** Target node which is the target of ContentMenu */
    anchor?: MutableRefObject<ContextMenuAnchor>;

    /** Content Ref */
    contentRef?: RefObject<View>;

    /** Function to check if context menu is active */
    checkIfContextMenuActive?: () => void;

    /** Function to update emoji picker state */
    setIsEmojiPickerActive?: (state: boolean) => void;
};

type MenuItemRefs = Record<string, ContextMenuItemHandle | null>;

function BaseDetailedPageActionContextMenu({anchor, contentRef, isVisible = false, selection, checkIfContextMenuActive, setIsEmojiPickerActive}: BaseDetailedPageActionContextMenuProps) {
    const StyleUtils = useStyleUtils();
    const {translate} = useLocalize();
    const {isSmallScreenWidth} = useResponsiveLayout();
    const menuItemRefs = useRef<MenuItemRefs>({});
    const [shouldKeepOpen, setShouldKeepOpen] = useState(false);
    const wrapperStyle = StyleUtils.getReportActionContextMenuStyles(false, isSmallScreenWidth);
    const {isOffline} = useNetwork();
    const threedotRef = useRef<View>(null);

    const shouldEnableArrowNavigation = !false && (isVisible || shouldKeepOpen);

    const filteredContextMenuActions = ContextMenuActions.filter((contextAction) => contextAction.shouldShow(selection, anchor));

    // Context menu actions that are not rendered as menu items are excluded from arrow navigation
    const nonMenuItemActionIndexes = filteredContextMenuActions.map((contextAction, index) =>
        'renderContent' in contextAction && typeof contextAction.renderContent === 'function' ? index : undefined,
    );
    const disabledIndexes = nonMenuItemActionIndexes.filter((index): index is number => index !== undefined);

    const [focusedIndex, setFocusedIndex] = useArrowKeyFocusManager({
        initialFocusedIndex: -1,
        disabledIndexes,
        maxIndex: filteredContextMenuActions.length - 1,
        isActive: shouldEnableArrowNavigation,
    });

    /**
     * Checks if user is anonymous. If true and the action doesn't accept for anonymous user, hides the context menu and
     * shows the sign in modal. Else, executes the callback.
     */
    const interceptAnonymousUser = (callback: () => void, isAnonymousAction = false) => {
        if (Session.isAnonymousUser() && !isAnonymousAction) {
            hideContextMenu(false);

            InteractionManager.runAfterInteractions(() => {
                Session.signOutAndRedirectToSignIn();
            });
        } else {
            callback();
        }
    };

    useKeyboardShortcut(
        CONST.KEYBOARD_SHORTCUTS.ENTER,
        (event) => {
            if (!menuItemRefs.current[focusedIndex]) {
                return;
            }

            // Ensures the event does not cause side-effects beyond the context menu, e.g. when an outside element is focused
            if (event) {
                event.stopPropagation();
            }

            menuItemRefs.current[focusedIndex]?.triggerPressAndUpdateSuccess?.();
            setFocusedIndex(-1);
        },
        {isActive: shouldEnableArrowNavigation},
    );

    const openOverflowMenu = (event: GestureResponderEvent | MouseEvent, anchorRef: MutableRefObject<View | null>) => {
        showContextMenu(
            event,
            selection,
            anchorRef?.current as ViewType | RNText | null,
            () => {
                checkIfContextMenuActive?.();
                setShouldKeepOpen(false);
            },
            () => {},
            false,
        );
    };

    return (
        (isVisible || shouldKeepOpen) && (
            <View
                ref={contentRef}
                style={wrapperStyle}
            >
                {filteredContextMenuActions.map((contextAction, index) => {
                    // const closePopup = !isMini;
                    const closePopup = !false;
                    const payload: ContextMenuActionPayload = {
                        selection,
                        close: () => setShouldKeepOpen(false),
                        openContextMenu: () => setShouldKeepOpen(true),
                        interceptAnonymousUser,
                        openOverflowMenu,
                        setIsEmojiPickerActive,
                    };

                    if ('renderContent' in contextAction) {
                        return contextAction.renderContent(closePopup, payload);
                    }

                    const {textTranslateKey} = contextAction;
                    const text = translate(textTranslateKey, {modalName: selection.modalName} as never);
                    const isMenuAction = textTranslateKey === 'reportActionContextMenu.menu';

                    return (
                        <ContextMenuItem
                            ref={(ref) => {
                                menuItemRefs.current[index] = ref;
                            }}
                            buttonRef={isMenuAction ? threedotRef : {current: null}}
                            icon={contextAction.icon}
                            text={text ?? ''}
                            successIcon={contextAction.successIcon}
                            successText={contextAction.successTextTranslateKey ? translate(contextAction.successTextTranslateKey) : undefined}
                            isMini={false}
                            key={contextAction.textTranslateKey}
                            onPress={(event) => {
                                contextAction.onPress?.(closePopup, {...payload, event});
                            }}
                            description={contextAction.getDescription?.('') ?? ''}
                            isAnonymousAction={contextAction.isAnonymousAction}
                            isFocused={focusedIndex === index}
                            shouldPreventDefaultFocusOnPress={contextAction.shouldPreventDefaultFocusOnPress}
                            onFocus={() => setFocusedIndex(index)}
                        />
                    );
                })}
            </View>
        )
    );
}

export default memo(BaseDetailedPageActionContextMenu);

export type {BaseDetailedPageActionContextMenuProps};
