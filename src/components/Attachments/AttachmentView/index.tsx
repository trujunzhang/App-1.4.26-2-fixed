import Str from 'expensify-common/lib/str';
import React, {memo, useEffect, useState} from 'react';
import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';
import {ActivityIndicator, View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import type {Attachment, AttachmentSource} from '@components/Attachments/types';
import DistanceEReceipt from '@components/DistanceEReceipt';
import EReceipt from '@components/EReceipt';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import ScrollView from '@components/ScrollView';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
// import {usePlaybackContext} from '@components/VideoPlayerContexts/PlaybackContext';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import * as CachedPDFPaths from '@libs/actions/CachedPDFPaths';
import addEncryptedAuthTokenToURL from '@libs/addEncryptedAuthTokenToURL';
import * as TransactionUtils from '@libs/TransactionUtils';
import type {ColorValue} from '@styles/utils/types';
import variables from '@styles/variables';
import ONYXKEYS from '@src/ONYXKEYS';
import type {Transaction} from '@src/types/onyx';
import AttachmentViewImage from './AttachmentViewImage';

type AttachmentViewOnyxProps = {
    transaction: OnyxEntry<Transaction>;
};

type AttachmentViewProps = AttachmentViewOnyxProps &
    Attachment & {
        /** Whether this view is the active screen  */
        isFocused?: boolean;

        /** Function for handle on press */
        onPress?: (e?: GestureResponderEvent | KeyboardEvent) => void;

        /** Whether this AttachmentView is shown as part of a AttachmentCarousel */
        isUsedInCarousel?: boolean;

        isUsedInAttachmentModal?: boolean;

        /** Flag to show/hide download icon */
        shouldShowDownloadIcon?: boolean;

        /** Flag to show the loading indicator */
        shouldShowLoadingSpinnerIcon?: boolean;

        /** Notify parent that the UI should be modified to accommodate keyboard */
        onToggleKeyboard?: (shouldFadeOut: boolean) => void;

        /** Extra styles to pass to View wrapper */
        containerStyles?: StyleProp<ViewStyle>;

        /** Denotes whether it is a workspace avatar or not */
        isWorkspaceAvatar?: boolean;

        /** Denotes whether it is an icon (ex: SVG) */
        maybeIcon?: boolean;

        fallbackSource?: AttachmentSource;

        isHovered?: boolean;
    };

function AttachmentView({
    source,
    file,
    isAuthTokenRequired,
    onPress,
    shouldShowLoadingSpinnerIcon,
    shouldShowDownloadIcon,
    containerStyles,
    onToggleKeyboard,
    isFocused,
    isUsedInCarousel,
    isUsedInAttachmentModal,
    isWorkspaceAvatar,
    maybeIcon,
    fallbackSource,
    transaction,
    reportActionID,
    isHovered,
    duration,
}: AttachmentViewProps) {
    const {translate} = useLocalize();
    // const {updateCurrentlyPlayingURL} = usePlaybackContext();
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const [loadComplete, setLoadComplete] = useState(false);
    const isVideo = (typeof source === 'string' && Str.isVideo(source)) || (file?.name && Str.isVideo(file.name));

    // useEffect(() => {
    //     if (!isFocused && !(file && isUsedInAttachmentModal)) {
    //         return;
    //     }
    //     updateCurrentlyPlayingURL(isVideo && typeof source === 'string' ? source : null);
    // }, [file, isFocused, isUsedInAttachmentModal, isVideo, source, updateCurrentlyPlayingURL]);

    const [imageError, setImageError] = useState(false);

    useNetwork({onReconnect: () => setImageError(false)});

    // Handles case where source is a component (ex: SVG) or a number
    // Number may represent a SVG or an image
    if (typeof source === 'function' || (maybeIcon && typeof source === 'number')) {
        let iconFillColor: ColorValue | undefined = '';
        let additionalStyles: ViewStyle[] = [];
        if (isWorkspaceAvatar && file) {
            const defaultWorkspaceAvatarColor = StyleUtils.getDefaultWorkspaceAvatarColor(file.name ?? '');
            iconFillColor = defaultWorkspaceAvatarColor.fill;
            additionalStyles = [defaultWorkspaceAvatarColor];
        }

        return (
            <Icon
                src={source}
                height={variables.defaultAvatarPreviewSize}
                width={variables.defaultAvatarPreviewSize}
                fill={iconFillColor}
                additionalStyles={additionalStyles}
            />
        );
    }

    if (TransactionUtils.hasEReceipt(transaction) && transaction) {
        return (
            <View style={[styles.flex1, styles.alignItemsCenter]}>
                <ScrollView
                    style={styles.w100}
                    contentContainerStyle={[styles.flexGrow1, styles.justifyContentCenter, styles.alignItemsCenter]}
                >
                    <EReceipt transactionID={transaction.transactionID} />
                </ScrollView>
            </View>
        );
    }

    if (TransactionUtils.isDistanceRequest(transaction) && transaction) {
        return <DistanceEReceipt transaction={transaction} />;
    }

    // For this check we use both source and file.name since temporary file source is a blob
    // both PDFs and images will appear as images when pasted into the text field.
    // We also check for numeric source since this is how static images (used for preview) are represented in RN.
    const isImage = typeof source === 'number' || (typeof source === 'string' && Str.isImage(source));
    if (isImage || (file?.name && Str.isImage(file.name))) {
        if (imageError) {
            // AttachmentViewImage can't handle icon fallbacks, so we need to handle it here
            if (typeof fallbackSource === 'number' || typeof fallbackSource === 'function') {
                return (
                    <Icon
                        src={fallbackSource}
                        height={variables.defaultAvatarPreviewSize}
                        width={variables.defaultAvatarPreviewSize}
                        additionalStyles={[styles.alignItemsCenter, styles.justifyContentCenter, styles.flex1]}
                        fill={theme.border}
                    />
                );
            }
        }

        return (
            <AttachmentViewImage
                url={imageError && fallbackSource ? (fallbackSource as string) : (source as string)}
                file={file}
                isAuthTokenRequired={isAuthTokenRequired}
                loadComplete={loadComplete}
                isImage={isImage}
                onPress={onPress}
                onError={() => {
                    setImageError(true);
                }}
            />
        );
    }

    return (
        <View style={[styles.defaultAttachmentView, containerStyles]}>
            <View style={styles.mr2}>
                <Icon
                    fill={theme.icon}
                    src={Expensicons.Paperclip}
                />
            </View>

            <Text style={[styles.textStrong, styles.flexShrink1, styles.breakAll, styles.flexWrap, styles.mw100]}>{file?.name}</Text>
            {!shouldShowLoadingSpinnerIcon && shouldShowDownloadIcon && (
                <Tooltip text={translate('common.download')}>
                    <View style={styles.ml2}>
                        <Icon
                            fill={theme.icon}
                            src={Expensicons.Download}
                        />
                    </View>
                </Tooltip>
            )}
            {shouldShowLoadingSpinnerIcon && (
                <View style={styles.ml2}>
                    <Tooltip text={translate('common.downloading')}>
                        <ActivityIndicator
                            size="small"
                            color={theme.textSupporting}
                        />
                    </Tooltip>
                </View>
            )}
        </View>
    );
}

AttachmentView.displayName = 'AttachmentView';

export default memo(
    withOnyx<AttachmentViewProps, AttachmentViewOnyxProps>({
        transaction: {
            key: ({transactionID}) => `${ONYXKEYS.COLLECTION.TRANSACTION}${transactionID}`,
        },
    })(AttachmentView),
);

export type {AttachmentViewProps};
