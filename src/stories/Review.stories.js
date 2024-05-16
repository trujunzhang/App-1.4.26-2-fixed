/* eslint-disable rulesdir/prefer-underscore-method */
import React, {useState} from 'react';
import DetailedReviewItem from '@components/Ieatta/detailedPage/common/DetailedReviewItem';
import {reviews} from '@libs/Firebase/data/Reviews';

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
const review = reviews[1];

function SingleReview(args) {
    const [value, setValue] = useState('');
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
