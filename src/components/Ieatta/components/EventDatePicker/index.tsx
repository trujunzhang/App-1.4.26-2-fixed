/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import type {ForwardedRef} from 'react';
import React, {forwardRef} from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import type {BaseTextInputRef} from '@components/TextInput/BaseTextInput/types';
import useThemeStyles from '@hooks/useThemeStyles';
import BaseDateTimePicker from './BaseDateTimePicker';
import type {BaseEventDatePickerProps} from './types';

function EventDatePicker({inputID, value, onInputChange, label = '', shouldSaveDraft = false}: BaseEventDatePickerProps, ref: ForwardedRef<BaseTextInputRef>) {
    const styles = useThemeStyles();

    /**
     * Forms use inputID to set values. But BasePicker passes an index as the second parameter to onValueChange
     * We are overriding this behavior to make BasePicker work with Form
     */
    const onValueChange = (inputValue: Date) => {
        const newValue = inputValue.toISOString();
        onInputChange?.(newValue);
    };

    return (
        <View style={[styles.flex1, styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
            {label && <Text style={[styles.textInputLabelDesktop, styles.textLabelSupporting, styles.pointerEventsNone]}>{`${label}: `}</Text>}
            <BaseDateTimePicker
                label={label ?? ''}
                initialDate={moment(value).toDate()}
                onDateTimeChange={(newDateTime: Date) => {
                    onValueChange(newDateTime);
                }}
            />
        </View>
    );
}

EventDatePicker.displayName = 'EventDatePicker';

export default forwardRef(EventDatePicker);
