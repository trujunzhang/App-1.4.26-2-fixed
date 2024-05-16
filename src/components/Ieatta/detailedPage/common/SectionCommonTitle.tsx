import React from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import type {ISectionTitleRow} from '@libs/Firebase/list/types/rows/common';
import TailwindColors from '@styles/tailwindcss/colors';

type SectionCommonTitleProps = {
    titleRow: ISectionTitleRow;
    rightContent?: React.ReactNode;
};

function SectionCommonTitle({titleRow, rightContent}: SectionCommonTitleProps) {
    const styles = useThemeStyles();
    const theme = useTheme();
    const {translate} = useLocalize();

    return (
        <View style={[styles.flexRow, styles.justifyContentBetween, styles.pl4, styles.pr4, styles.pt8, styles.pb4]}>
            {/* Left Container */}
            <Text
                style={[
                    titleRow.isSmallScreenWidth ? styles.sectionTitleMobileStrong : styles.sectionTitleWebStrong,
                    {
                        color: titleRow.titleColor ?? theme.text,
                    },
                ]}
            >
                {translate(titleRow.title)}
            </Text>
            {/* Right Container */}
            {rightContent}
        </View>
    );
}

export default React.memo(SectionCommonTitle);
