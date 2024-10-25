import React from 'react';
import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';
import {View} from 'react-native';
import Icon from '@components/Icon';
import {PressableWithFeedback} from '@components/Pressable';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import type {TranslationPaths} from '@src/languages/types';
import type IconAsset from '@src/types/utils/IconAsset';

type IconWithTooltipProps = {
    toolTip: TranslationPaths;
    /**
     * onPress callback
     */
    onPress: (event?: GestureResponderEvent | KeyboardEvent) => void | Promise<void>;

    containerStyle: StyleProp<ViewStyle>;

    testID: string;

    /** The fill color for the icon. Can be hex, rgb, rgba, or valid react-native named color such as 'red' or 'blue'. */
    iconFill?: string;

    /** The width of the icon. */
    iconWidth?: number;

    /** The height of the icon. */
    iconHeight?: number;

    /** The asset to render. */
    iconSrc: IconAsset;
};

function IconWithTooltip({
    toolTip,
    onPress,
    containerStyle,
    testID,

    iconWidth = variables.iconSizeNormal,
    iconHeight = variables.iconSizeNormal,
    iconFill = TailwindColors.blue500,

    iconSrc,
}: IconWithTooltipProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    return (
        <Tooltip text={translate(toolTip)}>
            <PressableWithFeedback
                onPress={onPress}
                style={styles.signInIconButton}
                role={CONST.ROLE.BUTTON}
                accessibilityLabel={toolTip}
            >
                <View
                    style={[styles.flexRow, styles.alignItemsCenter, containerStyle]}
                    accessible={false}
                >
                    <Icon
                        testID={testID}
                        fill={iconFill}
                        width={iconWidth}
                        height={iconHeight}
                        src={iconSrc}
                    />
                </View>
            </PressableWithFeedback>
        </Tooltip>
    );
}

export default IconWithTooltip;
