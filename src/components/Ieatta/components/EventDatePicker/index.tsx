/* eslint-disable @typescript-eslint/no-explicit-any */
import lodashDefer from 'lodash/defer';
import moment from 'moment';
import type {ForwardedRef, ReactElement, ReactNode, RefObject} from 'react';
import React, {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import type {ScrollView} from 'react-native';
import {Button, View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import Text from '@components/Text';
import useScrollContext from '@hooks/useScrollContext';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';
import BaseDateTimePicker from './BaseDateTimePicker';
import type {BaseEventDatePickerProps} from './types';

function EventDatePicker({inputID, value, onInputChange, label = '', shouldSaveDraft = false}: BaseEventDatePickerProps, ref: ForwardedRef<any>) {
    const theme = useTheme();
    const styles = useThemeStyles();

    /**
     * Forms use inputID to set values. But BasePicker passes an index as the second parameter to onValueChange
     * We are overriding this behavior to make BasePicker work with Form
     */
    const onValueChange = (inputValue: Date) => {
        onInputChange(inputValue.toISOString());
    };

    return (
        <>
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
        </>
    );
}

EventDatePicker.displayName = 'EventDatePicker';

export default forwardRef(EventDatePicker);
