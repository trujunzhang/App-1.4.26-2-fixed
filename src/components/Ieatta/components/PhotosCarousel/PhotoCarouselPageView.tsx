import type {ViewabilityConfigCallbackPairs} from '@react-native/virtualized-lists/Lists/VirtualizedList';
import _ from 'lodash';
import moment from 'moment';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import type {ViewabilityConfigCallbackPair, ViewToken} from 'react-native';
import {FlatList, Keyboard, PixelRatio, View} from 'react-native';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import {PressableWithFeedback} from '@components/Pressable';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import withWindowDimensions from '@components/withWindowDimensions';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as DeviceCapabilities from '@libs/DeviceCapabilities';
import {PhotoType} from '@libs/Firebase/constant';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import type {IPhotoCarouselItemRow} from '@libs/Firebase/list/types/rows/photo';
import Navigation from '@libs/Navigation/Navigation';
import * as PhotosPageContextMenu from '@pages/photos/online/Popover/ContextMenu/PhotosPageContextMenu';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import type {IFBPhoto} from '@src/types/firebase';
import PhotoCarouselButtons from './PhotoCarouselButtons';
import type {PhotoCarouselPageViewProps} from './types';

const viewabilityConfig = {
    // To facilitate paging through the attachments, we want to consider an item "viewable" when it is
    // more than 95% visible. When that happens we update the page index in the state.
    itemVisiblePercentThreshold: 95,
};

function PhotoCarouselPageView({
    relatedId,
    photoType,
    onPhotoChanged,
    pageIndex,
    photos = [],
    shouldShowMask = false,
    photoHeight = variables.detailedHeaderPhotoCarouselItemHeight,
    onLeftArrowPress = () => {},
    onRightArrowPress = () => {},
}: PhotoCarouselPageViewProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const scrollRef = useRef<FlatList>(null);

    const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
    const [showRightArrow, setShowRightArrow] = useState<boolean>(false);

    const canUseTouchScreen = DeviceCapabilities.canUseTouchScreen();

    const [containerWidth, setContainerWidth] = useState(0);
    const [page, setPage] = useState<number>(pageIndex);

    const photosWithPlaceholder = photos;
    const photosLength = useMemo(() => photosWithPlaceholder.length, [photosWithPlaceholder.length]);

    const keyExtractor = (item: IFBPhoto) => `photo-${containerWidth}-${item.uniqueId}`;

    const setShouldShowArrows = (shouldShow: boolean) => {};

    const jumpToPhoto = (index: number) => {
        if (!scrollRef.current) {
            return;
        }
        scrollRef.current.scrollToIndex({index, animated: true});
    };

    const onSeeAllPhotosPress = useCallback(() => {
        PhotosPageContextMenu.hideContextMenu(false);
        Navigation.navigate(ROUTES.PHOTOS_GRID_VIEW.getRoute({relatedId, photoType}));
    }, [photoType, relatedId]);

    /**
     * Updates the page state when the user navigates between attachments
     * @param {Object} item
     * @param {number} index
     */
    const onViewableItemsChanged = useCallback(
        ({viewableItems}: {viewableItems: ViewToken[]}) => {
            Keyboard.dismiss();

            // Since we can have only one item in view at a time, we can use the first item in the array
            // to get the index of the current page
            const entry = _.first(viewableItems);
            if (!entry) {
                return;
            }
            const startIndex = entry.index;
            if (_.isNull(startIndex)) {
                return;
            }

            setPage(startIndex);
            onPhotoChanged(photosWithPlaceholder[startIndex]);

            setShowLeftArrow(startIndex > 0);
            setShowRightArrow(startIndex < photosLength - 1);

            // window.location.href = ROUTES.PHOTOS_PAGE.getRoute({relatedId});
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
    const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>([
        // {viewabilityConfig, onViewableItemsChanged},
        {onViewableItemsChanged},
    ] as unknown as ViewabilityConfigCallbackPair[]);

    /**
     * Calculate items layout information to optimize scrolling performance
     * @param {*} data
     * @param {Number} index
     * @returns {{offset: Number, length: Number, index: Number}}
     */
    const getItemLayout = useCallback(
        (_data: ArrayLike<IFBPhoto> | null | undefined, index: number) => ({
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
        // eslint-disable-next-line react/no-unused-prop-types
        ({item: photo, index}: {item: IFBPhoto; index: number}) => {
            const carouselItem: IPhotoCarouselItemRow = {
                relatedId: 'notApplicable',
                photoType: PhotoType.Unknown,
                photo,
                photoWidth: containerWidth,
                photoHeight,
            };
            return (
                <View style={[styles.flex1]}>
                    <PageFlashListItemWithEvent
                        item={{
                            rowType: PageSection.PHOTO_CAROUSEL_ITEM_WITHOUT_EVENT,
                            rowData: carouselItem,
                            rowKey: 'PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT<Photo>',
                            modalName: 'photo-carousel',
                            pressType: RowPressableType.NO_EVENT,
                        }}
                    />
                </View>
            );
        },
        [photoHeight, containerWidth],
    );

    const bottomPanel = (
        <View style={[styles.pAbsolute, styles.l0, styles.r0, styles.b0, {height: 24}, {backgroundColor: 'rgba(0,0,0,.7)'}]}>
            <View style={[styles.flexRow, styles.ph2, styles.justifyContentBetween]}>
                {/* <Text style={[styles.textSupporting]}>Browse all</Text> */}
                <Tooltip text={translate('photos.page.seeAll')}>
                    <PressableWithFeedback
                        accessibilityLabel={translate('photos.page.seeAll')}
                        role={CONST.ROLE.BUTTON}
                        onPress={onSeeAllPhotosPress}
                        style={styles.searchPressable}
                    >
                        <Text style={[styles.textSupporting]}>Browse all</Text>
                    </PressableWithFeedback>
                </Tooltip>

                <Text style={[styles.textSupporting]}>
                    {page + 1} of {photosLength}
                </Text>
                <View />
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
                        key={`photos-page-${containerWidth}`}
                        keyboardShouldPersistTaps="handled"
                        // listKey="PhotoCarouselPageView"
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
                    photoWidth={containerWidth}
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

PhotoCarouselPageView.displayName = 'PhotoCarouselPageView';

export default withWindowDimensions(PhotoCarouselPageView);
