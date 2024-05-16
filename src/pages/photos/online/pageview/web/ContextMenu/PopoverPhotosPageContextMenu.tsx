/* eslint-disable @typescript-eslint/no-explicit-any */
import type {ForwardedRef} from 'react';
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
import type {EmitterSubscription, GestureResponderEvent, NativeTouchEvent} from 'react-native';
import {Dimensions, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import type {OnyxEntry} from 'react-native-onyx';
// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import PhotoCarouselWithUserInfoPanel from '@components/Ieatta/photos/PhotoCarouselWithUserInfoPanel';
import Modal from '@components/Modal';
import {PressableWithFeedback} from '@components/Pressable';
import ScreenWrapper from '@components/ScreenWrapper';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
// import type {PhotosPage} from '@src/types/onyx';
import useThemeStyles from '@hooks/useThemeStyles';
import {queryForPhotos} from '@libs/Firebase/services/firebase-query';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
// import * as PhotosPagesUtils from '@libs/PhotosPagesUtils';
import CONST from '@src/CONST';
import type {IFBPhoto} from '@src/types/firebase';
import type {ContextMenuType, PhotosPageContextMenu} from './PhotosPageContextMenu';

type ContextMenuAnchorCallback = (x: number, y: number) => void;

type ContextMenuAnchor = {
    measureInWindow: (callback: ContextMenuAnchorCallback) => void;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
function PopoverPhotosPageContextMenu(_props: never, ref: ForwardedRef<PhotosPageContextMenu>) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const theme = useTheme();
    const originalReportIDRef = useRef('0');
    const selectionRef = useRef('');
    const reportActionDraftMessageRef = useRef<string>();

    const cursorRelativePosition = useRef({
        horizontal: 0,
        vertical: 0,
    });

    // The horizontal and vertical position (relative to the screen) where the popover will display.
    // const popoverAnchorPosition = useRef({
    //   horizontal: 0,
    //   vertical: 0,
    // });

    // const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [currentRelatedId, setCurrentRelatedId] = useState(CONST.IEATTA_MODEL_ID_EMPTY);
    const [currentPhotoType, setCurrentPhotoType] = useState(CONST.IEATTA_MODEL_ID_EMPTY);
    const [currentInitialPhotoId, setCurrentInitialPhotoId] = useState(CONST.IEATTA_MODEL_ID_EMPTY);

    const contentRef = useRef<View>(null);
    const anchorRef = useRef<View | HTMLDivElement>(null);
    const dimensionsEventListener = useRef<EmitterSubscription | null>(null);
    const contextMenuAnchorRef = useRef<ContextMenuAnchor | null>(null);
    const contextMenuTargetNode = useRef<HTMLElement | null>(null);

    const onPopoverShow = useRef(() => {});
    const onPopoverHide = useRef(() => {});
    const onPopoverHideActionCallback = useRef(() => {});

    /**
 |--------------------------------------------------
 | List(photos)
 |--------------------------------------------------
 */
    const [photosSnapshot, loader] = useCollectionOnce(
        queryForPhotos({
            relatedId: currentRelatedId,
            photoType: currentPhotoType,
        }),
    );

    const photosInPage = photosSnapshot === undefined ? [] : _.map(photosSnapshot.docs, (item) => item.data() as IFBPhoto);

    /** This gets called on Dimensions change to find the anchor coordinates for the action context menu. */
    // const measureContextMenuAnchorPosition = useCallback(() => {
    //   if (!isPopoverVisible) {

    //   }

    //   getContextMenuMeasuredLocation().then(({ x, y }) => {
    //     if (!x || !y) {
    //       return;
    //     }

    //     popoverAnchorPosition.current = {
    //       horizontal: cursorRelativePosition.current.horizontal + x,
    //       vertical: cursorRelativePosition.current.vertical + y,
    //     };
    //   });
    // }, [isPopoverVisible, getContextMenuMeasuredLocation]);

    // useEffect(() => {
    //   dimensionsEventListener.current = Dimensions.addEventListener('change', measureContextMenuAnchorPosition);

    //   return () => {
    //     if (!dimensionsEventListener.current) {
    //       return;
    //     }
    //     dimensionsEventListener.current.remove();
    //   };
    // }, [measureContextMenuAnchorPosition]);

    /**
     * Show the PhotosPageContextMenu modal popover.
     *
     * @param type - context menu type [EMAIL, LINK, REPORT_ACTION]
     * @param [event] - A press event.
     * @param [selection] - Copied content.
     * @param contextMenuAnchor - popoverAnchor
     * @param reportID - Active Report Id
     * @param reportActionID - PhotosPage for ContextMenu
     * @param originalReportID - The currrent Report Id of the PhotosPage
     * @param draftMessage - PhotosPage Draftmessage
     * @param [onShow] - Run a callback when Menu is shown
     * @param [onHide] - Run a callback when Menu is hidden
     * @param isArchivedRoom - Whether the provided report is an archived room
     * @param isChronosReport - Flag to check if the chat participant is Chronos
     * @param isPinnedChat - Flag to check if the chat is pinned in the LHN. Used for the Pin/Unpin action
     * @param isUnreadChat - Flag to check if the chat is unread in the LHN. Used for the Mark as Read/Unread action
     */
    const showContextMenu: PhotosPageContextMenu['showContextMenu'] = (initialPhotoId, relatedId, photoType, onShow = () => {}, onHide = () => {}) => {
        onPopoverShow.current = onShow;
        onPopoverHide.current = onHide;

        setCurrentRelatedId(relatedId);
        setCurrentPhotoType(photoType);
        setCurrentInitialPhotoId(initialPhotoId);

        setIsPopoverVisible(true);
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
        reportIDRef.current = '0';
        reportActionIDRef.current = '0';
        originalReportIDRef.current = '0';

        onPopoverHide.current = runAndResetCallback(onPopoverHide.current);
        onPopoverHideActionCallback.current = runAndResetCallback(onPopoverHideActionCallback.current);
    };

    /**
     * Hide the PhotosPageContextMenu modal popover.
     * @param onHideActionCallback Callback to be called after popover is completely hidden
     */
    const hideContextMenu: PhotosPageContextMenu['hideContextMenu'] = (onHideActionCallback) => {
        if (typeof onHideActionCallback === 'function') {
            onPopoverHideActionCallback.current = onHideActionCallback;
        }

        selectionRef.current = '';
        reportActionDraftMessageRef.current = undefined;
        setIsPopoverVisible(false);

        setCurrentInitialPhotoId(CONST.IEATTA_MODEL_ID_EMPTY);
        setCurrentRelatedId(CONST.IEATTA_MODEL_ID_EMPTY);
        setCurrentPhotoType(CONST.IEATTA_MODEL_ID_EMPTY);
    };

    const confirmDeleteAndHideModal = useCallback(() => {
        // callbackWhenDeleteModalHide.current = () => (onComfirmDeleteModal.current = runAndResetCallback(onComfirmDeleteModal.current));
        // const PhotosPage = reportActionRef.current;
        // if (PhotosPagesUtils.isMoneyRequestAction(PhotosPage) && PhotosPage?.actionName === CONST.REPORT.ACTIONS.TYPE.IOU) {
        //     IOU.deleteMoneyRequest(PhotosPage?.originalMessage?.IOUTransactionID, PhotosPage);
        // } else if (PhotosPage) {
        //     Report.deleteReportComment(reportIDRef.current, PhotosPage);
        // }
        // setIsDeleteCommentConfirmModalVisible(false);
    }, []);

    /** Opens the Confirm delete action modal */
    // const showDeleteModal: PhotosPageContextMenu['showDeleteModal'] = (reportID, PhotosPage, shouldSetModalVisibility = true, onConfirm = () => {}, onCancel = () => {}) => {
    //     onCancelDeleteModal.current = onCancel;
    //     onComfirmDeleteModal.current = onConfirm;
    //
    //     reportIDRef.current = reportID;
    //     // reportActionRef.current = photosPage;
    //
    //     setShouldSetModalVisibilityForDeleteConfirmation(shouldSetModalVisibility);
    //     setIsDeleteCommentConfirmModalVisible(true);
    // };

    useImperativeHandle(ref, () => ({
        showContextMenu,
        hideContextMenu,
        // showDeleteModal,
        // hideDeleteModal,
        // isActivePhotosPage,
        // instanceID,
        runAndResetOnPopoverHide,
        // clearActivePhotosPage,
        // contentRef,
    }));

    // const photosPage = reportActionRef.current;
    const onCloseWithPopoverContext = () => {
        //     if (popover && 'current' in anchorRef) {
        //         close(anchorRef);
        //     }
        //     onClose();
        hideContextMenu();
    };
    const onClose = () => {
        hideContextMenu();
    };

    // An onLayout callback, that initializes the image container, for proper render of an image
    const initializeImageContainer = useCallback(
        (event: {
            nativeEvent: {
                layout: {
                    height: any;
                    width: any;
                };
            };
        }) => {
            // setIsImageContainerInitialized(true);
            // const {height, width} = event.nativeEvent.layout;
            //
            // // Even if the browser height is reduced too much, the relative height should not be negative
            // const relativeHeight = Math.max(height, CONST.AVATAR_CROP_MODAL.INITIAL_SIZE);
            // setImageContainerSize(Math.floor(Math.min(relativeHeight, width)));
        },
        [],
    );

    return (
        <>
            <Modal
                isVisible={isPopoverVisible}
                onClose={onCloseWithPopoverContext}
                type={CONST.MODAL.MODAL_TYPE.CENTERED_SMALL}
                hideModalContentWhileAnimating
                useNativeDriver
                innerContainerStyle={{backgroundColor: 'transparent'}}
                headerContent={
                    <ScreenWrapper
                        screenStyles={[
                            styles.flexRow,
                            {
                                width: variables.popoverPhotoCarouselItemWidth + variables.popoverPhotoUserInfoWidth,
                            },
                        ]}
                        style={[styles.pb0, {backgroundColor: 'transparent'}]}
                        includePaddingTop={false}
                        includeSafeAreaPaddingBottom={false}
                        testID={PopoverPhotosPageContextMenu.displayName}
                    >
                        <HeaderWithBackButton
                            headerStyles={{
                                height: variables.popoverHeaderHeight,
                            }}
                            iconFill={TailwindColors.white}
                            shouldShowCloseButton
                            shouldShowBackButton={false}
                            shouldShowTitle={false}
                            title={translate('avatarCropModal.title')}
                            onCloseButtonPress={onClose}
                        >
                            <View style={[styles.mr2]}>
                                <Tooltip text={translate('common.close')}>
                                    <PressableWithFeedback
                                        accessibilityLabel={translate('common.close')}
                                        onPress={onClose}
                                    >
                                        <Text style={[styles.base, styles.fontSemiBold, {color: TailwindColors.white}]}>{translate('common.close')}</Text>
                                    </PressableWithFeedback>
                                </Tooltip>
                            </View>
                        </HeaderWithBackButton>
                    </ScreenWrapper>
                }
            >
                <GestureHandlerRootView
                    onLayout={initializeImageContainer}
                    style={[styles.alignSelfStretch, styles.flex1, styles.alignItemsCenter, styles.sectionComponentContainer]}
                >
                    <PhotoCarouselWithUserInfoPanel
                        pageViewId={`photosCarousel-${currentRelatedId}-${photosInPage.length}`}
                        initialPhotoId={currentInitialPhotoId}
                        photosInPage={photosInPage}
                    />
                </GestureHandlerRootView>
            </Modal>
        </>
    );
}

PopoverPhotosPageContextMenu.displayName = 'PopoverPhotosPageContextMenu';

export default forwardRef(PopoverPhotosPageContextMenu);
