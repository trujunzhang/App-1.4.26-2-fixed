import React from 'react';
import {View} from 'react-native';
import ReviewSortButton from '@components/Ieatta/detailedPage/common/ReviewSortButton';
import SearchReview from '@components/Ieatta/detailedPage/common/SearchReview';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IReviewActionbarRow} from '@libs/Firebase/list/types/rows/review';
import type {ReviewDropdownOption} from '@libs/Firebase/review-sort';
import {reviewSortOptions} from '@libs/Firebase/review-sort';

type ReviewActionbarProps = {
    reviewActionbar: IReviewActionbarRow;
};

function ReviewActionbar({reviewActionbar}: ReviewActionbarProps) {
    const {onReviewSortChanged, onReviewSearchChanged} = reviewActionbar;
    const styles = useThemeStyles();

    const onItemChanged = (item: ReviewDropdownOption) => {
        const {value} = item;
        onReviewSortChanged(value);
    };

    const reviewSortMenu = (
        <ReviewSortButton
            onItemChanged={onItemChanged}
            options={reviewSortOptions}
        />
    );

    return (
        <View style={[styles.flex1, styles.flexRow, styles.mv4, styles.mh3, styles.gap2, {height: 50}]}>
            <SearchReview
                containerStyle={[styles.flex1]}
                onReviewSearchChanged={onReviewSearchChanged}
            />
            {reviewSortMenu}
        </View>
    );
}

export default ReviewActionbar;
