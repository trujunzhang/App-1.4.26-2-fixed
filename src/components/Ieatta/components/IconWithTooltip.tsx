import React from 'react';
import {Image as RNImage, View} from 'react-native';
import type {GestureResponderEvent, HostComponent, PressableStateCallbackType, PressableProps as RNPressableProps, StyleProp, ViewStyle} from 'react-native';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import DisplayNames from '@components/DisplayNames';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import IeattaUserDetailsTooltip from '@components/Ieatta/detailedPage/common/IeattaUserDetailsTooltip';
import {PressableWithFeedback} from '@components/Pressable';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import CONST from '@src/CONST';
import type {TranslationPaths} from '@src/languages/types';
import ROUTES from '@src/ROUTES';
import type {IFBPeopleInEvent} from '@src/types/firebase';
import type {PersonalDetails} from '@src/types/onyx';
import type IconAsset from '@src/types/utils/IconAsset';

type IconWithTooltipProps = {
    toolTip: TranslationPaths;
    /**
     * onPress callback
     */
    onPress: (event?: GestureResponderEvent | KeyboardEvent) => void | Promise<void>;

    containerStyle: StyleProp<ViewStyle>;

    testID: string;
    iconFill: string;

    /** The asset to render. */
    iconSrc: IconAsset;
};

function IconWithTooltip({toolTip, onPress, containerStyle, testID, iconFill, iconSrc}: IconWithTooltipProps) {
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
                        src={iconSrc}
                    />
                </View>
            </PressableWithFeedback>
        </Tooltip>
    );
}

export default IconWithTooltip;
