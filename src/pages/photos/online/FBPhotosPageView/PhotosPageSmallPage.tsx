/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable rulesdir/prefer-at */
import lodashGet from 'lodash/get';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import {usePersonalDetails} from '@components/OnyxProvider';
import {PressableWithFeedback} from '@components/Pressable';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {navigationToEditPhoto} from '@libs/ieatta/editFormUtils';
import {getPersonDetailFromCreatorId} from '@libs/ieatta/userUtils';
import type {PhotosPagePageProps} from '@pages/photos/online/types';
import CONST from '@src/CONST';
import type {IFBPhoto} from '@src/types/firebase';
import type {PersonalDetailsList} from '@src/types/onyx';
import ZoomableView from './ZoomableView';

function PhotosPageSmallPage({navigation, photosInPage, pageIndex}: PhotosPagePageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const personalDetails: PersonalDetailsList = usePersonalDetails() ?? CONST.EMPTY_OBJECT;

    const [showPhotoInfo, setShowPhotoInfo] = React.useState<boolean>(false);
    const initialPhoto = photosInPage[pageIndex];

    const currentPageIndex = pageIndex;
    const currentPhoto = initialPhoto;
    const currentUser = getPersonDetailFromCreatorId(personalDetails, initialPhoto);

    // Log.info('');
    // Log.info('================================');
    // Log.info(`current user in the photos small page: ${JSON.stringify(currentUser)}`);
    // Log.info('================================');
    // Log.info('');

    const onPhotoIndexChanged = useCallback(
        (index?: number) => {
            const photo = photosInPage[index ?? 0];

            navigation.setParams({selected: photo.uniqueId});
        },
        [navigation, photosInPage],
    );

    const images = photosInPage.map((photo: IFBPhoto) => {
        const imageUrl = lodashGet(photo, 'originalUrl', '').replace('http://res.cloudinary.com', 'https://res.cloudinary.com');
        // return {url: imageUrl, props: {url: imageUrl, id: photo.uniqueId}};
        return {url: imageUrl};
        // return imageUrl;
    });
    const rightEditButton = (
        <Tooltip text={translate('edit.button.photo')}>
            <PressableWithFeedback
                onPress={() => {
                    setShowPhotoInfo(false);
                    const photoId = currentPhoto.uniqueId;
                    navigationToEditPhoto({photoId});
                }}
                style={[styles.touchableButtonImage]}
                role="button"
                accessibilityLabel={translate('edit.button.photo')}
            >
                <Text color="blue">Edit</Text>
            </PressableWithFeedback>
        </Tooltip>
    );

    const touchPanel = () => {
        const avatarUrl = currentUser?.avatarThumbnail;
        const note = currentPhoto?.extraNote;
        // const note = 'The Firebase different prototype and test environments, anything from one-off prototyping sessions to production-scale continuous integration workflows.';

        return (
            <>
                <View style={[styles.pAbsolute, styles.l0, styles.r0, styles.t0, {backgroundColor: 'transparent'}]}>
                    <View style={[styles.flex1, styles.flexColumn, styles.mt15, styles.justifyContentBetween]}>
                        <View style={[{backgroundColor: 'black'}, styles.shadowXl]}>
                            <HeaderWithBackButton
                                key={currentUser?.userID}
                                titleAnchor="left"
                                policyAvatar={{
                                    source: avatarUrl ?? '',
                                    type: CONST.ICON_TYPE_AVATAR,
                                }}
                                title={currentUser?.displayName}
                                titleColor="white"
                            >
                                {rightEditButton}
                            </HeaderWithBackButton>
                        </View>
                    </View>
                </View>
                {note !== '' && (
                    <View style={[styles.pAbsolute, styles.l0, styles.r0, styles.b0, {backgroundColor: 'transparent'}]}>
                        <View style={[styles.ph6, styles.mb15, styles.pv2, {backgroundColor: 'black'}]}>
                            <Text color="white">{note}</Text>
                        </View>
                    </View>
                )}
            </>
        );
    };

    return (
        <View style={[styles.flex1, styles.w100, styles.h100, {backgroundColor: 'black'}]}>
            <ZoomableView
                key="zoomable-view"
                imageUrls={images}
                defaultIndex={currentPageIndex}
                onPhotoIndexChanged={onPhotoIndexChanged}
                onClick={() => {
                    setShowPhotoInfo(!showPhotoInfo);
                }}
            />
            {showPhotoInfo && touchPanel()}
        </View>
    );
}

export default PhotosPageSmallPage;
