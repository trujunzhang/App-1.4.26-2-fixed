/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useMemo} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {FlatList as RestaurantList, StyleSheet, View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import type {CurrentRestaurantIDContextValue} from '@components/withCurrentRestaurantID';
import withCurrentRestaurantID from '@components/withCurrentRestaurantID';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {buildRestaurantSidebar} from '@libs/FirebaseIeatta/list/builder/restaurant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBRestaurant} from '@src/types/firebase';

type LHNRestaurantsListProps = {
    style?: StyleProp<ViewStyle> | undefined;
    contentContainerStyles?: StyleProp<ViewStyle> | undefined;
    listItems: IFBRestaurant[];
    fetchMoreRestaurants: () => void;
};

const keyExtractor = (item: IPageRow) => `row_${item.rowKey}`;

function LHNRestaurantsList({style = [], contentContainerStyles = {}, listItems, fetchMoreRestaurants}: LHNRestaurantsListProps) {
    const [restaurantIdInSidebar] = useOnyx(ONYXKEYS.RESTAURANT_ID_IN_SIDEBAR);
    const currentRestaurantID = restaurantIdInSidebar ?? '';

    const {isSmallScreenWidth} = useResponsiveLayout();
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
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                contentContainerStyle={StyleSheet.flatten([contentContainerStyles, listContentContainerStyle])}
                // contentContainerStyle={{...contentContainerStyles, ...listContentContainerStyle}}
                // contentContainerStyle={Object.assign(contentContainerStyles as Record<string, any>, listContentContainerStyle)}
                data={rowsData}
                testID="sidebar-restaurants-list"
                keyExtractor={keyExtractor}
                renderItem={({item}) => {
                    return <PageFlashListItemWithEvent pageRow={item} />;
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

export default LHNRestaurantsList;
