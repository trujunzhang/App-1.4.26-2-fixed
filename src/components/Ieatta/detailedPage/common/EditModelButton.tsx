import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IEditModelButtonRow} from '@libs/Firebase/list/types/rows/common';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';

type EditModelButtonProps = {
    editModelRow: IEditModelButtonRow;
};

function EditModelButton({editModelRow}: EditModelButtonProps) {
    const {relatedId, buttonTag, modelPath} = editModelRow;
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    return (
        <View style={[styles.mv3, styles.flexRow]}>
            <Icon
                fill={TailwindColors.blue500}
                width={variables.iconSizeNormal}
                height={variables.iconSizeNormal}
                src={Expensicons.Pencil}
            />
            <Text style={[styles.editTextInHeaderPanel, styles.ml2]}>{translate(buttonTag)}</Text>
        </View>
    );
}

export default EditModelButton;
