import type {ValueOf} from 'type-fest';
import type Form from '@src/types/form/Form';

const INPUT_IDS = {
    RATING: 'reviewRating',
    NOTE: 'reviewNote',
} as const;

type InputID = ValueOf<typeof INPUT_IDS>;

type EditReviewForm = Form<
    InputID,
    {
        /** Whether the form has been submitted */
        [INPUT_IDS.RATING]: string;
        [INPUT_IDS.NOTE]: string;
    }
>;

export type {EditReviewForm};
export default INPUT_IDS;
