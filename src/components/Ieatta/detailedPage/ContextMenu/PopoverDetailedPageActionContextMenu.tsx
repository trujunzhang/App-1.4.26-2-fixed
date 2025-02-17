/* eslint-disable @typescript-eslint/no-explicit-any */
import type {ForwardedRef} from 'react';
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';

/* eslint-disable no-restricted-imports */
import type {EmitterSubscription, GestureResponderEvent, NativeTouchEvent, View} from 'react-native';
import {Dimensions} from 'react-native';
import ConfirmModal from '@components/ConfirmModal';
import PopoverWithMeasuredContent from '@components/PopoverWithMeasuredContent';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import calculateAnchorPosition from '@libs/calculateAnchorPosition';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import {actionDeleteNavigateTo} from '@libs/ieatta/DeleteNavigationUtils';
import * as ShowNotify from '@libs/ieatta/Notify';
import type {AnchorDimensions} from '@src/styles';
import BaseDetailedPageActionContextMenu from './BaseDetailedPageActionContextMenu';
import type {ContextMenuAnchor, ContextMenuType, DetailedPageActionContextMenu} from './DetailedPageActionContextMenu';

type Location = {
    x: number;
    y: number;
};

function extractPointerEvent(event: GestureResponderEvent | MouseEvent): MouseEvent | NativeTouchEvent {
    if ('nativeEvent' in event) {
        return event.nativeEvent;
    }
    return event;
}

const emptySelection: IPageRow = {
    rowKey: '',
    rowType: PageSection.Unknow,
    rowData: {},
    modalName: 'unknown',
    pressType: RowPressableType.NO_EVENT,
};

function PopoverDetailedPageActionContextMenu(_props: unknown, ref: ForwardedRef<DetailedPageActionContextMenu>) {
    const {isSmallScreenWidth} = useResponsiveLayout();
    const {translate} = useLocalize();
    const typeRef = useRef<ContextMenuType>();
    const selectionRef = useRef<IPageRow>(emptySelection);

    const toastId = React.useRef<number | string | null>(null);

    const cursorRelativePosition = useRef({
        horizontal: 0,
        vertical: 0,
    });

    // The horizontal and vertical position (relative to the screen) where the popover will display.
    const popoverAnchorPosition = useRef({
        horizontal: 0,
        vertical: 0,
    });

    const [instanceID, setInstanceID] = useState('');

    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [isDeleteCommentConfirmModalVisible, setIsDeleteCommentConfirmModalVisible] = useState(false);
    const [shouldSetModalVisibilityForDeleteConfirmation, setShouldSetModalVisibilityForDeleteConfirmation] = useState(true);

    const contentRef = useRef<View>(null);
    const anchorRef = useRef<View | HTMLDivElement | null>(null);
    const dimensionsEventListener = useRef<EmitterSubscription | null>(null);
    const contextMenuAnchorRef = useRef<ContextMenuAnchor>(null);
    const contextMenuTargetNode = useRef<HTMLDivElement | null>(null);
    const contextMenuDimensions = useRef<AnchorDimensions>({
        width: 0,
        height: 0,
    });

    const onPopoverShow = useRef(() => {});
    const onPopoverHide = useRef(() => {});
    const onEmojiPickerToggle = useRef<undefined | ((state: boolean) => void)>();
    const onCancelDeleteModal = useRef(() => {});
    const onConfirmDeleteModal = useRef(() => {});

    const onPopoverHideActionCallback = useRef(() => {});
    const callbackWhenDeleteModalHide = useRef(() => {});

    /** Get the Context menu anchor position. We calculate the anchor coordinates from measureInWindow async method */
    const getContextMenuMeasuredLocation = useCallback(
        () =>
            new Promise<Location>((resolve) => {
                if (contextMenuAnchorRef.current && 'measureInWindow' in contextMenuAnchorRef.current && typeof contextMenuAnchorRef.current.measureInWindow === 'function') {
                    contextMenuAnchorRef.current.measureInWindow((x, y) => resolve({x, y}));
                } else {
                    resolve({x: 0, y: 0});
                }
            }),
        [],
    );

    /** This gets called on Dimensions change to find the anchor coordinates for the action context menu. */
    const measureContextMenuAnchorPosition = useCallback(() => {
        if (!isPopoverVisible) {
            return;
        }

        getContextMenuMeasuredLocation().then(({x, y}) => {
            if (!x || !y) {
                return;
            }

            popoverAnchorPosition.current = {
                horizontal: cursorRelativePosition.current.horizontal + x,
                vertical: cursorRelativePosition.current.vertical + y,
            };
        });
    }, [isPopoverVisible, getContextMenuMeasuredLocation]);

    useEffect(() => {
        dimensionsEventListener.current = Dimensions.addEventListener('change', measureContextMenuAnchorPosition);

        return () => {
            if (!dimensionsEventListener.current) {
                return;
            }
            dimensionsEventListener.current.remove();
        };
    }, [measureContextMenuAnchorPosition]);

    /** Whether Context Menu is active for the Report Action. */
    const isActiveReportAction: DetailedPageActionContextMenu['isActiveReportAction'] = (actionID) =>
        // !!actionID && (reportActionIDRef.current === actionID || reportActionRef.current?.reportActionID === actionID);
        !!actionID && true;

    const clearActiveReportAction = () => {
        // reportActionIDRef.current = '0';
        // reportActionRef.current = null;
    };

    /**
     * Show the DetailedPageActionContextMenu modal popover.
     *
     * @param type - context menu type [EMAIL, LINK, REPORT_ACTION]
     * @param [event] - A press event.
     * @param [selection] - Copied content.
     * @param contextMenuAnchor - popoverAnchor
     * @param draftMessage - ReportAction Draftmessage
     * @param [onShow] - Run a callback when Menu is shown
     * @param [onHide] - Run a callback when Menu is hidden
     * @param isArchivedRoom - Whether the provided report is an archived room
     * @param isChronosReport - Flag to check if the chat participant is Chronos
     * @param isPinnedChat - Flag to check if the chat is pinned in the LHN. Used for the Pin/Unpin action
     * @param isUnreadChat - Flag to check if the chat is unread in the LHN. Used for the Mark as Read/Unread action
     */
    const showContextMenu: DetailedPageActionContextMenu['showContextMenu'] = (
        type,
        event,
        selection,
        contextMenuAnchor,
        onShow = () => {},
        onHide = () => {},
        shouldCloseOnTarget = false,
        setIsEmojiPickerActive = () => {},
        isOverflowMenu = false,
    ) => {
        const {pageX = 0, pageY = 0} = extractPointerEvent(event);
        contextMenuAnchorRef.current = contextMenuAnchor;
        contextMenuTargetNode.current = event.target as HTMLDivElement;
        if (shouldCloseOnTarget) {
            anchorRef.current = event.target as HTMLDivElement;
        } else {
            anchorRef.current = null;
        }
        setInstanceID(Math.random().toString(36).substr(2, 5));

        onPopoverShow.current = onShow;
        onPopoverHide.current = onHide;
        onEmojiPickerToggle.current = setIsEmojiPickerActive;

        new Promise<void>((resolve) => {
            if (Boolean(!pageX && !pageY && contextMenuAnchorRef.current) || isOverflowMenu) {
                calculateAnchorPosition(contextMenuAnchorRef.current).then((position) => {
                    popoverAnchorPosition.current = {horizontal: position.horizontal, vertical: position.vertical};
                    contextMenuDimensions.current = {width: position.vertical, height: position.height};
                    resolve();
                });
            } else {
                getContextMenuMeasuredLocation().then(({x, y}) => {
                    cursorRelativePosition.current = {
                        horizontal: pageX - x,
                        vertical: pageY - y,
                    };
                    popoverAnchorPosition.current = {
                        horizontal: pageX,
                        vertical: pageY,
                    };
                    resolve();
                });
            }
        }).then(() => {
            typeRef.current = type;
            selectionRef.current = selection;
            setIsPopoverVisible(true);
        });
    };

    /** After Popover shows, call the registered onPopoverShow callback and reset it */
    const runAndResetOnPopoverShow = () => {
        onPopoverShow.current();

        // After we have called the action, reset it.
        onPopoverShow.current = () => {};
    };

    /** Run the callback and return a noop function to reset it */
    const runAndResetCallback = (callback: () => void) => {
        callback();
        return () => {};
    };

    /** After Popover hides, call the registered onPopoverHide & onPopoverHideActionCallback callback and reset it */
    const runAndResetOnPopoverHide = () => {
        onPopoverHide.current = runAndResetCallback(onPopoverHide.current);
        onPopoverHideActionCallback.current = runAndResetCallback(onPopoverHideActionCallback.current);
    };

    /**
     * Hide the DetailedPageActionContextMenu modal popover.
     * @param onHideActionCallback Callback to be called after popover is completely hidden
     */
    const hideContextMenu: DetailedPageActionContextMenu['hideContextMenu'] = (onHideActionCallback) => {
        if (typeof onHideActionCallback === 'function') {
            onPopoverHideActionCallback.current = onHideActionCallback;
        }

        setIsPopoverVisible(false);
    };

    const confirmDeleteAndHideModal = useCallback(() => {
        toastId.current = ShowNotify.initialAndShowNotify({
            isSmallScreenWidth,
            message: translate('notify.delete.start', {modalName: selectionRef.current.modalName}),
            autoClose: false,
        });
        actionDeleteNavigateTo({
            item: selectionRef.current,
            onSuccess: () => {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, message: translate('notify.delete.success', {modalName: selectionRef.current.modalName})});
            },
            onFailure: (error: any) => {
                ShowNotify.updateNotify({
                    isSmallScreenWidth,
                    id: toastId.current,
                    type: 'error',
                    message: translate('notify.delete.failure', {modalName: selectionRef.current.modalName}),
                });
            },
        });
        setIsDeleteCommentConfirmModalVisible(false);
    }, [isSmallScreenWidth, translate]);

    const hideDeleteModal = () => {
        callbackWhenDeleteModalHide.current = () => (onCancelDeleteModal.current = runAndResetCallback(onCancelDeleteModal.current));
        setIsDeleteCommentConfirmModalVisible(false);
        setShouldSetModalVisibilityForDeleteConfirmation(true);
    };

    /** Opens the Confirm delete action modal */
    const showDeleteModal: DetailedPageActionContextMenu['showDeleteModal'] = (selection, shouldSetModalVisibility = true, onConfirm = () => {}, onCancel = () => {}) => {
        selectionRef.current = selection;

        onCancelDeleteModal.current = onCancel;
        onConfirmDeleteModal.current = onConfirm;

        setShouldSetModalVisibilityForDeleteConfirmation(shouldSetModalVisibility);
        setIsDeleteCommentConfirmModalVisible(true);
    };

    useImperativeHandle(ref, () => ({
        showContextMenu,
        hideContextMenu,
        showDeleteModal,
        hideDeleteModal,
        isActiveReportAction,
        instanceID,
        runAndResetOnPopoverHide,
        clearActiveReportAction,
        contentRef,
    }));

    // const reportAction = reportActionRef.current;

    return (
        <>
            <PopoverWithMeasuredContent
                isVisible={isPopoverVisible}
                onClose={hideContextMenu}
                onModalShow={runAndResetOnPopoverShow}
                onModalHide={runAndResetOnPopoverHide}
                anchorPosition={popoverAnchorPosition.current}
                animationIn="fadeIn"
                disableAnimation={false}
                animationOutTiming={1}
                shouldSetModalVisibility={false}
                fullscreen
                withoutOverlay
                anchorDimensions={contextMenuDimensions.current}
                anchorRef={anchorRef}
            >
                <BaseDetailedPageActionContextMenu
                    isVisible
                    type={typeRef.current}
                    selection={selectionRef.current}
                    anchor={contextMenuTargetNode}
                    contentRef={contentRef}
                    setIsEmojiPickerActive={onEmojiPickerToggle.current}
                />
            </PopoverWithMeasuredContent>
            <ConfirmModal
                title={translate('detailedPageActionContextMenu.deleteAction', {modalName: selectionRef.current.modalName})}
                isVisible={isDeleteCommentConfirmModalVisible}
                shouldSetModalVisibility={shouldSetModalVisibilityForDeleteConfirmation}
                onConfirm={confirmDeleteAndHideModal}
                onCancel={hideDeleteModal}
                onModalHide={() => {
                    clearActiveReportAction();
                    callbackWhenDeleteModalHide.current();
                }}
                prompt={translate('detailedPageActionContextMenu.deleteConfirmation', {modalName: selectionRef.current.modalName})}
                confirmText={translate('common.delete')}
                cancelText={translate('common.cancel')}
                danger
            />
        </>
    );
}

PopoverDetailedPageActionContextMenu.displayName = 'PopoverDetailedPageActionContextMenu';

export default forwardRef(PopoverDetailedPageActionContextMenu);
