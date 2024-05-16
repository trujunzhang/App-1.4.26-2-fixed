type BaseDateTimePickerProps = {
    /** BasePicker label */
    label: string;

    /** Input value */
    initialDate: Date;

    /** A callback method that is called when the value changes and it receives the selected value as an argument */
    onDateTimeChange: (newDate: Date) => void;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    BaseDateTimePickerProps,
};
