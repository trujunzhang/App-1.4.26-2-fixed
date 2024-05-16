import React from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from '@hooks/useTheme';

type DividerProps = {
    width?: number;
    orientation?: 'horizontal' | 'vertical';
    color?: string;
    dividerStyle?: any;
};

// eslint-disable-next-line react/function-component-definition
const Divider: React.FC<DividerProps> = ({width = 1, orientation = 'horizontal', color = '#DFE4EA', dividerStyle}) => {
    const theme = useTheme();
    const dividerStyles = [{width: orientation === 'horizontal' ? '100%' : width}, {height: orientation === 'vertical' ? '100%' : width}, {backgroundColor: theme.divideBG}, dividerStyle];

    return <View style={StyleSheet.flatten(dividerStyles)} />;
};

export default Divider;
