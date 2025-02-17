import React from 'react';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IDisplayNameTitleRow} from '@libs/FirebaseIeatta/list/types/rows/common';
import TailwindColors from '@styles/tailwindcss/colors';

type DisplayNameTitleProps = {hovered: boolean; rowData: IDisplayNameTitleRow};

function DisplayNameTitle({hovered, rowData}: DisplayNameTitleProps) {
    const styles = useThemeStyles();
    return <Text style={[rowData.fontSize ?? styles.xl2, styles.fontBold, hovered && styles.textUnderline, {color: TailwindColors.blue500}]}>{rowData.displayName}</Text>;
}

export default DisplayNameTitle;
