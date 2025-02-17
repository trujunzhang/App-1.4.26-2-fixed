import React, {useCallback, useRef, useState} from 'react';
import type {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {FlatList, View} from 'react-native';
import type {ImageInfo, PhotosPageViewProps} from '@components/Ieatta/components/PhotosPage/types';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import CONST from '@src/CONST';
import ExpoImageZoom from './ExpoImageZoom';

const keyExtractor = (item: ImageInfo) => `photo-${item.url}`;

function FlatPhotosList({imageUrls, defaultIndex, renderIndicator, onPhotoIndexChanged, onClick}: PhotosPageViewProps) {
    const {windowWidth: width, windowHeight: height} = useWindowDimensions();
    const styles = useThemeStyles();

    const [containerWidth, setContainerWidth] = useState(width);
    // const [containerWidth, setContainerWidth] = useState(0);
    const [isZoomed, setIsZoomed] = React.useState(false);

    const currentPage = defaultIndex;

    const scrollRef = useRef<FlatList>(null);

    /**
     * Calculate items layout information to optimize scrolling performance
     * @param {*} data
     * @param {Number} index
     * @returns {{offset: Number, length: Number, index: Number}}
     */
    const getItemLayout = useCallback(
        (_data: ArrayLike<ImageInfo> | null | undefined, index: number) => ({
            length: containerWidth,
            offset: containerWidth * index,
            index,
        }),
        [containerWidth],
    );
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.round(contentOffsetX / containerWidth);

        onPhotoIndexChanged(pageIndex);
    };

    return (
        <View style={[styles.flex1, styles.w100, styles.h100]}>
            <FlatList
                key="photos-flatlist"
                testID="photos-flatlist-tab"
                keyboardShouldPersistTaps="handled"
                horizontal
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onMomentumScrollEnd={handleScroll}
                // Scroll only one image at a time no matter how fast the user swipes
                disableIntervalMomentum
                pagingEnabled
                snapToAlignment="start"
                snapToInterval={containerWidth}
                // Enable scrolling by swiping on mobile (touch) devices only
                // disable scroll for desktop/browsers because they add their scrollbars
                // Enable scrolling FlatList only when PDF is not in a zoomed state
                scrollEnabled={!isZoomed}
                ref={scrollRef}
                initialNumToRender={3}
                windowSize={5}
                maxToRenderPerBatch={CONST.MAX_TO_RENDER_PER_BATCH.CAROUSEL}
                getItemLayout={getItemLayout}
                keyExtractor={keyExtractor}
                data={imageUrls}
                initialScrollIndex={defaultIndex}
                renderItem={({index}) => {
                    const uri = imageUrls.at(index)?.url ?? '';
                    return (
                        <View
                            key={uri}
                            testID="photos-flatlist-item"
                            // style={[styles.flex1]}
                            // style={[styles.flex1, styles.w100, styles.h100]}
                            style={[styles.flex1, {width, height}]}
                        >
                            <ExpoImageZoom
                                key={uri}
                                uri={uri}
                                setIsZoomed={setIsZoomed}
                                onClick={onClick}
                            />
                        </View>
                    );
                }}
            />
            {renderIndicator(currentPage + 1, imageUrls.length)}
        </View>
    );
}

export default FlatPhotosList;
