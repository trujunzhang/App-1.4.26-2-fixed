import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import Avatar from '@components/Avatar';
import {PhotoCarouselPageView} from '@components/Ieatta/components/PhotosCarousel';
import ReviewItemFragment from '@components/Ieatta/detailedPage/common/DetailedReviewItem/ReviewItemFragment';
import IeattaUserDetailsTooltip from '@components/Ieatta/detailedPage/common/IeattaUserDetailsTooltip';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import {usePersonalDetails} from '@components/OnyxProvider';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import ControlSelection from '@libs/ControlSelection';
import type {PhotoType} from '@libs/Firebase/constant';
import {formatDateForPhoto} from '@libs/Firebase/utils/timeago_helper';
import {getPhotoWithId} from '@libs/ieatta/photoUtils';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import type {IFBPhoto} from '@src/types/firebase';
import type {PersonalDetails} from '@src/types/onyx';

type PhotoCarouselWithUserInfoPanelProps = {
    relatedId: string;
    photoType: PhotoType | string;

    pageIndex: number;
    pageViewId: string;
    photosInPage: IFBPhoto[];

    photoHeight?: number;
};

function PhotoCarouselWithUserInfoPanel({relatedId, photoType, pageIndex, pageViewId, photosInPage, photoHeight}: PhotoCarouselWithUserInfoPanelProps) {
    const styles = useThemeStyles();
    const personalDetails = usePersonalDetails() ?? CONST.EMPTY_OBJECT;
    const initialPhoto = photosInPage[pageIndex];
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
                        shouldShowAsAvatar
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
                    height: variables.popoverPhotoCarouselItemHeight,
                },
            ]}
        >
            <PhotoCarouselPageView
                key={`${pageViewId}-${pageIndex}`}
                relatedId={relatedId}
                photoType={photoType}
                pageIndex={pageIndex}
                photoHeight={photoHeight}
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
                    </View>
                </View>
            </View>
            {/* Date in the photo */}
            <Text style={[styles.textSupporting]}>{formatDateForPhoto(person.photoCreatedDate)}</Text>
        </View>
    );

    return (
        <View style={[styles.flexRow, styles.sectionComponentContainer]}>
            <View style={[styles.flex1]}>{leftPanel}</View>
            <View style={[styles.flex1]}>{rightPanel}</View>
        </View>
    );
}

export default PhotoCarouselWithUserInfoPanel;
