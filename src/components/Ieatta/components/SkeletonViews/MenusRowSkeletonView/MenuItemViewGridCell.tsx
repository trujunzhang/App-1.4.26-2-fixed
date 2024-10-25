import {values} from 'lodash';
import React from 'react';
import {Circle, Rect} from 'react-native-svg';
import SkeletonViewContentLoader from '@components/SkeletonViewContentLoader';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import variables from '@styles/variables';
import CONST from '@src/CONST';

type MenuItemViewGridCellProps = {
    /** Number of rows to show in Skeleton UI block */
    numberOfRows: 1 | 2 | 3;
    shouldAnimate?: boolean;
};

function MenuItemViewGridCell({numberOfRows, shouldAnimate = true}: MenuItemViewGridCellProps) {
    const {isSmallScreenWidth} = useWindowDimensions();
    const theme = useTheme();
    const styles = useThemeStyles();
    const itemWidth = isSmallScreenWidth ? variables.menuInRestaurantMobileItemWidth : variables.menuInRestaurantWebItemWidth;
    const itemHeight = isSmallScreenWidth ? variables.menuInRestaurantMobileItemHeight : variables.menuInRestaurantWebItemHeight;
    return (
        <SkeletonViewContentLoader
            animate={shouldAnimate}
            width={itemWidth}
            height={itemHeight}
            backgroundColor={theme.skeletonLHNIn}
            foregroundColor={theme.skeletonLHNOut}
            style={styles.mr5}
        >
            <Rect
                x="3"
                y="3"
                rx="10"
                ry="10"
                width="100%"
                height="75%"
            />
            <Rect
                x="4"
                y="215"
                rx="0"
                ry="0"
                width="239"
                height="20"
            />
            <Rect
                x="4"
                y="242"
                rx="0"
                ry="0"
                width="274"
                height="20"
            />
        </SkeletonViewContentLoader>
    );
}

MenuItemViewGridCell.displayName = 'MenuItemViewGridCell';
export default MenuItemViewGridCell;
