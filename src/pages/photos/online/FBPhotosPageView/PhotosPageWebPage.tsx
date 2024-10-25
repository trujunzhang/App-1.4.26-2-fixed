import _ from 'lodash';
import React from 'react';
import {ScrollView, View} from 'react-native';
import CommonFooter from '@components/Ieatta/components/CommonFooter';
import PhotoCarouselWithUserInfoPanel from '@components/Ieatta/photos/PhotoCarouselWithUserInfoPanel';
import useThemeStyles from '@hooks/useThemeStyles';
import TopModalInfoPanel from '@pages/photos/online/TopModalInfoPanel';
import type {PhotosPagePageProps} from '@pages/photos/online/types';
import variables from '@styles/variables';
import type {IFBPhoto} from '@src/types/firebase';

function PhotosPageWebPage({pageIndex, relatedId, photoType, photosInPage}: PhotosPagePageProps) {
    const styles = useThemeStyles();

    const onPhotoChanged = (selectedPhoto: IFBPhoto) => {};

    return (
        <View style={[styles.ph10, styles.flex1]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flexGrow1}
            >
                <TopModalInfoPanel
                    relatedId={relatedId}
                    photoType={photoType}
                />
                <PhotoCarouselWithUserInfoPanel
                    relatedId={relatedId}
                    photoType={photoType}
                    pageViewId={`photos-page-${photosInPage.length}`}
                    pageIndex={pageIndex}
                    photosInPage={photosInPage}
                    photoHeight={variables.popoverPhotoCarouselItemHeight}
                />
                <CommonFooter />
            </ScrollView>
        </View>
    );
}

export default PhotosPageWebPage;
