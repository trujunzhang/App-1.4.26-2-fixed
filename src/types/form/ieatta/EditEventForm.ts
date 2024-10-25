import type {ValueOf} from 'type-fest';
import type Form from '@src/types/form/Form';

const INPUT_IDS = {
    DISPLAY_NAME: 'eventDisplayName',
    WHAT_WHY: 'eventWhatWhy',
    START_DATE: 'eventStartDate',
    END_DATE: 'eventEndDate',
} as const;

type InputID = ValueOf<typeof INPUT_IDS>;

type EditEventForm = Form<
    InputID,
    {
        /** Whether the form has been submitted */
        [INPUT_IDS.DISPLAY_NAME]: string;
        [INPUT_IDS.WHAT_WHY]: string;
        [INPUT_IDS.START_DATE]: string;
        [INPUT_IDS.END_DATE]: string;
    }
>;

export type {EditEventForm};
export default INPUT_IDS;
