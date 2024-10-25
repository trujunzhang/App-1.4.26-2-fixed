import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import * as Expensicons from '@components/Icon/Expensicons';
import ImagePlaceholder from '@components/ImagePlaceholder';
import {usePersonalDetails} from '@components/OnyxProvider';
import {PressableWithFeedback} from '@components/Pressable';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {getPhotoIndexWithId, getPhotoWithId} from '@libs/ieatta/photoUtils';
import {getPersonDetailFromCreatorId} from '@libs/ieatta/userUtils';
import Log from '@libs/Log';
import StatusBar from '@libs/StatusBar';
import type {PhotosPagePageProps} from '@pages/photos/online/types';
import Image from '@src/components/Image';
import CONST from '@src/CONST';
import type {IFBPhoto, IFBUser} from '@src/types/firebase';
import type {PersonalDetails, PersonalDetailsList} from '@src/types/onyx';
import ImageViewer from './ImageViewer';

function PhotosPageSmallPage({photosInPage, pageIndex}: PhotosPagePageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const personalDetails: PersonalDetailsList = usePersonalDetails() ?? CONST.EMPTY_OBJECT;

    const [showPhotoInfo, setShowPhotoInfo] = React.useState<boolean>(false);
    const initialPhoto = photosInPage[pageIndex];
    // const initialPhoto = getPhotoWithId(photosInPage, initialPhotoId);
    // const initialPhotoIndex = getPhotoIndexWithId(photosInPage, initialPhotoId);

    const [currentPhoto, setCurrentPhoto] = useState<IFBPhoto | undefined>(initialPhoto);
    const [currentUser, setCurrentUser] = useState<PersonalDetails | null>(getPersonDetailFromCreatorId(personalDetails, initialPhoto));

    // Log.info('');
    // Log.info('================================');
    // Log.info(`current user in the photos small page: ${JSON.stringify(currentUser)}`);
    // Log.info('================================');
    // Log.info('');

    const onPhotoIndexChanged = useCallback(
        (index?: number) => {
            const photo = photosInPage[index ?? 0];
            const user = personalDetails[photo.creatorId];
            setCurrentPhoto(photo);
            setCurrentUser(user);
        },
        [photosInPage],
    );

    const images = photosInPage.map((photo: IFBPhoto) => {
        return {url: lodashGet(photo, 'originalUrl', '').replace('http://res.cloudinary.com', 'https://res.cloudinary.com')};
    });
    const rightResetButton = (
        <Tooltip text={translate('edit.reset')}>
            <PressableWithFeedback
                onPress={() => {
                    // clearDraftValuesByDraftId(editFormDraftID);
                }}
                style={[styles.touchableButtonImage]}
                role="button"
                accessibilityLabel={translate('edit.reset')}
            >
                <Text color="blue">Edit</Text>
            </PressableWithFeedback>
        </Tooltip>
    );

    const modalBg = (
        <ImageViewer
            imageUrls={images}
            renderImage={(props) => (
                <ImagePlaceholder
                    key={currentPhoto?.uniqueId}
                    sourceUri={lodashGet(currentPhoto, 'originalUrl', '')}
                    style={[styles.w100, styles.h100]}
                    imageType="png"
                    placeholder={Expensicons.PNGBusinessMediumSquare}
                />
            )}
            renderIndicator={(currentIndex?: number, allSize?: number) => (
                <View style={[styles.count]}>
                    <Text style={[styles.countText]}>{`${currentIndex}/${allSize}`}</Text>
                </View>
            )}
            backgroundColor="black"
            onChange={onPhotoIndexChanged}
            onClick={() => {
                setShowPhotoInfo(showPhotoInfo === false);
            }}
            index={pageIndex}
        />
    );
    const touchPanel = () => {
        const avatarUrl = lodashGet(currentUser, 'avatarThumbnail', CONST.IEATTA_URL_EMPTY);
        const note = currentPhoto?.extraNote;
        // const note = 'The Firebase different prototype and test environments, anything from one-off prototyping sessions to production-scale continuous integration workflows.';

        return (
            <View style={[styles.pAbsolute, styles.pInset, {backgroundColor: 'transparent'}]}>
                <View style={[styles.flex1, styles.flexColumn, styles.mt15, styles.justifyContentBetween]}>
                    <View style={[{backgroundColor: 'black'}, styles.shadowXl]}>
                        <HeaderWithBackButton
                            key={currentUser?.userID}
                            titleAnchor="left"
                            policyAvatar={{
                                avatarUrl,
                            }}
                            title={currentUser?.displayName}
                            titleColor="white"
                        >
                            {rightResetButton}
                        </HeaderWithBackButton>
                    </View>
                    <View style={[styles.ph6, styles.mb15]}>
                        <Text color="white">{note}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.flex1, styles.w100, styles.h100]}>
            {modalBg}
            {showPhotoInfo && touchPanel()}
        </View>
    );
}

export default PhotosPageSmallPage;
