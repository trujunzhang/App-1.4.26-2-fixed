/* eslint-disable react-compiler/react-compiler */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/prefer-optional-chain */
import {useFocusEffect} from '@react-navigation/core';
import {useRealm} from '@realm/react';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useCallback, useRef, useState} from 'react';
import {ActivityIndicator, Alert, AppState, InteractionManager, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {withOnyx} from 'react-native-onyx';
import {RESULTS} from 'react-native-permissions';
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming} from 'react-native-reanimated';
import type {Camera, PhotoFile, Point} from 'react-native-vision-camera';
import {useCameraDevice} from 'react-native-vision-camera';
import Hand from '@assets/images/hand.svg';
import Shutter from '@assets/images/shutter.svg';
import AttachmentPicker from '@components/AttachmentPicker';
import Button from '@components/Button';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import ImageSVG from '@components/ImageSVG';
import PressableWithFeedback from '@components/Pressable/PressableWithFeedback';
import Text from '@components/Text';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import * as FileUtils from '@libs/fileDownload/FileUtils';
import {ParseModelSqlPhotos} from '@libs/FirebaseIeatta/appModel';
import {PhotoType} from '@libs/FirebaseIeatta/constant';
import {getAuthUserFromPersonalDetails} from '@libs/FirebaseIeatta/models/auth_user_model';
import FirebasePhoto from '@libs/FirebaseIeatta/services/firebase-photo';
import {documentIdFromCurrentDate} from '@libs/FirebaseIeatta/utils/md5_utils';
import {navigationToEditPhoto} from '@libs/ieatta/editFormUtils';
import * as ShowNotify from '@libs/ieatta/Notify';
import Log from '@libs/Log';
import Navigation from '@libs/Navigation/Navigation';
import {RealmCollections, RealmWriteMode} from '@libs/Realm/constant';
import RealmHelper from '@libs/Realm/services/realm-helper';
import CONST from '@src/CONST';
import CameraPermission from './CameraPermission';
import NavigationAwareCamera from './NavigationAwareCamera';
import TakePhotoScreenWrapper from './TakePhotoScreenWrapper';
import type {IEATTATakePhotoPageOnyxProps, IEATTATakePhotoPageProps} from './types';

function IEATTATakePhotoPage({route}: IEATTATakePhotoPageProps) {
    const {isSmallScreenWidth} = useResponsiveLayout();
    const realm = useRealm();

    const personalData = useCurrentUserPersonalDetails();

    const relatedId = lodashGet(route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const photoType = lodashGet(route, 'params.photoType', PhotoType.Unknown);
    const pageId = lodashGet(route, 'params.pageId', CONST.IEATTA_LOCAL_PHOTOS_SHOW_ALL);

    const toastId = React.useRef<number | string | null>(null);

    const theme = useTheme();
    const styles = useThemeStyles();
    const device = useCameraDevice('back', {
        physicalDevices: ['wide-angle-camera', 'ultra-wide-angle-camera'],
    });

    const hasFlash = device != null && device.hasFlash;
    const camera = useRef<Camera>(null);
    const [flash, setFlash] = useState(false);
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState<string | null>(null);
    const [didCapturePhoto, setDidCapturePhoto] = useState(false);

    const {translate} = useLocalize();

    const askForPermissions = () => {
        // There's no way we can check for the BLOCKED status without requesting the permission first
        // https://github.com/zoontek/react-native-permissions/blob/a836e114ce3a180b2b23916292c79841a267d828/README.md?plain=1#L670
        CameraPermission.requestCameraPermission?.()
            .then((status: string) => {
                setCameraPermissionStatus(status);

                if (status === RESULTS.BLOCKED) {
                    FileUtils.showCameraPermissionsAlert();
                }
            })
            .catch(() => {
                setCameraPermissionStatus(RESULTS.UNAVAILABLE);
            });
    };

    const focusIndicatorOpacity = useSharedValue(0);
    const focusIndicatorScale = useSharedValue(2);
    const focusIndicatorPosition = useSharedValue({x: 0, y: 0});

    const cameraFocusIndicatorAnimatedStyle = useAnimatedStyle(() => ({
        opacity: focusIndicatorOpacity.value,
        transform: [{translateX: focusIndicatorPosition.value.x}, {translateY: focusIndicatorPosition.value.y}, {scale: focusIndicatorScale.value}],
    }));

    const focusCamera = (point: Point) => {
        if (!camera.current) {
            return;
        }

        camera.current.focus(point).catch((ex) => {
            if (ex.message === '[unknown/unknown] Cancelled by another startFocusAndMetering()') {
                return;
            }
            Log.warn('Error focusing camera', ex);
        });
    };

    const tapGesture = Gesture.Tap()
        .enabled(device?.supportsFocus ?? false)
        .onStart((ev: {x: number; y: number}) => {
            const point = {x: ev.x, y: ev.y};

            focusIndicatorOpacity.value = withSequence(withTiming(0.8, {duration: 250}), withDelay(1000, withTiming(0, {duration: 250})));
            focusIndicatorScale.value = 2;
            focusIndicatorScale.value = withSpring(1, {damping: 10, stiffness: 200});
            focusIndicatorPosition.value = point;

            runOnJS(focusCamera)(point);
        });

    useFocusEffect(
        useCallback(() => {
            setDidCapturePhoto(false);
            const refreshCameraPermissionStatus = () => {
                CameraPermission?.getCameraPermissionStatus?.()
                    .then(setCameraPermissionStatus)
                    .catch(() => setCameraPermissionStatus(RESULTS.UNAVAILABLE));
            };

            InteractionManager.runAfterInteractions(() => {
                // Check initial camera permission status
                refreshCameraPermissionStatus();
            });

            // Refresh permission status when app gain focus
            const subscription = AppState.addEventListener('change', (appState) => {
                if (appState !== 'active') {
                    return;
                }

                refreshCameraPermissionStatus();
            });

            return () => {
                subscription.remove();
            };
        }, []),
    );

    const navigateBack = () => {
        Navigation.goBack();
    };

    const capturePhoto = useCallback(() => {
        if (!camera.current && (cameraPermissionStatus === RESULTS.DENIED || cameraPermissionStatus === RESULTS.BLOCKED)) {
            askForPermissions();
            return;
        }

        const showCameraAlert = () => {
            Alert.alert(translate('receipt.cameraErrorTitle'), translate('receipt.cameraErrorMessage'));
        };

        if (!camera.current) {
            showCameraAlert();
        }

        if (didCapturePhoto) {
            return;
        }

        setDidCapturePhoto(true);

        toastId.current = ShowNotify.initialAndShowNotify({isSmallScreenWidth, message: translate('notify.takePhoto.start'), autoClose: false});
        let currentPhotoPath: string | null = null;
        const firebasePhotoId = documentIdFromCurrentDate();
        camera?.current
            ?.takePhoto({
                flash: flash && hasFlash ? 'on' : 'off',
                enableShutterSound: false,
            })
            .then((photo: PhotoFile) => {
                // Store the receipt on the transaction object in Onyx
                const source = `file://${photo.path}`;
                currentPhotoPath = photo.path;

                Log.info('');
                Log.info('================================');
                Log.info(`currentPhotoPath in the take photo: ${currentPhotoPath}`);
                Log.info('================================');
                Log.info('');

                const authUserModel = getAuthUserFromPersonalDetails(personalData);
                if (_.isUndefined(authUserModel)) {
                    ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.auth.unAuthed')});
                    return;
                }

                return FirebasePhoto.saveTakenPhotoIfOffline({
                    imagePath: currentPhotoPath,
                    isOnWeb: false,
                    emptyParams: {authUserModel, photoUniqueId: firebasePhotoId, relatedId, photoType, filePath: currentPhotoPath},
                });
            })
            .then(() => {
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, message: translate('notify.takePhoto.success')});
                // navigationToEditPhoto({photoId: firebasePhotoId});
            })
            .catch((error: string) => {
                Log.warn('Error taking photo', error);
                if (currentPhotoPath !== null) {
                    const sqlPhotoModel = ParseModelSqlPhotos.emptySqlPhoto({filePath: currentPhotoPath, firebasePhotoId, pageId, relatedId, photoType});
                    new RealmHelper(realm).setDataIfNotExist({
                        collection: RealmCollections.SqlPhotos,
                        docId: sqlPhotoModel.uniqueId,
                        model: sqlPhotoModel,
                        mode: RealmWriteMode.Never,
                    });
                }
                ShowNotify.updateNotify({isSmallScreenWidth, id: toastId.current, type: 'error', message: translate('notify.takePhoto.error.noNetWork')});
            })
            .finally(() => {
                setDidCapturePhoto(false);
            });
    }, [cameraPermissionStatus, didCapturePhoto, isSmallScreenWidth, translate, flash, hasFlash, personalData, relatedId, photoType, pageId, realm]);

    // Wait for camera permission status to render
    if (cameraPermissionStatus == null) {
        return null;
    }

    return (
        <TakePhotoScreenWrapper
            includeSafeAreaPaddingBottom
            headerTitle={translate('photos.takePhoto.title')}
            onBackButtonPress={navigateBack}
            shouldShowWrapper
            photoPageId={pageId}
            testID={IEATTATakePhotoPage.displayName}
        >
            {cameraPermissionStatus !== RESULTS.GRANTED && (
                <View style={[styles.cameraView, styles.permissionView, styles.userSelectNone]}>
                    <ImageSVG
                        contentFit="contain"
                        src={Hand}
                        width={CONST.RECEIPT.HAND_ICON_WIDTH}
                        height={CONST.RECEIPT.HAND_ICON_HEIGHT}
                        style={styles.pb5}
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
            {cameraPermissionStatus === RESULTS.GRANTED && device == null && (
                <View style={[styles.cameraView]}>
                    <ActivityIndicator
                        size={CONST.ACTIVITY_INDICATOR_SIZE.LARGE}
                        style={[styles.flex1]}
                        color={theme.textSupporting}
                    />
                </View>
            )}
            {cameraPermissionStatus === RESULTS.GRANTED && device != null && (
                <View style={[styles.cameraView]}>
                    <GestureDetector gesture={tapGesture}>
                        <View style={styles.flex1}>
                            <NavigationAwareCamera
                                ref={camera}
                                device={device}
                                // @ts-expect-error The HOC are not migrated to TypeScript yet
                                style={[styles.flex1]}
                                zoom={device.neutralZoom}
                                photo
                                cameraTabIndex={1}
                                orientation="portrait"
                            />
                            <Animated.View style={[styles.cameraFocusIndicator, cameraFocusIndicatorAnimatedStyle]} />
                        </View>
                    </GestureDetector>
                </View>
            )}
            <View style={[styles.flexRow, styles.justifyContentAround, styles.alignItemsCenter, styles.pv3]}>
                <AttachmentPicker>
                    {() => (
                        <PressableWithFeedback
                            role={CONST.ROLE.BUTTON}
                            accessibilityLabel={translate('receipt.gallery')}
                            style={[styles.alignItemsStart]}
                            onPress={() => {
                                // openPicker({
                                //     onPicked: setReceiptAndNavigate,
                                // });
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
                    role={CONST.ROLE.BUTTON}
                    accessibilityLabel={translate('receipt.shutter')}
                    style={[styles.alignItemsCenter]}
                    onPress={capturePhoto}
                >
                    <ImageSVG
                        contentFit="contain"
                        src={Shutter}
                        width={CONST.RECEIPT.SHUTTER_SIZE}
                        height={CONST.RECEIPT.SHUTTER_SIZE}
                    />
                </PressableWithFeedback>
                {hasFlash && (
                    <PressableWithFeedback
                        role={CONST.ROLE.BUTTON}
                        accessibilityLabel={translate('receipt.flash')}
                        style={[styles.alignItemsEnd]}
                        disabled={cameraPermissionStatus !== RESULTS.GRANTED}
                        onPress={() => setFlash((prevFlash) => !prevFlash)}
                    >
                        <Icon
                            height={32}
                            width={32}
                            src={Expensicons.Bolt}
                            fill={flash ? theme.iconHovered : theme.textSupporting}
                        />
                    </PressableWithFeedback>
                )}
            </View>
        </TakePhotoScreenWrapper>
    );
}

IEATTATakePhotoPage.displayName = 'IEATTATakePhotoPage';

const IEATTATakePhotoPageWithOnyx = withOnyx<IEATTATakePhotoPageProps, IEATTATakePhotoPageOnyxProps>({})(IEATTATakePhotoPage);

export default IEATTATakePhotoPageWithOnyx;
