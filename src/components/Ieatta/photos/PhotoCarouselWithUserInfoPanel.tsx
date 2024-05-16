import _ from 'lodash';
import lodashGet from 'lodash/get';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {useCallback, useMemo, useState} from 'react';
import {Image as RNImage, View} from 'react-native';
import Avatar from '@components/Avatar';
import {IeattaStars} from '@components/Icon/IeattaStars';
import {PhotoCarouselPageView} from '@components/Ieatta/components/PhotosCarousel';
import {defaultProps, propTypes} from '@components/Ieatta/components/PhotosCarousel/propsType';
import ReviewItemFragment from '@components/Ieatta/detailedPage/common/DetailedReviewItem/ReviewItemFragment';
import IeattaUserDetailsTooltip from '@components/Ieatta/detailedPage/common/IeattaUserDetailsTooltip';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import {usePersonalDetails} from '@components/OnyxProvider';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import Text from '@components/Text';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import useThemeStyles from '@hooks/useThemeStyles';
import compose from '@libs/compose';
import ControlSelection from '@libs/ControlSelection';
import {formatDateForPhoto} from '@libs/Firebase/utils/timeago_helper';
import Log from '@libs/Log';
import Navigation from '@libs/Navigation/Navigation';
import review from '@pages/edit/review';
import {photoPropTypes} from '@pages/proptypes';
import personalDetailsPropType from '@expPages/personalDetailsPropType';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import type {IFBPhoto} from '@src/types/firebase';
import type {PersonalDetails} from '@src/types/onyx';

type PhotoCarouselWithUserInfoPanelProps = {
    initialPhotoId: string;
    pageViewId: string;
    photosInPage: IFBPhoto[];
};

function PhotoCarouselWithUserInfoPanel({initialPhotoId, pageViewId, photosInPage}: PhotoCarouselWithUserInfoPanelProps) {
    const styles = useThemeStyles();
    const personalDetails = usePersonalDetails() ?? CONST.EMPTY_OBJECT;
    const initialPhoto = _.find(photosInPage, (photo) => {
        return photo.uniqueId === initialPhotoId;
    });
    const initialUser: PersonalDetails | null = personalDetails[lodashGet(initialPhoto, 'creatorId', '')] ?? null;
    const [person, setPerson] = useState({
        key: lodashGet(initialUser, 'userID', ''),
        type: 'TEXT',
        text: lodashGet(initialUser, 'displayName', ''),
        avatarUrl: lodashGet(initialUser, 'avatarThumbnail', ''),
        photoCreatedDate: lodashGet(initialPhoto, 'createdAt', ''),
    });

    const onPhotoChanged = (selectedPhoto: IFBPhoto) => {
        const nextUser: PersonalDetails | null = personalDetails[lodashGet(selectedPhoto, 'creatorId', '')] ?? null;
        setPerson({
            key: lodashGet(nextUser, 'userID', ''),
            type: 'TEXT',
            text: lodashGet(nextUser, 'displayName', ''),
            avatarUrl: lodashGet(nextUser, 'avatarThumbnail', ''),
            photoCreatedDate: lodashGet(selectedPhoto, 'createdAt', ''),
        });
    };

    const getAvatar = () => {
        return (
            <IeattaUserDetailsTooltip
                key={`avatar-${person.key}`}
                userId={person.key}
            >
                <View>
                    <Avatar
                        key={`avatar-${person.key}`}
                        containerStyles={[styles.actionAvatar]}
                        avatarUrl={person.avatarUrl}
                        type={CONST.ICON_TYPE_AVATAR}
                        name={person.text}
                    />
                </View>
            </IeattaUserDetailsTooltip>
        );
    };

    const leftPanel = (
        <View
            style={[
                {
                    width: variables.popoverPhotoCarouselItemWidth,
                    height: variables.popoverPhotoCarouselItemHeight,
                },
            ]}
        >
            <PhotoCarouselPageView
                key={pageViewId}
                initialPhotoId={initialPhotoId}
                photoWidth={variables.popoverPhotoCarouselItemWidth}
                photoHeight={variables.popoverPhotoCarouselItemHeight}
                photos={photosInPage}
                onPhotoChanged={onPhotoChanged}
            />
        </View>
    );
    const showActorDetails = useCallback(() => {}, []);

    const rightPanel = (
        <View
            style={[
                styles.flexColumn,
                styles.ph4,
                styles.pv4,
                styles.gap2,
                {
                    width: variables.popoverPhotoUserInfoWidth,
                    height: variables.popoverPhotoCarouselItemHeight,
                },
            ]}
        >
            <View style={[styles.flexRow, styles.alignItemsCenter]}>
                <PressableWithoutFeedback
                    style={[styles.mr3]}
                    onPressIn={ControlSelection.block}
                    onPressOut={ControlSelection.unblock}
                    onPress={showActorDetails}
                    disabled={false}
                    accessibilityLabel={person.text}
                    role={CONST.ROLE.BUTTON}
                >
                    <OfflineWithFeedback pendingAction={undefined}>{getAvatar()}</OfflineWithFeedback>
                </PressableWithoutFeedback>
                <View style={[]}>
                    <View style={[]}>
                        <PressableWithoutFeedback
                            style={[styles.mr1]}
                            onPressIn={ControlSelection.block}
                            onPressOut={ControlSelection.unblock}
                            onPress={showActorDetails}
                            disabled={false}
                            accessibilityLabel={person.text}
                            role={CONST.ROLE.BUTTON}
                        >
                            <ReviewItemFragment
                                key={`person-${person.key}`}
                                userId={person.key}
                                fragment={person}
                                isSingleLine
                            />
                        </PressableWithoutFeedback>
                        {/* <ReviewItemDate created={created} /> */}
                    </View>
                </View>
            </View>
            {/* Date in the photo */}
            <Text style={[styles.textSupporting]}>{formatDateForPhoto(person.photoCreatedDate)}</Text>
        </View>
    );

    return (
        <View style={[styles.flexRow, styles.sectionComponentContainer]}>
            {leftPanel}
            {rightPanel}
        </View>
    );
}

export default PhotoCarouselWithUserInfoPanel;
