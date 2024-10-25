import type {ViewabilityConfigCallbackPairs, ViewToken} from '@react-native/virtualized-lists/Lists/VirtualizedList';
import _ from 'lodash';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import type {ViewabilityConfigCallbackPair} from 'react-native';
import {FlatList, View} from 'react-native';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import LinearGradient from '@components/LinearGradient';
import useThemeStyles from '@hooks/useThemeStyles';
import {ParseModelPhotos} from '@libs/Firebase/appModel';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import type {IPhotoCarouselItemRow} from '@libs/Firebase/list/types/rows/photo';
import variables from '@styles/variables';
import type {IFBPhoto} from '@src/types/firebase';
import PhotoCarouselButtons from './PhotoCarouselButtons';
import type {PhotoCarouselScrollViewProps} from './types';

const keyExtractor = (item: IFBPhoto) => `photo${item.uniqueId}`;

function PhotoCarouselScrollView({
    relatedId,
    photoType,
    photos,
    shouldShowMask = false,
    photoWidth = variables.detailedHeaderPhotoCarouselItemWidth,
    photoHeight = variables.detailedHeaderPhotoCarouselItemHeight,
    onLeftArrowPress = () => {},
    onRightArrowPress = () => {},
}: PhotoCarouselScrollViewProps) {
    const styles = useThemeStyles();
    const scrollRef = useRef<FlatList>(null);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [viewablePhotoLength, setViewablePhotoLength] = useState(0);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const photosWithPlaceholder = ParseModelPhotos.getPhotoWithPlaceholder(photos);

    const photosLength = useMemo(() => photosWithPlaceholder.length, [photosWithPlaceholder.length]);

    const onViewableItemsChanged = useCallback(
        ({viewableItems, changed}: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
            // console.log("Visible items are", viewableItems);
            // console.log("Changed in this iteration", changed);
            // console.log("Visible item position are", (viewableItems[0].index + 1));

            const entry = _.first(viewableItems);

            if (!entry) {
                return;
            }
            const startIndex = entry.index;
            const endIndex = viewableItems[viewableItems.length - 1].index;
            if (_.isNull(startIndex) || _.isNull(endIndex)) {
                return;
            }
            setViewablePhotoLength(viewableItems.length);
            setPhotoIndex(startIndex);
            setShowLeftArrow(startIndex > 0 && photosLength >= 4);
            setShowRightArrow(endIndex < photosLength - 1);

            // Log.info("")
            // Log.info("================================")
            // console.log(`photosLength: ${photosLength}`)
            // Log.info("Visible startIndex: ", startIndex, " endIndex: ", endIndex);
            // Log.info("================================")
            // Log.info("")
        },
        [photosLength],
    );

    /**
     * https://stackoverflow.com/questions/74362046/react-native-flatlist-error-onviewableitemschanged
     *
     * @type {React.MutableRefObject<[{onViewableItemsChanged: onViewableItemsChanged, viewabilityConfig: React.MutableRefObject<{minimumViewTime: number, itemVisiblePercentThreshold: number, waitForInteraction: boolean}>}]>}
     */
    const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>([
        // {viewabilityConfig, onViewableItemsChanged},
        {onViewableItemsChanged},
    ] as unknown as ViewabilityConfigCallbackPair[]);

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
        ({item: photo, index}: {item: IFBPhoto; index: number}) => {
            const carouselItem: IPhotoCarouselItemRow = {
                relatedId,
                photoType,
                photo,
                photoWidth,
                photoHeight,
                index,
            };
            return (
                <PageFlashListItemWithEvent
                    item={{
                        rowType: PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT,
                        rowData: carouselItem,
                        rowKey: 'PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT<Photo>',
                        modalName: 'photo',
                        pressType: ParseModelPhotos.isPlacehoderphoto(photo) ? RowPressableType.NO_EVENT : RowPressableType.SECONDARY_PRESS,
                    }}
                />
            );
        },
        [photoHeight, photoWidth, photoType, relatedId],
    );

    const jumpToPhoto = (index: number) => {
        if (!scrollRef.current) {
            return;
        }
        if (index > photosLength - 1 - viewablePhotoLength) {
            scrollRef.current.scrollToEnd({animated: true});
        } else {
            scrollRef.current.scrollToIndex({index, animated: true});
        }
    };

    return (
        <View style={[styles.w100, styles.h100, {backgroundColor: 'transparent'}]}>
            <View style={[styles.flex1, styles.w100, styles.h100]}>
                <FlatList
                    ref={scrollRef}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
                    horizontal
                    indicatorStyle="white"
                    keyboardShouldPersistTaps="always"
                    data={photosWithPlaceholder}
                    testID="carouse-photosWithPlaceholder-list"
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    // estimatedItemSize={variables.optionRowHeight}
                />
            </View>
            {shouldShowMask && (
                <View
                    style={[
                        styles.pAbsolute,
                        {
                            left: 0,
                            right: 0,
                            bottom: 0,
                        },
                    ]}
                >
                    <LinearGradient
                        style={[styles.flex1]}
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}
                        colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.7)']}
                    />
                </View>
            )}
            <PhotoCarouselButtons
                photoWidth={photoWidth}
                photoHeight={photoHeight}
                photoIndex={photoIndex}
                shouldShowLeftArrow={showLeftArrow}
                shouldShowRightArrow={showRightArrow}
                jumpToPhoto={jumpToPhoto}
                onLeftArrowPress={onLeftArrowPress}
                onRightArrowPress={onRightArrowPress}
            />
        </View>
    );
}

PhotoCarouselScrollView.displayName = 'PhotoCarouselScrollView';

export default PhotoCarouselScrollView;
