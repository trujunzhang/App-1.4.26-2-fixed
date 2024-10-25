import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import IconWithTooltip from '@components/Ieatta/components/IconWithTooltip';
import {PressableWithFeedback} from '@components/Pressable';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import type {ISectionTitleRow} from '@libs/Firebase/list/types/rows/common';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import type {TranslationPaths} from '@src/languages/types';

type SectionCommonTitleProps = {
    /** The title row of the section. */
    titleRow: ISectionTitleRow;

    /** The right content of the section. */
    rightContent?: React.ReactNode;

    /** The width of the icon. */
    iconWidth?: number;

    /** The height of the icon. */
    iconHeight?: number;

    /** The fill color for the icon. Can be hex, rgb, rgba, or valid react-native named color such as 'red' or 'blue'. */
    iconFill?: string;

    shouldShowPlusIcon?: boolean;
    plusIconToolTip?: TranslationPaths;
    onPlusIconPressed?: () => void;
};

function SectionCommonTitle({
    titleRow,
    rightContent = null,
    iconWidth = variables.iconSizeNormal,
    iconHeight = variables.iconSizeNormal,
    iconFill = TailwindColors.blue500,
    shouldShowPlusIcon = false,
    plusIconToolTip = 'add.recipe.title',
    onPlusIconPressed = () => {},
}: SectionCommonTitleProps) {
    const styles = useThemeStyles();
    const theme = useTheme();
    const {translate} = useLocalize();

    const renderRightContent = () => {
        if (shouldShowPlusIcon) {
            return (
                <IconWithTooltip
                    toolTip={plusIconToolTip}
                    onPress={onPlusIconPressed}
                    testID="Add Icon"
                    containerStyle={[styles.mr2]}
                    iconFill={iconFill}
                    iconSrc={Expensicons.Plus}
                />
            );
        }
        return rightContent;
    };

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
            {renderRightContent()}
        </View>
    );
}

export default React.memo(SectionCommonTitle);
