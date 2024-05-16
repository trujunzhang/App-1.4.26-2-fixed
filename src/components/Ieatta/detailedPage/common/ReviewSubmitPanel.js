import PropTypes from 'prop-types';
import React, {useCallback, useMemo} from 'react';
import {FlatList as RestaurantList, Image as RNImage, View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import Avatar from '@components/Avatar';
import {IeattaStars} from '@components/Icon/IeattaStars';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import participantPropTypes from '@components/participantPropTypes';
import Text from '@components/Text';
import withCurrentRestaurantID, {withCurrentRestaurantIDDefaultProps, withCurrentRestaurantIDPropTypes} from '@components/withCurrentRestaurantID';
import withCurrentUserPersonalDetails, {withCurrentUserPersonalDetailsDefaultProps, withCurrentUserPersonalDetailsPropTypes} from '@components/withCurrentUserPersonalDetails';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import compose from '@libs/compose';
import {buildRestaurantSidebar} from '@libs/Firebase/list/builder/restaurant';
import {restaurantPropTypes} from '@pages/proptypes';
import stylePropTypes from '@styles/stylePropTypes';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import IeattaUserDetailsTooltip from './IeattaUserDetailsTooltip';

const propTypes = {
    reviewSubmitRow: PropTypes.shape({
        relatedTitle: PropTypes.string.isRequired,
        relatedId: PropTypes.string.isRequired,
        reviewType: PropTypes.string.isRequired,
    }).isRequired,
    ...withCurrentUserPersonalDetailsPropTypes,
};

const defaultProps = {
    ...withCurrentUserPersonalDetailsDefaultProps,
};

function ReviewSubmitPanel(props) {
    const {reviewSubmitRow, currentUserPersonalDetails} = props;

    const styles = useThemeStyles();
    const loggedUser = currentUserPersonalDetails;

    const getAvatar = () => {
        return (
            <IeattaUserDetailsTooltip userId={loggedUser.accountID}>
                <View>
                    <Avatar
                        containerStyles={[styles.actionAvatar]}
                        avatarUrl={loggedUser.avatar}
                        type={CONST.ICON_TYPE_AVATAR}
                        name={loggedUser.displayName}
                    />
                </View>
            </IeattaUserDetailsTooltip>
        );
    };

    const userName = (
        <IeattaUserDetailsTooltip userId={loggedUser.userID}>
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

ReviewSubmitPanel.propTypes = propTypes;
ReviewSubmitPanel.defaultProps = defaultProps;
ReviewSubmitPanel.displayName = 'ReviewSubmitPanel';

export default compose(
    withCurrentUserPersonalDetails,
    withOnyx({
        session: {
            key: ONYXKEYS.SESSION,
        },
    }),
)(ReviewSubmitPanel);
