import lodashGet from 'lodash/get';
import moment from 'moment';
import React, {useCallback, useMemo} from 'react';
import {Image as RNImage, View} from 'react-native';
import Avatar from '@components/Avatar';
import {IeattaStars} from '@components/Icon/IeattaStars';
import IeattaUserDetailsTooltip from '@components/Ieatta/detailedPage/common/IeattaUserDetailsTooltip';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import {usePersonalDetails} from '@components/OnyxProvider';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import useThemeStyles from '@hooks/useThemeStyles';
import ControlSelection from '@libs/ControlSelection';
import Log from '@libs/Log';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import type {IFBReview} from '@src/types/firebase';
import type ChildrenProps from '@src/types/utils/ChildrenProps';
import ReviewItemDate from './ReviewItemDate';
import ReviewItemFragment from './ReviewItemFragment';

type ReportActionItemSingleProps = ChildrenProps & {
    review: IFBReview;

    /** If the action is being hovered */
    isHovered?: boolean;
};

const showUserDetails = (accountID: string) => {
    Navigation.navigate(ROUTES.PROFILE.getRoute(accountID));
};

const showWorkspaceDetails = (reportID: string) => {
    Navigation.navigate(ROUTES.REPORT_WITH_ID_DETAILS.getRoute(reportID));
};

function ReviewItemSingle({review, children, isHovered = false}: ReportActionItemSingleProps) {
    const styles = useThemeStyles();
    const personalDetails = usePersonalDetails() ?? CONST.EMPTY_OBJECT;
    const reviewCreatedUser = personalDetails[review.creatorId];
    const displayName = review.username;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const actorHint = displayName.replace(CONST.REGEX.MERGED_ACCOUNT_PREFIX, '');

    // Since the display name for a report action message is delivered with the report history as an array of fragments
    // we'll need to take the displayName from personal details and have it be in the same format for now. Eventually,
    // we should stop referring to the report history items entirely for this information.
    const personArray = [
        {
            key: review.creatorId,
            type: 'TEXT',
            text: displayName,
        },
    ];

    const showActorDetails = useCallback(() => {
        showUserDetails(review.creatorId);
    }, [review.creatorId]);

    const getAvatar = () => {
        return (
            <IeattaUserDetailsTooltip userId={review.creatorId}>
                <View>
                    <Avatar
                        containerStyles={[styles.actionAvatar]}
                        avatarUrl={lodashGet(reviewCreatedUser, 'originalUrl', CONST.IEATTA_URL_EMPTY)}
                        type={CONST.ICON_TYPE_AVATAR}
                        name={reviewCreatedUser?.displayName}
                    />
                </View>
            </IeattaUserDetailsTooltip>
        );
    };

    // const created = new Date(review.createdAt).toString()
    // const created = '2023-12-22 09:24:08.810'
    // const created = '2023-12-22 09:24:08.810';
    // const created = new Date().toString()
    const created = moment(review.createdAt).format('YYYY-MM-DD hh:mm');

    // Log.info('');
    // Log.info('================================');
    // Log.info(`created in the review item single: ${created}`)
    // Log.info(`review avatar url in the review item single: ${icon.source}`)
    // Log.info('================================');
    // Log.info('');

    return (
        <View style={[styles.chatItem]}>
            <PressableWithoutFeedback
                style={[styles.alignSelfStart, styles.mr3]}
                onPressIn={ControlSelection.block}
                onPressOut={ControlSelection.unblock}
                onPress={showActorDetails}
                disabled={false}
                accessibilityLabel={actorHint}
                role={CONST.ROLE.BUTTON}
            >
                <OfflineWithFeedback pendingAction={undefined}>{getAvatar()}</OfflineWithFeedback>
            </PressableWithoutFeedback>
            <View style={[styles.chatItemRight]}>
                <View style={[styles.chatItemMessageHeader]}>
                    <PressableWithoutFeedback
                        style={[styles.flexShrink1, styles.mr1]}
                        onPressIn={ControlSelection.block}
                        onPressOut={ControlSelection.unblock}
                        onPress={showActorDetails}
                        disabled={false}
                        accessibilityLabel={actorHint}
                        role={CONST.ROLE.BUTTON}
                    >
                        {personArray?.map((fragment, index) => (
                            <ReviewItemFragment
                                // eslint-disable-next-line react/no-array-index-key
                                key={`person-${fragment.key}-${index}`}
                                userId={review.creatorId}
                                fragment={fragment}
                                isSingleLine
                            />
                        ))}
                    </PressableWithoutFeedback>
                    <ReviewItemDate created={created} />
                </View>
                <View style={[styles.flexRow, styles.alignItemsCenter, styles.mv2]}>
                    <RNImage
                        style={styles.ratingIconInRestaurantItem}
                        source={IeattaStars.STARS.SMALL[review.rate]}
                    />
                </View>
                <View style={{}}>{children}</View>
            </View>
        </View>
    );
}

ReviewItemSingle.displayName = 'ReviewItemSingle';

export default ReviewItemSingle;
