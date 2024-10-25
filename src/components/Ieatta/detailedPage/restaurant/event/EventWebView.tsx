import React from 'react';
import {View} from 'react-native';
import DisplayNames from '@components/DisplayNames';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import Divider from '@components/Ieatta/components/Divider';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import {formatDateString} from '@libs/Firebase/utils/timeago_helper';
import variables from '@styles/variables';
import type {EventRowProps} from './types';

function EventWebView({eventInRestaurantRow}: EventRowProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const {event, shouldShowDivide} = eventInRestaurantRow;

    return (
        <View style={[styles.flexColumn]}>
            <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween, styles.sidebarLink, styles.sidebarLinkInnerLHN]}>
                <View style={[styles.chatLinkRowPressable, styles.flexGrow1, styles.optionItemAvatarNameWrapper, styles.optionRow, styles.justifyContentCenter]}>
                    <View style={[styles.flex1, styles.ph4, styles.flexColumn, styles.gap2]}>
                        <View style={[styles.flexRow, styles.alignItemsCenter, styles.mw100, styles.overflowHidden]}>
                            <DisplayNames
                                accessibilityLabel={translate('accessibilityHints.chatUserDisplayNames')}
                                fullTitle={event.displayName}
                                displayNamesWithTooltips={[]}
                                // displayNamesWithTooltips={optionItem.displayNamesWithTooltips}
                                tooltipEnabled
                                numberOfLines={1}
                                textStyles={[styles.optionDisplayName, styles.optionDisplayNameCompact, styles.textStrong, styles.textBlue, styles.base, styles.pre]}
                                shouldUseFullTitle
                            />
                        </View>
                        <View style={[styles.flexRow, styles.alignItemsCenter, styles.mw100, styles.overflowHidden]}>
                            <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentCenter, styles.gap3]}>
                                <Icon
                                    src={Expensicons.EventInfo}
                                    width={variables.iconSizeLarge}
                                    height={variables.iconSizeLarge}
                                    fill={theme.textSupporting}
                                />
                                <Text>{`${formatDateString(event.start)} / ${formatDateString(event.end)}`}</Text>
                            </View>
                        </View>
                        <View style={[styles.flexRow]}>
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.textLabel,
                                    {
                                        maxWidth: 800,
                                    },
                                ]}
                            >
                                {event.want}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            {shouldShowDivide && (
                <View style={[styles.flexRow, styles.justifyContentCenter, styles.ph10]}>
                    <Divider dividerStyle={[styles.justifyContentCenter]} />
                </View>
            )}
        </View>
    );
}

export default EventWebView;
