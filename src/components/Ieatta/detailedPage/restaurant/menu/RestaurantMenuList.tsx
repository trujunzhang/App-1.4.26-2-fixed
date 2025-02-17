import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {MenusRowSkeletonView} from '@components/Ieatta/components/SkeletonViews';
import SectionEmptyView from '@components/Ieatta/detailedPage/common/SectionEmptyView';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {buildRecipeHorizontalRows} from '@libs/FirebaseIeatta/list/builder/recipe';
import type {IPageRow, ModalNames} from '@libs/FirebaseIeatta/list/types/page-row';
import variables from '@styles/variables';
import type {IFBRecipe} from '@src/types/firebase';

type RestaurantMenuListProps = {
    recipes: IFBRecipe[];
    loadingForRecipes?: boolean;
    modalName?: ModalNames;
};

const keyExtractor = (item: IPageRow) => `row_${item.rowKey}`;

function RestaurantMenuList({recipes, loadingForRecipes = false, modalName = 'recipe'}: RestaurantMenuListProps) {
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useResponsiveLayout();

    const rowsData = useMemo(() => buildRecipeHorizontalRows({isSmallScreenWidth, recipes, modalName}), [isSmallScreenWidth, recipes, modalName]);

    const renderHorizontalList = (
        <View
            style={[
                styles.flexColumn,
                styles.w100,
                {
                    height: isSmallScreenWidth ? variables.menuInRestaurantMobileItemHeight : variables.menuInRestaurantWebItemHeight,
                },
            ]}
        >
            <FlatList
                horizontal
                indicatorStyle="white"
                keyboardShouldPersistTaps="always"
                data={rowsData}
                testID="page-recipes-flashlist"
                keyExtractor={keyExtractor}
                renderItem={({item}) => {
                    return <PageFlashListItemWithEvent pageRow={item} />;
                }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={StyleSheet.flatten([styles.ph4])}
                ItemSeparatorComponent={() => <View style={{width: 15}} />}
            />
        </View>
    );

    if (loadingForRecipes) {
        return <MenusRowSkeletonView />;
    }

    if (recipes.length === 0) {
        return <SectionEmptyView emptyRow={{emptyHint: 'sections.empty.noRecipes'}} />;
    }

    return renderHorizontalList;
}

export default RestaurantMenuList;
