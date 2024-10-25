import React from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {StyleSheet, View} from 'react-native';
import useTheme from '@hooks/useTheme';

type DividerProps = {
    width?: number;
    orientation?: 'horizontal' | 'vertical';
    color?: string;
    dividerStyle?: StyleProp<ViewStyle>;
};

// eslint-disable-next-line react/function-component-definition
const Divider: React.FC<DividerProps> = ({width = 1, orientation = 'horizontal', color = '#DFE4EA', dividerStyle}) => {
    const theme = useTheme();
    const dividerStyles: StyleProp<ViewStyle> = [
        {width: orientation === 'horizontal' ? '100%' : width},
        {height: orientation === 'vertical' ? '100%' : width},
        {backgroundColor: theme.divideBG},
    ];

    return <View style={StyleSheet.flatten([dividerStyles, dividerStyle])} />;
};

export default Divider;
