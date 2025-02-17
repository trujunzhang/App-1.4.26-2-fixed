import React from 'react';
import {ScrollView} from 'react-native';
import useThemeStyles from '@hooks/useThemeStyles';
import MenuItemViewGridCell from './MenuItemViewGridCell';

type MenusRowSkeletonViewProps = {
    /** Whether to animate the skeleton view */
    shouldAnimate?: boolean;

    /** Number of possible visible content items */
    possibleVisibleContentItems?: number;
};

function MenusRowSkeletonView({shouldAnimate = true, possibleVisibleContentItems = 8}: MenusRowSkeletonViewProps) {
    const styles = useThemeStyles();
    const contentItems = possibleVisibleContentItems;
    const skeletonViewLines: React.ReactNode[] = [];
    for (let index = 0; index < contentItems; index++) {
        const iconIndex = (index + 1) % 4;
        switch (iconIndex) {
            case 2:
                skeletonViewLines.push(
                    <MenuItemViewGridCell
                        shouldAnimate={shouldAnimate}
                        numberOfRows={2}
                        key={`skeletonViewLines${index}`}
                    />,
                );
                break;
            case 0:
                skeletonViewLines.push(
                    <MenuItemViewGridCell
                        shouldAnimate={shouldAnimate}
                        numberOfRows={3}
                        key={`skeletonViewLines${index}`}
                    />,
                );
                break;
            default:
                skeletonViewLines.push(
                    <MenuItemViewGridCell
                        shouldAnimate={shouldAnimate}
                        numberOfRows={1}
                        key={`skeletonViewLines${index}`}
                    />,
                );
        }
    }
    return (
        <ScrollView
            horizontal
            style={[styles.ph4]}
        >
            {skeletonViewLines}
        </ScrollView>
    );
}

MenusRowSkeletonView.displayName = 'MenusRowSkeletonView';
export default MenusRowSkeletonView;
