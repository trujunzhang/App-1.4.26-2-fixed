import {getLocationPermission, requestLocationPermission} from '@expPages/iou/request/step/IOURequestStepScan/LocationPermission';
import React, {useEffect, useMemo, useState} from 'react';
import {Linking} from 'react-native';
import {RESULTS} from 'react-native-permissions';
import ConfirmModal from '@components/ConfirmModal';
import * as Illustrations from '@components/Icon/Illustrations';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import getPlatform from '@libs/getPlatform';
import CONST from '@src/CONST';
import type {LocationPermissionModalProps} from './types';

function LocationPermissionModal({startPermissionFlow, resetPermissionFlow, onDeny, onGrant}: LocationPermissionModalProps) {
    const [hasError, setHasError] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const isWeb = getPlatform() === CONST.PLATFORM.WEB;

    useEffect(() => {
        if (!startPermissionFlow) {
            return;
        }

        getLocationPermission().then((status) => {
            if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
                return onGrant();
            }

            setShowModal(true);
            setHasError(status === RESULTS.BLOCKED);
        });
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps -- We only want to run this effect when startPermissionFlow changes
    }, [startPermissionFlow]);

    const handledBlockedPermission = (cb: () => void) => () => {
        if (hasError) {
            if (Linking.openSettings) {
                Linking.openSettings();
            } else {
                onDeny?.();
            }
            setShowModal(false);
            return;
        }
        cb();
    };

    const grantLocationPermission = handledBlockedPermission(() => {
        requestLocationPermission()
            .then((status) => {
                if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
                    onGrant();
                } else {
                    onDeny();
                }
            })
            .finally(() => {
                setShowModal(false);
                setHasError(false);
            });
    });

    const skipLocationPermission = () => {
        onDeny();
        setShowModal(false);
        setHasError(false);
    };

    const getConfirmText = (): string => {
        if (!hasError) {
            return translate('common.continue');
        }

        return isWeb ? translate('common.buttonConfirm') : translate('common.settings');
    };

    const closeModal = () => {
        setShowModal(false);
        resetPermissionFlow();
    };

    const locationErrorMessage = useMemo(() => (isWeb ? 'receipt.allowLocationFromSetting' : 'receipt.locationErrorMessage'), [isWeb]);

    return (
        <ConfirmModal
            shouldShowCancelButton={!(isWeb && hasError)}
            onModalHide={() => {
                setHasError(false);
                resetPermissionFlow();
            }}
            isVisible={showModal}
            onConfirm={grantLocationPermission}
            onCancel={skipLocationPermission}
            onBackdropPress={closeModal}
            confirmText={getConfirmText()}
            cancelText={translate('common.notNow')}
            promptStyles={[styles.textLabelSupportingEmptyValue, styles.mb4]}
            title={translate(hasError ? 'receipt.locationErrorTitle' : 'receipt.locationAccessTitle')}
            titleContainerStyles={[styles.mt2, styles.mb0]}
            titleStyles={[styles.textHeadline]}
            iconSource={Illustrations.ReceiptLocationMarker}
            iconFill={false}
            iconWidth={140}
            iconHeight={120}
            shouldCenterIcon
            shouldReverseStackedButtons
            prompt={translate(hasError ? locationErrorMessage : 'receipt.locationAccessMessage')}
        />
    );
}

LocationPermissionModal.displayName = 'LocationPermissionModal';

export default LocationPermissionModal;
