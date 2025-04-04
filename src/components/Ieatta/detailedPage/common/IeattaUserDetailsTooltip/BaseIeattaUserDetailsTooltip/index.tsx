/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import lodashGet from 'lodash/get';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import Avatar from '@components/Avatar';
import type IeattaUserDetailsTooltipProps from '@components/Ieatta/detailedPage/common/IeattaUserDetailsTooltip/types';
import {usePersonalDetails} from '@components/OnyxProvider';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';
import type {PersonalDetails} from '@src/types/onyx';

function BaseIeattaUserDetailsTooltip({userId, children}: IeattaUserDetailsTooltipProps) {
    const styles = useThemeStyles();
    const personalDetails: Record<string, any> = usePersonalDetails() ?? CONST.EMPTY_OBJECT;
    const user: PersonalDetails | null = personalDetails[userId];

    const renderTooltipContent = useCallback(() => {
        const avatarUrl = lodashGet(user, 'avatarThumbnail', '');
        return (
            <View style={[styles.alignItemsCenter, styles.ph2, styles.pv2]}>
                <View style={styles.emptyAvatar}>
                    <Avatar
                        containerStyles={[styles.actionAvatar]}
                        shouldShowAsAvatar
                        avatarUrl={avatarUrl}
                        type={CONST.ICON_TYPE_AVATAR}
                        name={user?.displayName}
                    />
                </View>
                <Text style={[styles.mt2, styles.textMicroBold, styles.textReactionSenders, styles.textAlignCenter]}>{user?.displayName}</Text>
            </View>
        );
    }, [
        user,
        styles.alignItemsCenter,
        styles.ph2,
        styles.pv2,
        styles.emptyAvatar,
        styles.actionAvatar,
        styles.mt2,
        styles.textMicroBold,
        styles.textReactionSenders,
        styles.textAlignCenter,
    ]);

    return (
        <Tooltip
            renderTooltipContent={renderTooltipContent}
            renderTooltipContentKey={[user?.userID ?? '', user?.displayName ?? '']}
            shouldHandleScroll
        >
            {children}
        </Tooltip>
    );
}

BaseIeattaUserDetailsTooltip.displayName = 'BaseIeattaUserDetailsTooltip';

export default BaseIeattaUserDetailsTooltip;
