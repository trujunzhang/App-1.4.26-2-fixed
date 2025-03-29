/* eslint-disable react/no-unused-prop-types */
// eslint-disable-next-line lodash/import-scope
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import Variables from '@styles/variables';
import type {IFBPhoto, IFBSqlPhoto} from '@src/types/firebase';
import type {BasePhotosGridListProps} from './types';

const keyExtractor = (item: IFBPhoto | IFBSqlPhoto) => `photo${item.uniqueId}`;
const minCols = 2;
const itemMargin = 8;
const calcNumColumns = (width: number, itemWidth: number) => {
    const cols = (width - 20) / itemWidth;
    const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
    const colsMinusMargin = cols - 2 * colsFloor * itemMargin;
    if (colsMinusMargin < colsFloor && colsFloor > minCols) {
        // return colsFloor - 1;
    }
    return colsFloor;
};

const firstRowElementStyle = (index: number, numColumns: number, paddingTop: number) => {
    if (index < numColumns) {
        return {
            paddingTop,
        };
    }

    return null;
};

const lastRowChildStyle = (index: number, numColumns: number, paddingHorizontal: number) => {
    if ((index + 1) % numColumns === 0) {
        return {paddingRight: paddingHorizontal, paddingLeft: 0};
    }
    return null;
};

const lastOddChildStyle = (index: number, photosLength: number, gap: number, paddingHorizontal: number) => {
    if (index + 1 === photosLength && (index + 1) % 2 !== 0) {
        return {
            paddingRight: gap + paddingHorizontal,
        };
    }

    return null;
};

function BasePhotosGridList({
    photos,
    headerContent = null,
    footerContent = null,
    generatePageRow,
    isCoverPage = false,
    shouldShowAsSmallScreen = false,
    gap = 12,
    paddingHorizontal = 2,
    paddingTop = 2,
    initialPanelWidth = Variables.maxWidthInPhotosGridAndPage,
}: BasePhotosGridListProps) {
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    const {isSmallScreenWidth} = useResponsiveLayout();
    const styles = useThemeStyles();
    const {windowWidth} = useWindowDimensions();

    const contentWidth: number = useMemo(() => {
        // return isSmallScreenWidth ? windowWidth : Math.min(windowWidth, Variables.maxWidthInPhotosGridAndPage);
        return isSmallScreenWidth ? windowWidth : Math.min(windowWidth, initialPanelWidth);
    }, [isSmallScreenWidth, windowWidth, initialPanelWidth]);

    const itemWidth: number = useMemo(() => {
        if (isCoverPage) {
            return Variables.photoGridItemCoverWidth;
        }
        if (shouldShowAsSmallScreen) {
            return Variables.photoGridItemMobileWidth;
        }
        return isSmallScreenWidth ? Variables.photoGridItemMobileWidth : Variables.photoGridItemWebWidth;
    }, [isCoverPage, shouldShowAsSmallScreen, isSmallScreenWidth]);
    const itemHeight: number = useMemo(() => {
        if (isCoverPage) {
            return Variables.photoGridItemCoverHeight;
        }
        if (shouldShowAsSmallScreen) {
            return Variables.photoGridItemMobileHeight;
        }
        return isSmallScreenWidth ? Variables.photoGridItemMobileHeight : Variables.photoGridItemWebHeight;
    }, [isCoverPage, shouldShowAsSmallScreen, isSmallScreenWidth]);

    // eslint-disable-next-line rulesdir/no-use-state-initializer-functions
    const [numColumns, setNumColumns] = useState(calcNumColumns(contentWidth, itemWidth));

    const fixedItemWidth: number = useMemo(() => {
        // return (windowWidth - 30) / numColumns;
        return (contentWidth - 30) / numColumns;
    }, [contentWidth, numColumns]);

    useEffect(() => {
        setNumColumns(calcNumColumns(contentWidth, itemWidth));
    }, [contentWidth, itemWidth, windowWidth]);

    /**
     * Function which renders a row in the list
     *
     * @param {Object} params
     * @param {Object} params.item
     *
     * @return {Component}
     */
    const renderItem = useCallback(
        ({item: photo, index}: {item: IFBPhoto | IFBSqlPhoto; index: number}) => {
            const pageRow: IPageRow = generatePageRow(photo, fixedItemWidth, itemHeight);
            return (
                <View
                    key={photo.uniqueId}
                    style={[
                        {
                            flex: 1 / numColumns,
                            paddingLeft: paddingHorizontal,
                            paddingBottom: gap,
                            paddingRight: gap,
                        },
                        firstRowElementStyle(index, numColumns, paddingTop),
                        lastRowChildStyle(index, numColumns, paddingHorizontal),
                        lastOddChildStyle(index, photos.length, gap, paddingHorizontal),
                    ]}
                >
                    <PageFlashListItemWithEvent pageRow={pageRow} />
                </View>
            );
        },
        [gap, generatePageRow, fixedItemWidth, itemHeight, numColumns, paddingHorizontal, paddingTop, photos.length],
    );

    return (
        <FlatList
            key={numColumns}
            numColumns={numColumns}
            data={photos}
            testID="photos-grid-list"
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={isSmallScreenWidth ? styles.ph3 : styles.ph10}
            ListHeaderComponent={() => {
                return headerContent;
            }}
            ListFooterComponent={() => {
                return footerContent;
            }}
        />
    );
}

export default BasePhotosGridList;
