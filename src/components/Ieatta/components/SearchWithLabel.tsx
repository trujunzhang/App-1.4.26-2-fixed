import React from 'react';
import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';
import {View} from 'react-native';
import Hoverable from '@components/Hoverable';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import {PressableWithFeedback} from '@components/Pressable';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';
import CONST from '@src/CONST';

type SearchWithLabelProps = {
    // Callback fired when component is pressed
    onPress: (event?: GestureResponderEvent | KeyboardEvent) => void;

    // Text explaining what the user can search for
    placeholder?: string;

    // Text showing up in a tooltip when component is hovered
    tooltip?: string;

    // Styles to apply on the outer element
    style?: StyleProp<ViewStyle>;

    /** Styles to apply to the outermost element */
    containerStyle?: StyleProp<ViewStyle>;
};

function SearchWithLabel({onPress, placeholder, tooltip, style, containerStyle}: SearchWithLabelProps) {
    const styles = useThemeStyles();
    const theme = useTheme();
    const {translate} = useLocalize();

    return (
        <View style={containerStyle}>
            <Tooltip text={tooltip ?? translate('common.search')}>
                <PressableWithFeedback
                    accessibilityLabel={tooltip ?? translate('common.search')}
                    role={CONST.ROLE.BUTTON}
                    onPress={onPress}
                    style={styles.searchPressable}
                >
                    <Hoverable>
                        {(hovered: boolean) => (
                            <View style={[styles.searchContainer, hovered && styles.searchContainerHovered, style]}>
                                <Icon
                                    src={Expensicons.MagnifyingGlass}
                                    width={variables.iconSizeSmall}
                                    height={variables.iconSizeSmall}
                                    fill={theme.icon}
                                />
                                <Text
                                    style={styles.searchInputStyle}
                                    numberOfLines={1}
                                >
                                    {placeholder ?? translate('common.searchWithThreeDots')}
                                </Text>
                            </View>
                        )}
                    </Hoverable>
                </PressableWithFeedback>
            </Tooltip>
        </View>
    );
}

SearchWithLabel.displayName = 'SearchWithLabel';

export type {SearchWithLabelProps};
export default SearchWithLabel;
