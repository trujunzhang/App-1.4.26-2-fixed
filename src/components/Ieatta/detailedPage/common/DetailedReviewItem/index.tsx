import React from 'react';
import {View} from 'react-native';
import type {IReviewInPageRow} from '@libs/FirebaseIeatta/list/types/rows/review';
import ReviewItemMessage from './ReviewItemMessage';
import ReviewItemSingle from './ReviewItemSingle';

type DetailedReviewItemProps = {
    reviewRow: IReviewInPageRow;
    hovered?: boolean;
};

function DetailedReviewItem({reviewRow, hovered = false}: DetailedReviewItemProps) {
    const {review} = reviewRow;

    const renderItemContent = (): React.JSX.Element => {
        return (
            <View style={{}}>
                <ReviewItemMessage review={review} />
            </View>
        );
    };
    const content = renderItemContent();

    return (
        <ReviewItemSingle
            review={review}
            isHovered={hovered}
        >
            {content}
        </ReviewItemSingle>
    );
}

export default DetailedReviewItem;
