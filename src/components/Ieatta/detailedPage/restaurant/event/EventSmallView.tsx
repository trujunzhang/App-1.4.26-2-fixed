import React from 'react';
import {View} from 'react-native';
import DisplayNames from '@components/DisplayNames';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';
import type {EventRowProps} from './types';

function EventSmallView({eventInRestaurantRow}: EventRowProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const {event, shouldShowDivide} = eventInRestaurantRow;

    return (
        <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween, styles.sidebarLink, styles.sidebarLinkInnerLHN]}>
            <View style={[styles.chatLinkRowPressable, styles.flexGrow1, styles.optionItemAvatarNameWrapper, styles.optionRow, styles.justifyContentCenter]}>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <View style={[styles.alignItemsCenter, styles.justifyContentCenter]}>
                        <Icon
                            src={Expensicons.EventInfo}
                            fill={theme.danger}
                            width={variables.iconSizeLarge}
                            height={variables.iconSizeLarge}
                        />
                    </View>

                    <View style={[styles.flex1, styles.ph4, styles.flexColumn]}>
                        <View style={[styles.flexRow, styles.alignItemsCenter, styles.mw100, styles.overflowHidden]}>
                            <DisplayNames
                                accessibilityLabel={translate('accessibilityHints.chatUserDisplayNames')}
                                fullTitle={event.displayName}
                                displayNamesWithTooltips={[]}
                                // displayNamesWithTooltips={optionItem.displayNamesWithTooltips}
                                tooltipEnabled
                                numberOfLines={1}
                                textStyles={[styles.optionDisplayName, styles.optionDisplayNameCompact, styles.fontMedium, styles.pre]}
                                shouldUseFullTitle
                            />
                        </View>
                        <View style={[styles.flexRow]}>
                            <Text
                                numberOfLines={2}
                                style={[styles.textLabel]}
                            >
                                {event.want}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={[styles.flexRow, styles.alignItemsCenter]}
                accessible={false}
            >
                <View
                    style={styles.ml2}
                    accessibilityLabel={translate('sidebarScreen.chatPinned')}
                >
                    <Icon
                        testID="Pin Icon"
                        fill={theme.icon}
                        src={Expensicons.ArrowRight}
                    />
                </View>
            </View>
        </View>
    );
}

export default EventSmallView;
