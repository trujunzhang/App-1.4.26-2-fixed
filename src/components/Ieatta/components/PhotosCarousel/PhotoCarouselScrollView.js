import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import _ from 'underscore';
import Button from '@components/Button';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import ImagePlaceholder from '@components/ImagePlaceholder';
import LinearGradient from '@components/LinearGradient';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import {ParseModelPhotos} from '@libs/Firebase/appModel';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import Log from '@libs/Log';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import PhotoCarouselButtons from './PhotoCarouselButtons';
import {defaultProps, propTypes} from './propsType';

const keyExtractor = (item) => `photo${item.uniqueId}`;

function PhotoCarouselScrollView({relatedId, photoType, photos, shouldShowMask, photoWidth, photoHeight, onLeftArrowPress, onRightArrowPress}) {
    const styles = useThemeStyles();
    const scrollRef = useRef(null);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [viewablePhotoLength, setViewablePhotoLength] = useState(0);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const photosWithPlaceholder = ParseModelPhotos.getPhotoWithPlaceholder(photos);

    const photosLength = useMemo(() => photosWithPlaceholder.length, [photosWithPlaceholder]);

    const onViewableItemsChanged = useCallback(
        ({viewableItems, changed, ...rest}) => {
            // console.log("Visible items are", viewableItems);
            // console.log("Changed in this iteration", changed);
            // console.log("Visible item position are", (viewableItems[0].index + 1));

            const entry = _.first(viewableItems);

            if (!entry) {
                return;
            }
            const startIndex = entry.index;
            const endIndex = viewableItems[viewableItems.length - 1].index;
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

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 100,
        waitForInteraction: true,
        minimumViewTime: 5,
    });

    /**
     * https://stackoverflow.com/questions/74362046/react-native-flatlist-error-onviewableitemschanged
     *
     * @type {React.MutableRefObject<[{onViewableItemsChanged: onViewableItemsChanged, viewabilityConfig: React.MutableRefObject<{minimumViewTime: number, itemVisiblePercentThreshold: number, waitForInteraction: boolean}>}]>}
     */
    const viewabilityConfigCallbackPairs = useRef([
        // {viewabilityConfig, onViewableItemsChanged},
        {onViewableItemsChanged},
    ]);

    /**
     * Function which renders a row in the list
     *
     * @param {Object} params
     * @param {Object} params.item
     *
     * @return {Component}
     */
    const renderItem = useCallback(
        ({item, index}) => {
            const carouselItem = {
                relatedId,
                photoType,
                photo: item,
                index,
                photoWidth,
                photoHeight,
            };
            return (
                <PageFlashListItemWithEvent
                    item={{
                        rowType: PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT,
                        rowData: carouselItem,
                        rowKey: 'PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT<Photo>',
                        pressType: RowPressableType.SINGLE_PRESS,
                    }}
                />
            );
        },
        [photoHeight, photoWidth, photoType, relatedId],
    );

    const jumpToPhoto = (index) => {
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
                    estimatedItemSize={variables.optionRowHeight}
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

PhotoCarouselScrollView.propTypes = propTypes;
PhotoCarouselScrollView.defaultProps = defaultProps;
PhotoCarouselScrollView.displayName = 'PhotoCarouselScrollView';

export default PhotoCarouselScrollView;
