import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IRestaurantTitleInEventRow} from '@libs/Firebase/list/types/rows/common';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';

type RestaurantTitleInEventProps = {
    rowData: IRestaurantTitleInEventRow;
};

function RestaurantTitleInEvent({rowData}: RestaurantTitleInEventProps) {
    const styles = useThemeStyles();
    return <Text style={[styles.xl2, styles.fontBold, {color: TailwindColors.blue500}]}>{rowData.displayName}</Text>;
}

export default RestaurantTitleInEvent;
