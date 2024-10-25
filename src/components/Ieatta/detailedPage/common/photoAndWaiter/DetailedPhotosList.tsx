/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SectionPhotoEmptyView from '@components/Ieatta/detailedPage/common/SectionPhotoEmptyView';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import useThemeStyles from '@hooks/useThemeStyles';
import {PhotoType} from '@libs/Firebase/constant';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import {ModalNames} from '@libs/Firebase/list/types/page-row';
import {IPhotoItemRow} from '@libs/Firebase/list/types/rows/photo';
import variables from '@styles/variables';
import type {IFBPhoto} from '@src/types/firebase';

type DetailedPhotosListProps = {
    /** The ID of the related object. */
    relatedId: string;
    /** The photo type of the related object. */
    photoType: PhotoType | string;
    /** The list of photos. */
    photos: IFBPhoto[];
    /** Whether the screen is small. */
    isSmallScreen: boolean;
    /** Whether the list is loading. */
    isLoading?: boolean;
    /** The name of modal * */
    modalName?: ModalNames;
};

const keyExtractor = (item: IFBPhoto) => `row_${item.uniqueId}`;

function DetailedPhotosList({relatedId, photoType, photos, isSmallScreen, isLoading, modalName = 'photo'}: DetailedPhotosListProps) {
    const styles = useThemeStyles();

    /**
     * Function which renders a row in the list
     *
     * @param {Object} params
     * @param {Object} params.item
     *
     * @return {Component}
     */
    const renderItem = useCallback(
        // eslint-disable-next-line react/no-unused-prop-types
        ({item, index}: {item: IFBPhoto; index: number}) => {
            const photoRow: IPhotoItemRow = {
                relatedId,
                photoType,
                photo: item,
            };

            return (
                <PageFlashListItemWithEvent
                    item={{
                        rowType: PageSection.SECTION_PHOTO_ITEM,
                        rowData: photoRow,
                        rowKey: 'PageSection.SECTION_PHOTO_ITEM<Photo>',
                        modalName,
                        pressType: RowPressableType.SECONDARY_PRESS,
                    }}
                />
            );
        },
        [photoType, relatedId, modalName],
    );

    return (
        <View
            style={[
                styles.flexColumn,
                styles.w100,
                {
                    height: variables.photoInRestaurantMobileItemHeight,
                },
            ]}
        >
            {photos.length > 0 ? (
                <FlatList
                    horizontal
                    indicatorStyle="white"
                    keyboardShouldPersistTaps="always"
                    data={photos}
                    testID="page-photos-flashlist"
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={StyleSheet.flatten([styles.ph4])}
                    ItemSeparatorComponent={() => <View style={{width: 10}} />}
                />
            ) : (
                <SectionPhotoEmptyView />
            )}
        </View>
    );
}

export default DetailedPhotosList;
