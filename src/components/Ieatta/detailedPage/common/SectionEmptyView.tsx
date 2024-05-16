import React from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import type {ISectionEmptyRow} from '@libs/Firebase/list/types/rows/common';
import TailwindColors from '@styles/tailwindcss/colors';

type SectionEmptyViewProps = {
    emptyRow: ISectionEmptyRow;
};

function SectionEmptyView({emptyRow}: SectionEmptyViewProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    return (
        <View style={[styles.flexRow, styles.justifyContentCenter, styles.ph3, styles.pv4, styles.sectionComponentContainer]}>
            <Text style={[styles.sectionInfoNormal]}>{translate(emptyRow.emptyHint)}</Text>
        </View>
    );
}

export default React.memo(SectionEmptyView);
