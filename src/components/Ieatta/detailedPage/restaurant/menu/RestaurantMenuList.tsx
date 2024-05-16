import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SectionEmptyView from '@components/Ieatta/detailedPage/common/SectionEmptyView';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import useLocalize from '@hooks/useLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {buildRecipeHorizontalRows} from '@libs/Firebase/list/builder/recipe';
import type {IPageRow} from '@libs/Firebase/list/types/page-row';
import variables from '@styles/variables';
import type {IFBRecipe} from '@src/types/firebase';

type RestaurantMenuListProps = {
    recipes: IFBRecipe[];
};

const keyExtractor = (item: IPageRow) => `row_${item.rowKey}`;

function RestaurantMenuList({recipes}: RestaurantMenuListProps) {
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();

    const rowsData = useMemo(() => buildRecipeHorizontalRows(isSmallScreenWidth, recipes), [isSmallScreenWidth, recipes]);

    return (
        <>
            {recipes.length > 0 ? (
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
                            return <PageFlashListItemWithEvent item={item} />;
                        }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={StyleSheet.flatten([styles.ph4])}
                        ItemSeparatorComponent={() => <View style={{width: 15}} />}
                    />
                </View>
            ) : (
                <SectionEmptyView emptyRow={{emptyHint: 'sections.empty.noRecipes'}} />
            )}
        </>
    );
}

export default RestaurantMenuList;
