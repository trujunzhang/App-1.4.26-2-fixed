// eslint-disable-next-line lodash/import-scope
import {isEmpty} from 'lodash';
import React, {memo} from 'react';
import type {StyleProp, TextStyle} from 'react-native';
import Text from '@components/Text';
import ZeroWidthView from '@components/ZeroWidthView';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import convertToLTR from '@libs/convertToLTR';
import * as DeviceCapabilities from '@libs/DeviceCapabilities';
import * as EmojiUtils from '@libs/EmojiUtils';
import type {Message} from '@src/types/onyx/ReportAction';

type TextCommentFragmentProps = {
    /** The message fragment needing to be displayed */
    fragment: Message;

    /** Should this message fragment be styled as deleted? */
    styleAsDeleted: boolean;

    /** Should this message fragment be styled as muted */
    styleAsMuted?: boolean;

    /** Additional styles to add after local styles. */
    style: StyleProp<TextStyle>;

    /** Text of an IOU report action */
    iouMessage?: string;
};

function TextCommentFragment({fragment, styleAsDeleted, styleAsMuted = false, style, iouMessage = ''}: TextCommentFragmentProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {html = '', text} = fragment;
    const {translate} = useLocalize();
    const {isSmallScreenWidth} = useResponsiveLayout();

    const containsOnlyEmojis = EmojiUtils.containsOnlyEmojis(text);
    const message = isEmpty(iouMessage) ? text : iouMessage;

    return (
        <Text style={[containsOnlyEmojis && styles.onlyEmojisText, styles.ltr, style]}>
            <ZeroWidthView
                text={text}
                displayAsGroup={false}
            />
            <Text
                style={[
                    containsOnlyEmojis ? styles.onlyEmojisText : undefined,
                    styles.ltr,
                    style,
                    styleAsDeleted ? styles.offlineFeedback.deleted : undefined,
                    styleAsMuted ? styles.colorMuted : undefined,
                    !DeviceCapabilities.canUseTouchScreen() || !isSmallScreenWidth ? styles.userSelectText : styles.userSelectNone,
                ]}
            >
                {convertToLTR(message)}
            </Text>
        </Text>
    );
}

TextCommentFragment.displayName = 'TextCommentFragment';

export default memo(TextCommentFragment);
