/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import type {ForwardedRef} from 'react';
import React, {forwardRef, useCallback, useImperativeHandle, useRef, useState} from 'react';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import Hoverable from '@components/Hoverable';
import PhotoCarouselWithUserInfoPanel from '@components/Ieatta/photos/PhotoCarouselWithUserInfoPanel';
import Modal from '@components/Modal';
import {PressableWithFeedback} from '@components/Pressable';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import {getPhotoIndexWithId} from '@libs/ieatta/photoUtils';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import type {IFBPhoto} from '@src/types/firebase';
import type {PhotosPageContextMenu} from './PhotosPageContextMenu';

function PopoverPhotosPageContextMenu(_props: unknown, ref: ForwardedRef<PhotosPageContextMenu>) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const selectionRef = useRef('');
    const reportActionDraftMessageRef = useRef<string>();

    const [isPopoverVisible, setIsPopoverVisible] = useState<boolean>(false);
    const [currentRelatedId, setCurrentRelatedId] = useState<string>(CONST.IEATTA_MODEL_ID_EMPTY);
    const [currentPhotoType, setCurrentPhotoType] = useState<string>(CONST.IEATTA_MODEL_ID_EMPTY);
    const [currentInitialPhotoId, setCurrentInitialPhotoId] = useState<string>(CONST.IEATTA_MODEL_ID_EMPTY);

    const onPopoverShow = useRef(() => {});
    const onPopoverHide = useRef(() => {});
    const onPopoverHideActionCallback = useRef(() => {});

    /**
 |--------------------------------------------------
 | List(photos)
 |--------------------------------------------------
 */
    const [photosSnapshot, loader] = useCollectionOnce(
        FirebaseQuery.queryForPhotos({
            relatedId: currentRelatedId,
            photoType: currentPhotoType,
        }),
    );

    const photosInPage = photosSnapshot === undefined ? [] : _.map(photosSnapshot.docs, (item) => item.data() as IFBPhoto);
    const pageIndex = getPhotoIndexWithId(photosInPage, currentInitialPhotoId);

    /**
     * Show the PhotosPageContextMenu modal popover.
     *
     * @param initialPhotoId
     * @param relatedId
     * @param photoType
     * @param [onShow] - Run a callback when Menu is shown
     * @param [onHide] - Run a callback when Menu is hidden
     */
    const showContextMenu: PhotosPageContextMenu['showContextMenu'] = ({initialPhotoId, relatedId, photoType, onShow = () => {}, onHide = () => {}}) => {
        onPopoverShow.current = onShow;
        onPopoverHide.current = onHide;

        setCurrentRelatedId(relatedId);
        setCurrentPhotoType(photoType);
        setCurrentInitialPhotoId(initialPhotoId);

        setIsPopoverVisible(true);
    };

    /** Run the callback and return a noop function to reset it */
    const runAndResetCallback = (callback: () => void) => {
        callback();
        return () => {};
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

    /** After Popover hides, call the registered onPopoverHide & onPopoverHideActionCallback callback and reset it */
    const runAndResetOnPopoverHide = () => {
        onPopoverHide.current = runAndResetCallback(onPopoverHide.current);
        onPopoverHideActionCallback.current = runAndResetCallback(onPopoverHideActionCallback.current);
    };

    /** After Popover shows, call the registered onPopoverShow callback and reset it */
    const runAndResetOnPopoverShow = () => {
        onPopoverShow.current();

        // After we have called the action, reset it.
        onPopoverShow.current = () => {};
    };

    useImperativeHandle(ref, () => ({
        showContextMenu,
        hideContextMenu,
        runAndResetOnPopoverHide,
        instanceID: currentRelatedId,
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
    const initializeImageContainer = useCallback(() => {
        // setIsImageContainerInitialized(true);
        // const {height, width} = event.nativeEvent.layout;
        //
        // // Even if the browser height is reduced too much, the relative height should not be negative
        // const relativeHeight = Math.max(height, CONST.AVATAR_CROP_MODAL.INITIAL_SIZE);
        // setImageContainerSize(Math.floor(Math.min(relativeHeight, width)));
    }, []);

    return (
        <Modal
            isVisible={isPopoverVisible}
            onClose={onCloseWithPopoverContext}
            type={CONST.MODAL.MODAL_TYPE.CENTERED_SMALL}
            hideModalContentWhileAnimating
            useNativeDriver
            innerContainerStyle={{backgroundColor: 'blue'}}
            headerContent={
                <HeaderWithBackButton
                    headerStyles={{
                        width: variables.popoverPhotoCarouselItemWidth + variables.popoverPhotoUserInfoWidth,
                        height: variables.popoverHeaderHeight,
                    }}
                    iconFill={TailwindColors.white}
                    shouldShowCloseButton
                    shouldShowBackButton={false}
                    // shouldShowTitle={false}
                    onCloseButtonPress={onClose}
                >
                    <View style={[styles.mr2]}>
                        <Hoverable>
                            {(hovered) => (
                                <PressableWithFeedback
                                    accessibilityLabel={translate('common.close')}
                                    onPress={onClose}
                                >
                                    <Text style={[styles.base, styles.fontSemiBold, hovered && styles.textUnderline, {color: TailwindColors.white}]}>{translate('common.close')}</Text>
                                </PressableWithFeedback>
                            )}
                        </Hoverable>
                    </View>
                </HeaderWithBackButton>
            }
        >
            <GestureHandlerRootView
                onLayout={initializeImageContainer}
                style={[styles.alignSelfStretch, styles.flex1, styles.alignItemsCenter, styles.sectionComponentContainer]}
            >
                <View
                    style={{
                        width: variables.popoverPhotoCarouselItemWidth + variables.popoverPhotoUserInfoWidth,
                    }}
                >
                    <PhotoCarouselWithUserInfoPanel
                        relatedId={currentRelatedId}
                        photoType={currentPhotoType}
                        pageViewId={`photosCarousel-${currentRelatedId}-${photosInPage.length}`}
                        pageIndex={pageIndex}
                        photosInPage={photosInPage}
                        photoHeight={variables.popoverPhotoCarouselItemHeight}
                    />
                </View>
            </GestureHandlerRootView>
        </Modal>
    );
}

PopoverPhotosPageContextMenu.displayName = 'PopoverPhotosPageContextMenu';

export default forwardRef(PopoverPhotosPageContextMenu);
