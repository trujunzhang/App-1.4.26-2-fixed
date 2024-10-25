/* eslint-disable @typescript-eslint/no-explicit-any */
// import {FlashList as RestaurantList} from '@shopify/flash-list';
import React, {useMemo} from 'react';
import {FlatList as RestaurantList, View} from 'react-native';
import type {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import type {CurrentRestaurantIDContextValue} from '@components/withCurrentRestaurantID';
import withCurrentRestaurantID from '@components/withCurrentRestaurantID';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {buildRestaurantSidebar} from '@libs/Firebase/list/builder/restaurant';
import type {IPageRow} from '@libs/Firebase/list/types/page-row';
import type {IFBRestaurant} from '@src/types/firebase';

type LHNRestaurantsListProps = CurrentRestaurantIDContextValue & {
    style?: StyleProp<ViewStyle> | undefined;
    contentContainerStyles?: StyleProp<ViewStyle> | undefined;
    listItems: IFBRestaurant[];
    fetchMoreRestaurants: () => void;
};

const keyExtractor = (item: IPageRow) => `row_${item.rowKey}`;

function LHNRestaurantsList({style = [], contentContainerStyles = {}, listItems, fetchMoreRestaurants, currentRestaurantID}: LHNRestaurantsListProps) {
    const {isSmallScreenWidth} = useWindowDimensions();
    const styles = useThemeStyles();

    const listContentContainerStyle = useMemo(() => {
        if (isSmallScreenWidth) {
            // return {backgroundColor: 'transparent', paddingHorizontal: 20};
            return {paddingHorizontal: 20};
        }
        // return {backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4};
        return {paddingHorizontal: 8, paddingVertical: 4};
        // Listen parentRestaurantAction to update title of thread report when parentRestaurantAction changed
        // Listen to transaction to update title of transaction report when transaction changed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSmallScreenWidth]);

    const rowsData = useMemo(
        () =>
            buildRestaurantSidebar(isSmallScreenWidth, {
                restaurants: listItems,
                currentRestaurantID,
            }),
        [isSmallScreenWidth, listItems, currentRestaurantID],
    );

    return (
        <View style={style ?? styles.flex1}>
            <RestaurantList
                indicatorStyle="white"
                keyboardShouldPersistTaps="always"
                // contentContainerStyle={{...contentContainerStyles, ...listContentContainerStyle}}
                contentContainerStyle={Object.assign(contentContainerStyles as Record<string, any>, listContentContainerStyle)}
                data={rowsData}
                testID="sidebar-restaurants-list"
                keyExtractor={keyExtractor}
                renderItem={({item}) => {
                    return <PageFlashListItemWithEvent item={item} />;
                }}
                extraData={[currentRestaurantID]}
                showsVerticalScrollIndicator={false}
                // estimatedItemSize={variables.optionRowHeight}
                onEndReachedThreshold={2.2}
                onEndReached={fetchMoreRestaurants}
                ItemSeparatorComponent={
                    // eslint-disable-next-line react/no-unstable-nested-components
                    () => <View style={{height: isSmallScreenWidth ? 18 : 12}} />
                }
            />
        </View>
    );
}

LHNRestaurantsList.displayName = 'LHNRestaurantsList';

// eslint-disable-next-line rulesdir/no-useless-compose
export default withCurrentRestaurantID(LHNRestaurantsList);
