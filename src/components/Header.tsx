import type {ReactNode} from 'react';
import React, {useMemo} from 'react';
import type {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {View} from 'react-native';
import useThemeStyles from '@hooks/useThemeStyles';
import EnvironmentBadge from './EnvironmentBadge';
import Text from './Text';

type HeaderProps = {
    titleAnchor?: 'left' | 'middle';

    /** Title of the Header */
    title?: ReactNode;

    /** Subtitle of the header */
    subtitle?: ReactNode;

    /** Should we show the environment badge (dev/stg)?  */
    shouldShowEnvironmentBadge?: boolean;

    /** Additional text styles */
    textStyles?: StyleProp<TextStyle>;

    /** Additional header container styles */
    containerStyles?: StyleProp<ViewStyle>;
};

function Header({titleAnchor = 'middle', title = '', subtitle = '', textStyles = [], containerStyles = [], shouldShowEnvironmentBadge = false}: HeaderProps) {
    const styles = useThemeStyles();
    const renderedSubtitle = useMemo(
        () => (
            <>
                {/* If there's no subtitle then display a fragment to avoid an empty space which moves the main title */}
                {typeof subtitle === 'string'
                    ? Boolean(subtitle) && (
                          <Text
                              style={[styles.mutedTextLabel, styles.pre]}
                              numberOfLines={1}
                          >
                              {subtitle}
                          </Text>
                      )
                    : subtitle}
            </>
        ),
        [subtitle, styles.mutedTextLabel, styles.pre],
    );

    const innerStyles = useMemo(() => {
        return titleAnchor === 'left' ? [styles.justifyContentStart, styles.alignItemsStart] : [styles.justifyContentCenter, styles.alignItemsCenter];
    }, [titleAnchor, styles.justifyContentStart, styles.alignItemsStart, styles.justifyContentCenter, styles.alignItemsCenter]);

    return (
        <View style={[styles.flex1, styles.flexRow, containerStyles]}>
            <View style={[styles.flex1, styles.mw100, innerStyles]}>
                {typeof title === 'string'
                    ? Boolean(title) && (
                          <Text
                              numberOfLines={2}
                              style={[styles.headerText, styles.textLarge, textStyles]}
                          >
                              {title}
                          </Text>
                      )
                    : title}
                {renderedSubtitle}
            </View>
            {shouldShowEnvironmentBadge && <EnvironmentBadge />}
        </View>
    );
}

Header.displayName = 'Header';

export default Header;

export type {HeaderProps};
