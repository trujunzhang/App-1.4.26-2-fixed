import type {ValueOf} from 'type-fest';
import type Form from '@src/types/form/Form';

const INPUT_IDS = {
    PHOTO_PREVIEW: 'restaurantPhotoPreview',
    NOTE: 'photoNote',
} as const;

type InputID = ValueOf<typeof INPUT_IDS>;

type EditPhotoForm = Form<
    InputID,
    {
        /** Whether the form has been submitted */
        [INPUT_IDS.PHOTO_PREVIEW]: string;
        [INPUT_IDS.NOTE]: string;
    }
>;

export type {EditPhotoForm};
export default INPUT_IDS;
