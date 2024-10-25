import {BaseTextInputProps} from '@components/TextInput/BaseTextInput/types';

type BaseEventDatePickerProps = {
    /** BasePicker label */
    // label?: string | null;
    /** Input value */
    // value: string;
    /** The ID used to uniquely identify the input in a Form */
    // inputID?: string;
    /** Saves a draft of the input value when used in a form */
    // shouldSaveDraft?: boolean;
    /** A callback method that is called when the value changes and it receives the selected value as an argument */
    // onInputChange: (value: string, index?: number) => void;
} & BaseTextInputProps;

export type {
    // eslint-disable-next-line import/prefer-default-export
    BaseEventDatePickerProps,
};
