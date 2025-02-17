import moment from 'moment';
import React, {useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Button from '@components/Button';
import * as Expensicons from '@components/Icon/Expensicons';
import Text from '@components/Text';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';
import type {BaseDateTimePickerProps} from './types';

function BaseDateTimePicker({initialDate, onDateTimeChange}: BaseDateTimePickerProps) {
    const theme = useTheme();
    const styles = useThemeStyles();

    const [currentDate, setCurrentDate] = useState<Date>(initialDate);
    const [open, setOpen] = useState(false);

    /**
     * Forms use inputID to set values. But BasePicker passes an index as the second parameter to onValueChange
     * We are overriding this behavior to make BasePicker work with Form
     */
    const onValueChange = (inputValue: Date) => {
        onDateTimeChange(inputValue);
    };

    return (
        <View style={[styles.flexRow]}>
            <View style={[styles.flexRow, styles.alignItemsCenter, {gap: 5}]}>
                <Text>{moment(currentDate).format('YYYY-MM-DD hh:mm')}</Text>
                <Button
                    small
                    text=""
                    iconFill={theme.icon}
                    icon={Expensicons.Calendar}
                    iconWidth={variables.iconSizeNormal}
                    iconHeight={variables.iconSizeNormal}
                    onPress={() => setOpen(true)}
                />
            </View>
            <DatePicker
                modal
                mode="datetime"
                open={open}
                date={moment(currentDate).toDate()}
                onConfirm={(date: Date) => {
                    setOpen(false);
                    setCurrentDate(date);
                    onValueChange(date);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </View>
    );
}

BaseDateTimePicker.displayName = 'BaseDateTimePicker';

export default BaseDateTimePicker;
