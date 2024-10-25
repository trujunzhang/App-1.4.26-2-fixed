import React from 'react';
import {Image as RNImage, View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import Divider from '@components/Ieatta/components/Divider';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import {FBCollections} from '@libs/Firebase/constant';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import type {IEditModelButtonRow} from '@libs/Firebase/list/types/rows/common';
import {calcRateForRestaurant} from '@libs/Firebase/utils/rate_utils';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import type {IFBRecipe} from '@src/types/firebase';

type RecipeInfoPanelProps = {
    /** The ID of the report that the option is for */
    recipe: IFBRecipe;
};

function RecipeInfoPanel({recipe}: RecipeInfoPanelProps) {
    const styles = useThemeStyles();
    const rowData: IEditModelButtonRow = {
        restaurantId: recipe.restaurantId,
        relatedId: recipe.uniqueId,
        modelPath: FBCollections.Recipes,
        buttonTag: 'edit.recipe.button',
    };

    return (
        <View style={[styles.headerPanelMobile, styles.flexColumn, styles.alignItemsCenter, styles.shadowInner]}>
            <PageFlashListItemWithEvent
                item={{
                    rowType: PageSection.DETAILED_EDIT_MODEL_BUTTON,
                    rowData,
                    rowKey: 'PageSection.DETAILED_EDIT_MODEL_BUTTON<Recipe>',
                    modalName: 'edit-button',
                    pressType: RowPressableType.SINGLE_PRESS,
                }}
            />
            <Text style={[styles.restaurantTitleInHeaderPanel, styles.textAlignCenter, styles.alignItemsCenter, styles.mh12, styles.mv2]}>{recipe.displayName}</Text>

            <Text style={[styles.recipePriceTitleInHeaderPanel, styles.textAlignCenter, styles.alignItemsCenter, styles.mh12, styles.mv2]}>{`$ ${recipe.price}`}</Text>
            <RNImage
                style={[styles.ratingIconInHeaderPanel, styles.mt2, styles.mb4]}
                source={IeattaStars.STARS.SMALL[calcRateForRestaurant(recipe.rate, recipe.reviewCount)]}
            />
            <Divider dividerStyle={[styles.w100]} />
            <View style={[styles.actionsBarInHeaderPanel, {backgroundColor: 'transparent'}]}>
                <View style={[styles.flex1, styles.actionRowInHeaderPanel, {backgroundColor: 'transparent'}]}>
                    <Icon
                        fill={TailwindColors.blue500}
                        width={variables.iconSizeNormal}
                        height={variables.iconSizeNormal}
                        src={Expensicons.Pencil}
                    />
                    <Text style={styles.actionTitleInHeaderPanel}>Review</Text>
                </View>
                <Divider
                    orientation="vertical"
                    dividerStyle={[styles.h80]}
                />
                <View style={[styles.flex1, styles.actionRowInHeaderPanel, {backgroundColor: 'transparent'}]}>
                    <Icon
                        fill={TailwindColors.red500}
                        width={variables.iconSizeNormal}
                        height={variables.iconSizeNormal}
                        src={Expensicons.QueueList}
                    />
                    <Text style={styles.actionTitleInHeaderPanel}>Reviews</Text>
                </View>
            </View>
        </View>
    );
}

RecipeInfoPanel.displayName = 'RecipeInfoPanel';

export default React.memo(RecipeInfoPanel);
