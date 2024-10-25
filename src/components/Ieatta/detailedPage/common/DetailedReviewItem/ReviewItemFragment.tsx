import React, {memo} from 'react';
import type {StyleProp, TextStyle} from 'react-native';
import IeattaUserDetailsTooltip from '@components/Ieatta/detailedPage/common/IeattaUserDetailsTooltip';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import type {Message} from '@src/types/onyx/ReportAction';
import TextCommentFragment from './comment/TextCommentFragment';

type ReviewItemFragmentProps = {
    userId: string;

    /** The message fragment needing to be displayed */
    fragment: Message;

    /** Message(text) of an IOU report action */
    iouMessage?: string;

    /** Should this fragment be contained in a single line? */
    isSingleLine?: boolean;

    /**  Additional styles to add after local styles */
    style?: StyleProp<TextStyle>;
};

function ReviewItemFragment({userId, fragment, iouMessage = '', isSingleLine = false, style = []}: ReviewItemFragmentProps) {
    const styles = useThemeStyles();

    switch (fragment.type) {
        case 'COMMENT': {
            return (
                <TextCommentFragment
                    fragment={fragment}
                    styleAsDeleted={false}
                    styleAsMuted={false}
                    iouMessage={iouMessage}
                    style={style}
                />
            );
        }
        case 'TEXT': {
            return (
                <IeattaUserDetailsTooltip userId={userId}>
                    <Text
                        numberOfLines={isSingleLine ? 1 : undefined}
                        style={[styles.chatItemMessageHeaderSender, isSingleLine ? styles.pre : styles.preWrap]}
                    >
                        {fragment.text}
                    </Text>
                </IeattaUserDetailsTooltip>
            );
        }
        default:
            return <Text>fragment.text</Text>;
    }
}

ReviewItemFragment.displayName = 'ReviewItemFragment';

export default memo(ReviewItemFragment);
