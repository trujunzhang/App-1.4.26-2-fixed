import _ from 'lodash';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Keyboard, PixelRatio, View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import BlockingView from '@components/BlockingViews/BlockingView';
import * as Illustrations from '@components/Icon/Illustrations';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import Text from '@components/Text';
import withLocalize from '@components/withLocalize';
import withWindowDimensions from '@components/withWindowDimensions';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import compose from '@libs/compose';
import * as DeviceCapabilities from '@libs/DeviceCapabilities';
import {ParseModelPhotos} from '@libs/Firebase/appModel';
import {PhotoType} from '@libs/Firebase/constant';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import Navigation from '@libs/Navigation/Navigation';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import PhotoCarouselButtons from './PhotoCarouselButtons';
import {pageDefaultProps, pagePropTypes} from './propsType';

const viewabilityConfig = {
    // To facilitate paging through the attachments, we want to consider an item "viewable" when it is
    // more than 95% visible. When that happens we update the page index in the state.
    itemVisiblePercentThreshold: 95,
};

const keyExtractor = (item) => `photo${item.uniqueId}`;

function PhotoCarouselPageView({onPhotoChanged, initialPhotoId, pageViewId, photos, shouldShowMask, photoWidth, photoHeight, onLeftArrowPress, onRightArrowPress}) {
    const styles = useThemeStyles();
    const scrollRef = useRef(null);

    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const canUseTouchScreen = DeviceCapabilities.canUseTouchScreen();

    const [containerWidth, setContainerWidth] = useState(0);
    const photoIndex = _.findIndex(
        photos,
        (photo) => {
            return photo.uniqueId === initialPhotoId;
        },
        0,
    );
    const [page, setPage] = useState(photoIndex);

    const photosWithPlaceholder = photos;
    const photosLength = useMemo(() => photosWithPlaceholder.length, [photosWithPlaceholder]);

    const setShouldShowArrows = (showArrow) => {};

    const jumpToPhoto = (index) => {
        if (!scrollRef.current) {
            return;
        }
        scrollRef.current.scrollToIndex({index, animated: true});
    };

    /**
     * Updates the page state when the user navigates between attachments
     * @param {Object} item
     * @param {number} index
     */
    const onViewableItemsChanged = useCallback(
        ({viewableItems}) => {
            Keyboard.dismiss();

            // Since we can have only one item in view at a time, we can use the first item in the array
            // to get the index of the current page
            const entry = _.first(viewableItems);
            if (!entry) {
                return;
            }
            const startIndex = entry.index;

            setPage(startIndex);
            onPhotoChanged(photosWithPlaceholder[startIndex]);

            setShowLeftArrow(startIndex > 0);
            setShowRightArrow(startIndex < photosLength - 1);

            window.location.href = ROUTES.PHOTOS_PAGE.getRoute({relatedId});
        },
        [photosLength, onPhotoChanged, photosWithPlaceholder],
    );

    // const viewabilityConfig = useRef({
    //   itemVisiblePercentThreshold: 100,
    //   waitForInteraction: true,
    //   minimumViewTime: 5,
    // });

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
     * Calculate items layout information to optimize scrolling performance
     * @param {*} data
     * @param {Number} index
     * @returns {{offset: Number, length: Number, index: Number}}
     */
    const getItemLayout = useCallback(
        (_data, index) => ({
            length: containerWidth,
            offset: containerWidth * index,
            index,
        }),
        [containerWidth],
    );

    /**
     * Defines how a single attachment should be rendered
     * @param {Object} item
     * @param {String} item.reportActionID
     * @param {Boolean} item.isAuthTokenRequired
     * @param {String} item.source
     * @param {Object} item.file
     * @param {String} item.file.name
     * @param {Boolean} item.hasBeenFlagged
     * @returns {JSX.Element}
     */
    const renderItem = useCallback(
        ({item, index}) => {
            const carouselItem = {
                relatedId: 'notApplicable',
                photoType: PhotoType.Unknown,
                photo: item,
                index,
                photoWidth,
                photoHeight,
            };
            return (
                <PageFlashListItemWithEvent
                    item={{
                        rowType: PageSection.PHOTO_CAROUSEL_ITEM_WITHOUT_EVENT,
                        rowData: carouselItem,
                        rowKey: 'PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT<Photo>',
                        pressType: RowPressableType.NO_EVENT,
                    }}
                />
            );
        },
        [photoHeight, photoWidth],
    );

    const bottomPanel = (
        <View style={[styles.pAbsolute, styles.l0, styles.r0, styles.b0, {height: 24}, {backgroundColor: 'rgba(0,0,0,.7)'}]}>
            <View style={[styles.flexRow, styles.ph2, styles.justifyContentBetween]}>
                <Text style={[styles.textSupporting]}>Browse all</Text>
                <Text style={[styles.textSupporting]}>
                    {page + 1} of {photosLength}
                </Text>
                <p />
            </View>
        </View>
    );

    return (
        <View
            style={[styles.flex1, styles.attachmentCarouselContainer]}
            onLayout={({nativeEvent}) => setContainerWidth(PixelRatio.roundToNearestPixel(nativeEvent.layout.width))}
            onMouseEnter={() => !canUseTouchScreen && setShouldShowArrows(true)}
            onMouseLeave={() => !canUseTouchScreen && setShouldShowArrows(false)}
        >
            <>
                {containerWidth > 0 && (
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        listKey="PhotoCarouselPageView"
                        horizontal
                        decelerationRate="fast"
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        // Scroll only one image at a time no matter how fast the user swipes
                        disableIntervalMomentum
                        pagingEnabled
                        snapToAlignment="start"
                        snapToInterval={containerWidth}
                        // Enable scrolling by swiping on mobile (touch) devices only
                        // disable scroll for desktop/browsers because they add their scrollbars
                        // Enable scrolling FlatList only when PDF is not in a zoomed state
                        scrollEnabled
                        ref={scrollRef}
                        initialScrollIndex={page}
                        initialNumToRender={3}
                        windowSize={5}
                        maxToRenderPerBatch={CONST.MAX_TO_RENDER_PER_BATCH.CAROUSEL}
                        data={photosWithPlaceholder}
                        renderItem={renderItem}
                        getItemLayout={getItemLayout}
                        keyExtractor={keyExtractor}
                        viewabilityConfig={viewabilityConfig}
                        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                        // onViewableItemsChanged={updatePage}
                    />
                )}

                <PhotoCarouselButtons
                    photoWidth={photoWidth}
                    photoHeight={photoHeight}
                    photoIndex={page}
                    shouldShowLeftArrow={showLeftArrow}
                    shouldShowRightArrow={showRightArrow}
                    jumpToPhoto={jumpToPhoto}
                    onLeftArrowPress={onLeftArrowPress}
                    onRightArrowPress={onRightArrowPress}
                />
            </>
            {bottomPanel}
        </View>
    );
}

PhotoCarouselPageView.propTypes = pagePropTypes;
PhotoCarouselPageView.defaultProps = pageDefaultProps;
PhotoCarouselPageView.displayName = 'PhotoCarouselPageView';

export default compose(withOnyx({}), withLocalize, withWindowDimensions)(PhotoCarouselPageView);
