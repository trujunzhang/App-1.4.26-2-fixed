/* eslint-disable @typescript-eslint/no-explicit-any */
import lodashDefer from 'lodash/defer';
import moment from 'moment';
import type {ForwardedRef, ReactElement, ReactNode, RefObject} from 'react';
import React, {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import type {ScrollView} from 'react-native';
import {Button, Image as RNImage, View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useScrollContext from '@hooks/useScrollContext';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';

type RebaseEventDatePickerProps = {
    /** BasePicker label */
    label?: string | null;

    /** Input value */
    value: string;

    /** The ID used to uniquely identify the input in a Form */
    inputID?: string;

    /** Saves a draft of the input value when used in a form */
    shouldSaveDraft?: boolean;

    /** A callback method that is called when the value changes and it receives the selected value as an argument */
    onInputChange: (value: number, index?: number) => void;
};

function ReviewRatingPanel({inputID, value, onInputChange, label = '', shouldSaveDraft = false}: RebaseEventDatePickerProps, ref: ForwardedRef<any>) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    /**
     * Forms use inputID to set values. But BasePicker passes an index as the second parameter to onValueChange
     * We are overriding this behavior to make BasePicker work with Form
     */
    const onValueChange = (rating: number) => {
        onInputChange(rating);
    };

    const ratingBg = (
        <RNImage
            style={[
                {
                    width: (54 + 4) * 5,
                    height: 34,
                },
            ]}
            source={IeattaStars.STARS.LARGE[value]}
        />
    );
    const starButton = (index: number) => (
        <PressableWithoutFeedback
            onPress={() => onValueChange(index + 1)}
            role="button"
            accessibilityLabel={translate('common.back')}
        >
            <View
                style={[
                    styles.mr2,
                    {
                        width: 52,
                        height: 34,
                    },
                    {backgroundColor: 'transparent'},
                ]}
            />
        </PressableWithoutFeedback>
    );
    const ratingButtons = (
        <View
            style={[
                styles.flexRow,
                styles.pAbsolute,
                styles.pl0,
                styles.pt0,
                {
                    width: (54 + 4) * 5,
                    height: 34,
                },
                {backgroundColor: 'transparent'},
            ]}
        >
            {starButton(0)}
            {starButton(1)}
            {starButton(2)}
            {starButton(3)}
            {starButton(4)}
        </View>
    );

    return (
        <>
            <View style={[styles.flex1, styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                <View style={[styles.flex1, styles.flexRow, styles.justifyContentCenter]}>
                    <View
                        style={[
                            {
                                width: (54 + 4) * 5,
                                height: 34,
                            },
                        ]}
                    >
                        {ratingBg}
                        {ratingButtons}
                    </View>
                </View>
            </View>
        </>
    );
}

ReviewRatingPanel.displayName = 'ReviewRatingPanel';

export default forwardRef(ReviewRatingPanel);
