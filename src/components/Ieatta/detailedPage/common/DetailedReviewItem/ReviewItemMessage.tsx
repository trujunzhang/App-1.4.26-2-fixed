import type {ReactElement} from 'react';
import React from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {View} from 'react-native';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IFBReview} from '@src/types/firebase';
import ReviewItemFragment from './ReviewItemFragment';

type ReviewItemMessageProps = {
    review: IFBReview;

    /** Additional styles to add after local styles. */
    style?: StyleProp<ViewStyle>;
};

function ReviewItemMessage({review, style = {}}: ReviewItemMessageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const fragments = [
        {
            key: review.creatorId,
            type: 'COMMENT',
            text: review.body,
        },
    ];

    /**
     * Get the ReportActionItemFragments
     * @param shouldWrapInText determines whether the fragments are wrapped in a Text component
     * @returns report action item fragments
     */
    const renderReportActionItemFragments = (shouldWrapInText: boolean): ReactElement | ReactElement[] => {
        const reportActionItemFragments = fragments.map((fragment, index) => (
            <ReviewItemFragment
                /* eslint-disable-next-line react/no-array-index-key */
                key={`actionFragment-${fragment.key}-${index}`}
                fragment={fragment}
                userId={review.creatorId}
            />
        ));

        // Approving or submitting reports in oldDot results in system messages made up of multiple fragments of `TEXT` type
        // which we need to wrap in `<Text>` to prevent them rendering on separate lines.

        return shouldWrapInText ? <Text style={styles.ltr}>{reportActionItemFragments}</Text> : reportActionItemFragments;
    };

    return <View style={[styles.chatItemMessage, style]}>{renderReportActionItemFragments(true)}</View>;
}

ReviewItemMessage.displayName = 'ReviewItemMessage';

export default ReviewItemMessage;
