import type {ValueOf} from 'type-fest';
import type Form from '@src/types/form/Form';

const INPUT_IDS = {
    DISPLAY_NAME: 'restaurantDisplayName',
    NOTE: 'restaurantNote',
} as const;

type InputID = ValueOf<typeof INPUT_IDS>;

type EditRestaurantForm = Form<
    InputID,
    {
        /** Whether the form has been submitted */
        [INPUT_IDS.DISPLAY_NAME]: string;
        [INPUT_IDS.NOTE]: string;
    }
>;

export type {EditRestaurantForm};
export default INPUT_IDS;
