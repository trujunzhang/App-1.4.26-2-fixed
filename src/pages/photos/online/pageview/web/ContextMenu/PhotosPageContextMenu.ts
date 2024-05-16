import React from 'react';
import type {RefObject} from 'react';
// eslint-disable-next-line no-restricted-imports
import type {GestureResponderEvent, Text as RNText, View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import type CONST from '@src/CONST';

// import type {photosPage} from '@src/types/onyx';

type OnHideCallback = () => void;

type OnConfirm = () => void;

type OnCancel = () => void;

type ContextMenuType = ValueOf<typeof CONST.CONTEXT_MENU_TYPES>;

type ShowContextMenu = (initialPhotoId: string, relatedId: string, photoType: string, onShow?: () => void, onHide?: () => void) => void;

type PhotosPageContextMenu = {
    showContextMenu: ShowContextMenu;
    hideContextMenu: (callback?: OnHideCallback) => void;
    // showDeleteModal: (reportID: string, photosPage: OnyxEntry<photosPage>, shouldSetModalVisibility?: boolean, onConfirm?: OnConfirm, onCancel?: OnCancel) => void;
    hideDeleteModal: () => void;
    isActivePhotosPage: (accountID: string | number) => boolean;
    instanceID: string;
    runAndResetOnPopoverHide: () => void;
    clearActivePhotosPage: () => void;
    contentRef: RefObject<View>;
};

const contextMenuRef = React.createRef<PhotosPageContextMenu>();

/**
 * Hide the PhotosPageContextMenu modal popover.
 * Hides the popover menu with an optional delay
 * @param [shouldDelay] - whether the menu should close after a delay
 * @param [onHideCallback] - Callback to be called after Context Menu is completely hidden
 */
function hideContextMenu(shouldDelay?: boolean, onHideCallback = () => {}) {
    if (!contextMenuRef.current) {
        return;
    }
    if (!shouldDelay) {
        contextMenuRef.current.hideContextMenu(onHideCallback);

        return;
    }

    // Save the active instanceID for which hide action was called.
    // If menu is being closed with a delay, check that whether the same instance exists or a new was created.
    // If instance is not same, cancel the hide action
    const instanceID = contextMenuRef.current.instanceID;
    setTimeout(() => {
        if (contextMenuRef.current?.instanceID !== instanceID) {
            return;
        }

        contextMenuRef.current.hideContextMenu(onHideCallback);
    }, 800);
}

/**
 * Show the PhotosPageContextMenu modal popover.
 *
 * @param type - the context menu type to display [EMAIL, LINK, REPORT_ACTION, REPORT]
 * @param [event] - A press event.
 * @param [selection] - Copied content.
 * @param contextMenuAnchor - popoverAnchor
 * @param reportID - Active Report Id
 * @param reportActionID - PhotosPageID for ContextMenu
 * @param originalReportID - The currrent Report Id of the PhotosPage
 * @param draftMessage - PhotosPage Draftmessage
 * @param [onShow=() => {}] - Run a callback when Menu is shown
 * @param [onHide=() => {}] - Run a callback when Menu is hidden
 * @param isArchivedRoom - Whether the provided report is an archived room
 * @param isChronosReport - Flag to check if the chat participant is Chronos
 * @param isPinnedChat - Flag to check if the chat is pinned in the LHN. Used for the Pin/Unpin action
 * @param isUnreadChat - Flag to check if the chat has unread messages in the LHN. Used for the Mark as Read/Unread action
 */
function showPhotosPage(initialPhotoId: string, relatedId: string, photoType: string, onShow = () => {}, onHide = () => {}) {
    if (!contextMenuRef.current) {
        return;
    }
    // If there is an already open context menu, close it first before opening
    // a new one.
    if (contextMenuRef.current.instanceID) {
        hideContextMenu();
        contextMenuRef.current.runAndResetOnPopoverHide();
    }

    contextMenuRef.current.showContextMenu(initialPhotoId, relatedId, photoType, onShow, onHide);
}

/**
 * Hides the Confirm delete action modal
 */
function hideDeleteModal() {
    if (!contextMenuRef.current) {
        return;
    }
    contextMenuRef.current.hideDeleteModal();
}

/**
 * Opens the Confirm delete action modal
 */
// function showDeleteModal(reportID: string, photosPage: OnyxEntry<photosPage>, shouldSetModalVisibility?: boolean, onConfirm?: OnConfirm, onCancel?: OnCancel) {
//     if (!contextMenuRef.current) {
//         return;
//     }
//     contextMenuRef.current.showDeleteModal(reportID, photosPage, shouldSetModalVisibility, onConfirm, onCancel);
// }

/**
 * Whether Context Menu is active for the Report Action.
 */
function isActivePhotosPage(actionID: string | number): boolean {
    if (!contextMenuRef.current) {
        return false;
    }
    return contextMenuRef.current.isActivePhotosPage(actionID);
}

function clearActivePhotosPage() {
    if (!contextMenuRef.current) {
        return;
    }

    return contextMenuRef.current.clearActivePhotosPage();
}

export {
    contextMenuRef,
    showPhotosPage,
    // showContextMenu,
    hideContextMenu,
    isActivePhotosPage,
    clearActivePhotosPage,
    // showDeleteModal,
    hideDeleteModal,
};
export type {ContextMenuType, ShowContextMenu, PhotosPageContextMenu};
