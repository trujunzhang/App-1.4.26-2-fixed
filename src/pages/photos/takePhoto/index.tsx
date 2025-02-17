/* eslint-disable rulesdir/prefer-type-fest */

/* eslint-disable rulesdir/prefer-at */
import lodashGet from 'lodash/get';
import React, {useCallback, useContext, useEffect, useReducer, useRef, useState} from 'react';
import {ActivityIndicator, PanResponder, PixelRatio, View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import type Webcam from 'react-webcam';
import Hand from '@assets/images/hand.svg';
import ReceiptUpload from '@assets/images/receipt-upload.svg';
import Shutter from '@assets/images/shutter.svg';
import type {FileObject} from '@components/AttachmentModal';
import AttachmentPicker from '@components/AttachmentPicker';
import Button from '@components/Button';
import ConfirmModal from '@components/ConfirmModal';
import CopyTextToClipboard from '@components/CopyTextToClipboard';
import {DragAndDropContext} from '@components/DragAndDrop/Provider';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import PressableWithFeedback from '@components/Pressable/PressableWithFeedback';
import Text from '@components/Text';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useTabNavigatorFocus from '@hooks/useTabNavigatorFocus';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import * as Browser from '@libs/Browser';
import * as FileUtils from '@libs/fileDownload/FileUtils';
import {PhotoType} from '@libs/FirebaseIeatta/constant';
import Navigation from '@libs/Navigation/Navigation';
import ReceiptDropUI from '@expPages/iou/ReceiptDropUI';
import CONST from '@src/CONST';
import type {TranslationPaths} from '@src/languages/types';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import NavigationAwareCamera from './NavigationAwareCamera';
import TakePhotoScreenDragAndDropWrapper from './TakePhotoScreenDragAndDropWrapper';
import type {IEATTATakePhotoPageOnyxProps, IEATTATakePhotoPageProps} from './types';

function IEATTATakePhotoPage({route}: Omit<IEATTATakePhotoPageProps, 'user'>) {
    const relatedId = lodashGet(route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const photoType = lodashGet(route, 'params.photoType', PhotoType.Unknown);

    const theme = useTheme();
    const styles = useThemeStyles();

    // Grouping related states
    const [isAttachmentInvalid, setIsAttachmentInvalid] = useState(false);
    const [attachmentInvalidReasonTitle, setAttachmentInvalidReasonTitle] = useState<TranslationPaths>();
    const [attachmentInvalidReason, setAttachmentValidReason] = useState<TranslationPaths>();

    const [receiptImageTopPosition, setReceiptImageTopPosition] = useState(0);
    const {isSmallScreenWidth} = useResponsiveLayout();
    const {translate} = useLocalize();
    const {isDraggingOver} = useContext(DragAndDropContext);

    const [cameraPermissionState, setCameraPermissionState] = useState<PermissionState | undefined>('prompt');
    const [isFlashLightOn, toggleFlashlight] = useReducer((state) => !state, false);
    const [isTorchAvailable, setIsTorchAvailable] = useState(false);
    const cameraRef = useRef<Webcam>(null);
    const trackRef = useRef<MediaStreamTrack | null>(null);
    const [isQueriedPermissionState, setIsQueriedPermissionState] = useState(false);

    const getScreenshotTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [videoConstraints, setVideoConstraints] = useState<MediaTrackConstraints>();
    const tabIndex = 1;
    const isTabActive = useTabNavigatorFocus({tabIndex});

    /**
     * On phones that have ultra-wide lens, react-webcam uses ultra-wide by default.
     * The last deviceId is of regular len camera.
     */
    const requestCameraPermission = useCallback(() => {
        if (!isEmptyObject(videoConstraints) || !Browser.isMobile()) {
            return;
        }

        const defaultConstraints = {facingMode: {exact: 'environment'}};
        navigator.mediaDevices
            .getUserMedia({video: {facingMode: {exact: 'environment'}, zoom: {ideal: 1}}})
            .then((stream) => {
                setCameraPermissionState('granted');
                stream.getTracks().forEach((track) => track.stop());
                // Only Safari 17+ supports zoom constraint
                if (Browser.isMobileSafari() && stream.getTracks().length > 0) {
                    let deviceId;
                    for (const track of stream.getTracks()) {
                        const setting = track.getSettings();
                        if (setting.zoom === 1) {
                            deviceId = setting.deviceId;
                            break;
                        }
                    }
                    if (deviceId) {
                        setVideoConstraints({deviceId});
                        return;
                    }
                }
                if (!navigator.mediaDevices.enumerateDevices) {
                    setVideoConstraints(defaultConstraints);
                    return;
                }
                navigator.mediaDevices.enumerateDevices().then((devices) => {
                    let lastBackDeviceId = '';
                    for (let i = devices.length - 1; i >= 0; i--) {
                        const device = devices[i];
                        if (device.kind === 'videoinput') {
                            lastBackDeviceId = device.deviceId;
                            break;
                        }
                    }
                    if (!lastBackDeviceId) {
                        setVideoConstraints(defaultConstraints);
                        return;
                    }
                    setVideoConstraints({deviceId: lastBackDeviceId});
                });
            })
            .catch(() => {
                setVideoConstraints(defaultConstraints);
                setCameraPermissionState('denied');
            });
    }, [videoConstraints]);

    useEffect(() => {
        if (!Browser.isMobile() || !isTabActive) {
            return;
        }
        navigator.permissions
            .query({
                name: 'camera',
            })
            .then((permissionState) => {
                setCameraPermissionState(permissionState.state);
                if (permissionState.state === 'granted') {
                    requestCameraPermission();
                }
            })
            .catch(() => {
                setCameraPermissionState('denied');
            })
            .finally(() => {
                setIsQueriedPermissionState(true);
            });
        // We only want to get the camera permission status when the component is mounted
    }, [isTabActive, requestCameraPermission]);

    const hideRecieptModal = () => {
        setIsAttachmentInvalid(false);
    };

    /**
     * Sets the upload receipt error modal content when an invalid receipt is uploaded
     */
    const setUploadReceiptError = (isInvalid: boolean, title: TranslationPaths, reason: TranslationPaths) => {
        setIsAttachmentInvalid(isInvalid);
        setAttachmentInvalidReasonTitle(title);
        setAttachmentValidReason(reason);
    };

    function validateReceipt(file: FileObject) {
        return FileUtils.validateImageForCorruption(file)
            .then(() => {
                const {fileExtension} = FileUtils.splitExtensionFromFileName(file?.name ?? '');
                if (
                    !CONST.API_ATTACHMENT_VALIDATIONS.ALLOWED_RECEIPT_EXTENSIONS.includes(
                        fileExtension.toLowerCase() as (typeof CONST.API_ATTACHMENT_VALIDATIONS.ALLOWED_RECEIPT_EXTENSIONS)[number],
                    )
                ) {
                    setUploadReceiptError(true, 'attachmentPicker.wrongFileType', 'attachmentPicker.notAllowedExtension');
                    return false;
                }

                if ((file?.size ?? 0) > CONST.API_ATTACHMENT_VALIDATIONS.MAX_SIZE) {
                    setUploadReceiptError(true, 'attachmentPicker.attachmentTooLarge', 'attachmentPicker.sizeExceeded');
                    return false;
                }

                if ((file?.size ?? 0) < CONST.API_ATTACHMENT_VALIDATIONS.MIN_SIZE) {
                    setUploadReceiptError(true, 'attachmentPicker.attachmentTooSmall', 'attachmentPicker.sizeNotMet');
                    return false;
                }

                return true;
            })
            .catch(() => {
                // setUploadReceiptError(true, 'attachmentPicker.attachmentError', 'attachmentPicker.errorWhileSelectingCorruptedImage');
                setUploadReceiptError(true, 'attachmentPicker.attachmentError', 'attachmentPicker.errorWhileSelectingCorruptedAttachment');
                return false;
            });
    }

    const navigateBack = () => {
        Navigation.goBack();
    };

    const navigateToConfirmationStep = useCallback((file: FileObject, source: string) => {}, []);

    const updateScanAndNavigate = useCallback((file: FileObject, source: string) => {
        Navigation.dismissModal();
    }, []);

    /**
     * Sets the Receipt objects and navigates the user to the next page
     */
    const setReceiptAndNavigate = (file: FileObject) => {
        validateReceipt(file).then((isFileValid) => {
            if (!isFileValid) {
                return;
            }
            // Store the receipt on the transaction object in Onyx
            const source = URL.createObjectURL(file as Blob);

            navigateToConfirmationStep(file, source);
        });
    };

    const setupCameraPermissionsAndCapabilities = (stream: MediaStream) => {
        setCameraPermissionState('granted');

        const [track] = stream.getVideoTracks();
        const capabilities = track.getCapabilities();

        if ('torch' in capabilities && capabilities.torch) {
            trackRef.current = track;
        }
        setIsTorchAvailable('torch' in capabilities && !!capabilities.torch);
    };

    const getScreenshot = useCallback(() => {
        if (!cameraRef.current) {
            requestCameraPermission();
            return;
        }

        const imageBase64 = cameraRef.current.getScreenshot();

        const filename = `receipt_${Date.now()}.png`;
        const file = FileUtils.base64ToFile(imageBase64 ?? '', filename);
        const source = URL.createObjectURL(file);
        // IOU.setMoneyRequestReceipt(transactionID, source, file.name, action !== CONST.IOU.ACTION.EDIT);

        // if (action === CONST.IOU.ACTION.EDIT) {
        //     updateScanAndNavigate(file, source);
        //     return;
        // }

        navigateToConfirmationStep(file, source);
    }, [navigateToConfirmationStep, requestCameraPermission]);

    const clearTorchConstraints = useCallback(() => {
        if (!trackRef.current) {
            return;
        }
        trackRef.current.applyConstraints({
            advanced: [{torch: false}],
        });
    }, []);

    const capturePhoto = useCallback(() => {
        if (trackRef.current && isFlashLightOn) {
            trackRef.current
                .applyConstraints({
                    advanced: [{torch: true}],
                })
                .then(() => {
                    getScreenshotTimeoutRef.current = setTimeout(() => {
                        getScreenshot();
                        clearTorchConstraints();
                    }, 2000);
                });
            return;
        }

        getScreenshot();
    }, [isFlashLightOn, getScreenshot, clearTorchConstraints]);

    const panResponder = useRef(
        PanResponder.create({
            onPanResponderTerminationRequest: () => false,
        }),
    ).current;

    useEffect(
        () => () => {
            if (!getScreenshotTimeoutRef.current) {
                return;
            }
            clearTimeout(getScreenshotTimeoutRef.current);
        },
        [],
    );

    const mobileCameraView = () => (
        <>
            <View style={[styles.cameraView]}>
                {((cameraPermissionState === 'prompt' && !isQueriedPermissionState) || (cameraPermissionState === 'granted' && isEmptyObject(videoConstraints))) && (
                    <ActivityIndicator
                        size={CONST.ACTIVITY_INDICATOR_SIZE.LARGE}
                        style={[styles.flex1]}
                        color={theme.textSupporting}
                    />
                )}
                {cameraPermissionState !== 'granted' && isQueriedPermissionState && (
                    <View style={[styles.flex1, styles.permissionView, styles.userSelectNone]}>
                        <Icon
                            src={Hand}
                            width={CONST.RECEIPT.HAND_ICON_WIDTH}
                            height={CONST.RECEIPT.HAND_ICON_HEIGHT}
                            additionalStyles={[styles.pb5]}
                        />
                        <Text style={[styles.textReceiptUpload]}>{translate('receipt.takePhoto')}</Text>
                        <Text style={[styles.subTextReceiptUpload]}>{translate('receipt.cameraAccess')}</Text>
                        <Button
                            medium
                            success
                            text={translate('common.continue')}
                            accessibilityLabel={translate('common.continue')}
                            style={[styles.p9, styles.pt5]}
                            onPress={capturePhoto}
                        />
                    </View>
                )}
                {cameraPermissionState === 'granted' && !isEmptyObject(videoConstraints) && (
                    <NavigationAwareCamera
                        onUserMedia={setupCameraPermissionsAndCapabilities}
                        onUserMediaError={() => setCameraPermissionState('denied')}
                        style={{...styles.videoContainer, display: cameraPermissionState !== 'granted' ? 'none' : 'block'}}
                        ref={cameraRef}
                        screenshotFormat="image/png"
                        videoConstraints={videoConstraints}
                        forceScreenshotSourceSize
                        cameraTabIndex={tabIndex}
                        audio={false}
                        disablePictureInPicture={false}
                        imageSmoothing={false}
                        mirrored={false}
                        screenshotQuality={0}
                    />
                )}
            </View>

            <View style={[styles.flexRow, styles.justifyContentAround, styles.alignItemsCenter, styles.pv3]}>
                <AttachmentPicker>
                    {({openPicker}) => (
                        <PressableWithFeedback
                            accessibilityLabel={translate('common.chooseFile')}
                            // role={CONST.ACCESSIBILITY_ROLE.BUTTON}
                            onPress={() => {
                                openPicker({
                                    onPicked: setReceiptAndNavigate,
                                });
                            }}
                        >
                            <Icon
                                height={32}
                                width={32}
                                src={Expensicons.Gallery}
                                fill={theme.textSupporting}
                            />
                        </PressableWithFeedback>
                    )}
                </AttachmentPicker>
                <PressableWithFeedback
                    // role={CONST.ACCESSIBILITY_ROLE.BUTTON}
                    accessibilityLabel={translate('receipt.shutter')}
                    style={[styles.alignItemsCenter]}
                    onPress={capturePhoto}
                >
                    <Shutter
                        width={CONST.RECEIPT.SHUTTER_SIZE}
                        height={CONST.RECEIPT.SHUTTER_SIZE}
                    />
                </PressableWithFeedback>
                <PressableWithFeedback
                    // role={CONST.ACCESSIBILITY_ROLE.BUTTON}
                    accessibilityLabel={translate('receipt.flash')}
                    style={[styles.alignItemsEnd, !isTorchAvailable && styles.opacity0]}
                    onPress={toggleFlashlight}
                    disabled={!isTorchAvailable}
                >
                    <Icon
                        height={32}
                        width={32}
                        src={Expensicons.Bolt}
                        fill={isFlashLightOn ? theme.iconHovered : theme.textSupporting}
                    />
                </PressableWithFeedback>
            </View>
        </>
    );

    const desktopUploadView = () => (
        <>
            <View onLayout={({nativeEvent}) => setReceiptImageTopPosition(PixelRatio.roundToNearestPixel((nativeEvent.layout as DOMRect).top))}>
                <ReceiptUpload
                    width={CONST.RECEIPT.ICON_SIZE}
                    height={CONST.RECEIPT.ICON_SIZE}
                />
            </View>

            <View
                style={[styles.receiptViewTextContainer, styles.userSelectNone]}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...panResponder.panHandlers}
            >
                <Text style={[styles.textReceiptUpload]}>{translate('receipt.upload')}</Text>
                <Text style={[styles.subTextReceiptUpload]}>
                    {isSmallScreenWidth ? translate('receipt.chooseReceipt') : translate('receipt.dragReceiptBeforeEmail')}
                    <CopyTextToClipboard
                        text={CONST.EMAIL.RECEIPTS}
                        textStyles={[styles.textBlue]}
                    />
                    {isSmallScreenWidth ? null : translate('receipt.dragReceiptAfterEmail')}
                </Text>
            </View>

            <AttachmentPicker>
                {({openPicker}) => (
                    <Button
                        medium
                        success
                        text={translate('common.chooseFile')}
                        accessibilityLabel={translate('common.chooseFile')}
                        style={[styles.p9]}
                        onPress={() => {
                            openPicker({
                                onPicked: setReceiptAndNavigate,
                            });
                        }}
                    />
                )}
            </AttachmentPicker>
        </>
    );

    return (
        <TakePhotoScreenDragAndDropWrapper
            headerTitle={translate('photos.takePhoto.title')}
            onBackButtonPress={navigateBack}
            shouldShowWrapper
            testID={IEATTATakePhotoPage.displayName}
        >
            <View
                style={[
                    styles.flex1,
                    // TODO: djzhang(2024/11/05)
                    // !Browser.isMobile()
                    // && styles.uploadReceiptView(isSmallScreenWidth)
                ]}
            >
                {!isDraggingOver && (Browser.isMobile() ? mobileCameraView() : desktopUploadView())}
                <ReceiptDropUI
                    onDrop={(e) => {
                        const file = e?.dataTransfer?.files[0];
                        if (file) {
                            file.uri = URL.createObjectURL(file);
                            setReceiptAndNavigate(file);
                        }
                    }}
                    receiptImageTopPosition={receiptImageTopPosition}
                />
                <ConfirmModal
                    title={attachmentInvalidReasonTitle ? translate(attachmentInvalidReasonTitle) : ''}
                    onConfirm={hideRecieptModal}
                    onCancel={hideRecieptModal}
                    isVisible={isAttachmentInvalid}
                    prompt={attachmentInvalidReason ? translate(attachmentInvalidReason) : ''}
                    confirmText={translate('common.close')}
                    shouldShowCancelButton={false}
                />
            </View>
        </TakePhotoScreenDragAndDropWrapper>
    );
}

IEATTATakePhotoPage.displayName = 'IEATTATakePhotoPage';

const IEATTATakePhotoPageWithOnyx = withOnyx<Omit<IEATTATakePhotoPageProps, 'user'>, Omit<IEATTATakePhotoPageOnyxProps, 'user'>>({})(IEATTATakePhotoPage);

export default IEATTATakePhotoPageWithOnyx;
