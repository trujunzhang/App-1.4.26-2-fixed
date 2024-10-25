/* eslint-disable @typescript-eslint/ban-types */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Moment} from 'moment';
import moment from 'moment';
import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {View} from 'react-native';
import {PressableWithFeedback} from '@components/Pressable';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';
import type {BaseDateTimePickerProps} from './types';

function BaseDateTimePicker({initialDate, label, onDateTimeChange}: BaseDateTimePickerProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    // const [currentDate, setCurrentDate] = useState<Date>(initialDate);
    // const [open, setOpen] = useState(false);

    /**
     * Forms use inputID to set values. But BasePicker passes an index as the second parameter to onValueChange
     * We are overriding this behavior to make BasePicker work with Form
     */
    const onChange = (inputValue: Moment | string) => {
        if (typeof inputValue === 'string') {
            onDateTimeChange(moment(inputValue).toDate());
        } else {
            onDateTimeChange(inputValue.toDate());
        }
    };

    const renderInput = (props: any, openCalendar: Function, closeCalendar: Function) => {
        function clear() {
            props.onChange({target: {value: ''}});
        }
        return (
            <View style={[styles.flex1]}>
                <Tooltip text={label}>
                    <PressableWithFeedback
                        accessibilityLabel={label}
                        role={CONST.ROLE.BUTTON}
                        onPress={() => {
                            openCalendar();
                        }}
                        style={styles.searchPressable}
                    >
                        {({hovered}) => (
                            <View style={[styles.searchContainer]}>
                                <Text
                                    style={styles.textSupporting}
                                    numberOfLines={1}
                                >
                                    {moment(props.value).format('YYYY-MM-DD hh:mm')}
                                </Text>
                            </View>
                        )}
                    </PressableWithFeedback>
                </Tooltip>
            </View>
        );
    };

    return (
        <View style={[styles.flex1, styles.flexColumn]}>
            <Datetime
                renderInput={renderInput}
                onChange={onChange}
                initialValue={initialDate}
            />
        </View>
    );
}

BaseDateTimePicker.displayName = 'BaseDateTimePicker';

export default BaseDateTimePicker;
