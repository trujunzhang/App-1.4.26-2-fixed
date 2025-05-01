import React from 'react';
import type {ViewStyle} from 'react-native';
import {View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import IconWithTooltip from '@components/Ieatta/components/IconWithTooltip';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import type {ISectionTitleRow} from '@libs/FirebaseIeatta/list/types/rows/common';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import type {TranslationPaths} from '@src/languages/types';

type SectionCommonTitleProps = {
    /** The title row of the section. */
    titleRow: ISectionTitleRow;

    paddingLeft?: ViewStyle;

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

    shouldShowCameraIcon?: boolean;
    cameraIconToolTip?: TranslationPaths;
    onCameraIconPressed?: () => void;
};

function SectionCommonTitle({
    titleRow,
    paddingLeft = {
        paddingLeft: 16,
    },
    rightContent = null,
    iconWidth = variables.iconSizeNormal,
    iconHeight = variables.iconSizeNormal,
    iconFill = TailwindColors.blue500,
    shouldShowPlusIcon = false,
    plusIconToolTip = 'add.recipe.title',
    onPlusIconPressed = () => {},
    shouldShowCameraIcon = false,
    cameraIconToolTip = 'photos.takePhoto.button.recipe',
    onCameraIconPressed = () => {},
}: SectionCommonTitleProps) {
    const {shouldUseNarrowLayout} = useResponsiveLayout();
    const styles = useThemeStyles();
    const theme = useTheme();
    const {translate} = useLocalize();

    const renderRightContent = () => {
        return (
            <View style={[styles.gap2, styles.flexRow, styles.alignItemsCenter]}>
                {shouldShowCameraIcon && (
                    <IconWithTooltip
                        toolTip={cameraIconToolTip}
                        onPress={onCameraIconPressed}
                        testID="Take photo"
                        containerStyle={[styles.mr2]}
                        iconFill={iconFill}
                        iconSrc={Expensicons.Camera}
                    />
                )}
                {shouldShowPlusIcon && (
                    <IconWithTooltip
                        toolTip={plusIconToolTip}
                        onPress={onPlusIconPressed}
                        testID="Add Icon"
                        containerStyle={[styles.mr2]}
                        iconFill={iconFill}
                        iconSrc={Expensicons.Plus}
                    />
                )}
            </View>
        );
    };

    const innerStyle = shouldUseNarrowLayout ? [styles.justifyContentBetween] : [styles.gap2];

    return (
        <View style={[styles.flexRow, paddingLeft, styles.pr4, styles.pt8, styles.pb4, innerStyle]}>
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
