import lodashGet from 'lodash/get';
import React from 'react';
import {Image as RNImage, View} from 'react-native';
import Avatar from '@components/Avatar';
import {IeattaStars} from '@components/Icon/IeattaStars';
import Text from '@components/Text';
import withCurrentUserPersonalDetails, {WithCurrentUserPersonalDetailsProps} from '@components/withCurrentUserPersonalDetails';
import useThemeStyles from '@hooks/useThemeStyles';
import TailwindColors from '@styles/tailwindcss/colors';
import CONST from '@src/CONST';
import IeattaUserDetailsTooltip from './IeattaUserDetailsTooltip';

type ReviewSubmitRow = {
    relatedTitle: string;
    relatedId: string;
    reviewType: string;
};

type ReviewSubmitPanelProps = WithCurrentUserPersonalDetailsProps & {
    reviewSubmitRow: ReviewSubmitRow;
};

function ReviewSubmitPanel({reviewSubmitRow, currentUserPersonalDetails}: ReviewSubmitPanelProps) {
    const styles = useThemeStyles();
    const loggedUser = currentUserPersonalDetails;
    const loggedUserId = lodashGet(loggedUser, 'userID', '');

    const getAvatar = () => {
        return (
            <IeattaUserDetailsTooltip userId={loggedUserId}>
                <View>
                    <Avatar
                        containerStyles={[styles.actionAvatar]}
                        shouldShowAsAvatar
                        avatarUrl={lodashGet(loggedUser, 'avatarThumbnail', CONST.IEATTA_URL_EMPTY)}
                        type={CONST.ICON_TYPE_AVATAR}
                        name={loggedUser.displayName}
                    />
                </View>
            </IeattaUserDetailsTooltip>
        );
    };

    const userName = (
        <IeattaUserDetailsTooltip userId={loggedUserId}>
            <Text
                numberOfLines={1}
                style={[styles.chatItemMessageHeaderSender, styles.pre]}
            >
                {loggedUser.displayName}
            </Text>
        </IeattaUserDetailsTooltip>
    );

    return (
        <View style={[styles.flexRow, styles.mh2, styles.mv2, styles.ph4, styles.pv4, styles.justifyContentBetween, styles.alignItemsCenter, styles.shadowLg]}>
            {/* Left Container */}
            <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                {getAvatar()}
                {userName}
            </View>
            {/* Right Container */}
            <View style={[styles.flexColumn]}>
                <RNImage
                    style={[styles.ratingIconInHeaderWebPanel, styles.mv3]}
                    source={IeattaStars.STARS.LARGE[0]}
                />
                <Text style={[styles.reviewCountInHeaderWebPanel, styles.ml2, styles.base, styles.fontSemiBold, {color: TailwindColors.blue400}]}>
                    {`Start you review of `}
                    <span>{reviewSubmitRow.relatedTitle}</span>
                </Text>
            </View>
        </View>
    );
}

ReviewSubmitPanel.displayName = 'ReviewSubmitPanel';

export default withCurrentUserPersonalDetails(ReviewSubmitPanel);
