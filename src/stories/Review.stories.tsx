/* eslint-disable rulesdir/prefer-underscore-method */
import React, {useState} from 'react';
import type {DetailedReviewItemProps} from '@components/Ieatta/detailedPage/common/DetailedReviewItem';
import DetailedReviewItem from '@components/Ieatta/detailedPage/common/DetailedReviewItem';
import {reviews} from '@libs/FirebaseIeatta/data/Reviews';
import type {IFBReview} from '@src/types/firebase';

/**
 * We use the Component Story Format for writing stories. Follow the docs here:
 *
 * https://storybook.js.org/docs/react/writing-stories/introduction#component-story-format
 */
const story = {
    title: 'Components/Review',
    component: DetailedReviewItem,
};

// const review = reviews[0];
const review: IFBReview | undefined = reviews.at(1);

function SingleReview(args: DetailedReviewItemProps) {
    const [value, setValue] = useState('');
    if (!review) {
        return null;
    }
    return (
        <div
            style={
                {
                    // width: 500,
                }
            }
        >
            <DetailedReviewItem
                reviewRow={{
                    review,
                    shouldShowDivide: false,
                }}
            />
        </div>
    );
}

SingleReview.args = {};

export default story;
export {SingleReview};
