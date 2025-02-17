/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {Image as RNImage, View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import Divider from '@components/Ieatta/components/Divider';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IEditModelButtonRow} from '@libs/FirebaseIeatta/list/types/rows/common';
import {calcRateForRestaurant} from '@libs/FirebaseIeatta/utils/rate_utils';
import {navigationToEditReview} from '@libs/ieatta/editFormUtils';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import ROUTES from '@src/ROUTES';
import type {IFBRecipe} from '@src/types/firebase';
import HeaderActionItem from './HeaderActionItem';

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
                pageRow={{
                    rowType: PageSection.DETAILED_EDIT_MODEL_BUTTON,
                    rowData,
                    rowKey: 'PageSection.DETAILED_EDIT_MODEL_BUTTON<Recipe>',
                    modalName: 'edit-button',
                    pressType: RowPressableType.SINGLE_PRESS,
                }}
            />
            <Text style={[styles.restaurantTitleInHeaderPanel, styles.textAlignCenter, styles.alignItemsCenter, styles.mh12, styles.mv2]}>{recipe.displayName}</Text>

            <Text
                style={[styles.recipePriceTitleInHeaderPanel, styles.colorTextSupporting, styles.textAlignCenter, styles.alignItemsCenter, styles.mh12, styles.mv2]}
            >{`$ ${recipe.price}`}</Text>
            <RNImage
                style={[styles.ratingIconInHeaderPanel, styles.mt2, styles.mb4]}
                source={IeattaStars.STARS.SMALL[calcRateForRestaurant(recipe.rate, recipe.reviewCount)]}
            />
            <Divider dividerStyle={[styles.w100]} />
            <View style={[styles.actionsBarInHeaderPanel, {backgroundColor: 'transparent'}]}>
                <HeaderActionItem
                    title="detailedActionItem.review"
                    icon={Expensicons.Pencil}
                    fill={TailwindColors.blue500}
                    onItemPress={() => {
                        navigationToEditReview({relatedId: recipe.uniqueId, reviewType: ReviewType.Recipe});
                    }}
                />
                <Divider
                    orientation="vertical"
                    dividerStyle={[styles.h80]}
                />
                <HeaderActionItem
                    title="detailedActionItem.reviews"
                    icon={Ieattaicons.QueueList}
                    fill={TailwindColors.red500}
                    onItemPress={() => {
                        Navigation.navigate(ROUTES.REVIEWS_LIST.getRoute({relatedId: recipe.uniqueId, reviewType: ReviewType.Recipe}));
                    }}
                />
            </View>
        </View>
    );
}

RecipeInfoPanel.displayName = 'RecipeInfoPanel';

export default React.memo(RecipeInfoPanel);
