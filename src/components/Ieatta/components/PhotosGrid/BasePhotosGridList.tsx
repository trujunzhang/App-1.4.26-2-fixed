/* eslint-disable react/no-unused-prop-types */
import _ from 'lodash';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
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

function BasePhotosGridList({photos, headerContent = null, footerContent = null, renderPhoto, gap = 12, paddingHorizontal = 2, paddingTop = 2}: BasePhotosGridListProps) {
    const {isSmallScreenWidth} = useWindowDimensions();
    const styles = useThemeStyles();
    const {windowWidth} = useWindowDimensions();

    const itemWidth: number = useMemo(() => {
        return isSmallScreenWidth ? Variables.photoGridItemMobileWidth : Variables.photoGridItemWebWidth;
    }, [isSmallScreenWidth]);
    const itemHeight: number = useMemo(() => {
        return isSmallScreenWidth ? Variables.photoGridItemMobileHeight : Variables.photoGridItemWebHeight;
    }, [isSmallScreenWidth]);

    const contentWidth: number = useMemo(() => {
        return isSmallScreenWidth ? windowWidth : Math.min(windowWidth, Variables.maxWidthInPhotosGridAndPage);
    }, [isSmallScreenWidth, windowWidth]);

    const [numColumns, setNumColumns] = useState(calcNumColumns(contentWidth, itemWidth));

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
                    {renderPhoto(photo, itemHeight)}
                </View>
            );
        },
        [gap, itemHeight, numColumns, paddingHorizontal, paddingTop, photos.length, renderPhoto],
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
