import type {ValueOf} from 'type-fest';
import type Form from '@src/types/form/Form';

const INPUT_IDS = {
    DISPLAY_NAME: 'recipeDisplayName',
    PRICE: 'recipePrice',
} as const;

type InputID = ValueOf<typeof INPUT_IDS>;

type EditRecipeForm = Form<
    InputID,
    {
        /** Whether the form has been submitted */
        [INPUT_IDS.DISPLAY_NAME]: string;
        [INPUT_IDS.PRICE]: string;
    }
>;

export type {EditRecipeForm};
export default INPUT_IDS;
