import React from 'react';
import {Image as RNImage, View} from 'react-native';
import Button from '@components/Button';
import {IeattaStars} from '@components/Icon/IeattaStars';
import {PhotoCarouselScrollView} from '@components/Ieatta/components/PhotosCarousel';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {FBCollections, PhotoType, ReviewType} from '@libs/Firebase/constant';
import {calcRateForRestaurant} from '@libs/Firebase/utils/rate_utils';
import {formatByTimeAgo} from '@libs/Firebase/utils/timeago_helper';
import {navigationToEditRecipe, navigationToEditReview} from '@libs/ieatta/editFormUtils';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import ROUTES from '@src/ROUTES';
import type {IFBPhoto, IFBRecipe} from '@src/types/firebase';
import ActionBarInInfoPanel from './ActionBarInInfoPanel';

type RecipeWithPhotosInfoPanelProps = {
    recipe: IFBRecipe;
    photos: IFBPhoto[];
};

function RecipeWithPhotosInfoPanel({recipe, photos}: RecipeWithPhotosInfoPanelProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const timeAgo = formatByTimeAgo(recipe.updatedAt);
    const onSeeAllPhotoPress = () => {
        Navigation.navigate(ROUTES.PHOTOS_GRID_VIEW.getRoute({relatedId: recipe.uniqueId, photoType: PhotoType.Recipe}));
    };

    const renderInfo = (
        <View style={[styles.flex1, styles.flexColumn, styles.justifyContentEnd]}>
            <View style={[styles.alignItemsStart]}>
                <View style={[styles.flexRow, styles.justifyContentCenter, styles.alignItemsCenter, styles.gap3]}>
                    <Text style={[styles.restaurantAndRecipeTitleInHeaderWebPanel]}>{recipe.displayName}</Text>
                    <Text style={[styles.recipePriceTitleInHeaderWebPanel, styles.mh2, styles.mv2]}>{`$${recipe.price}`}</Text>
                    <View style={[styles.alignItemsCenter]}>
                        <Button
                            medium
                            style={[{backgroundColor: TailwindColors.blue500}]}
                            innerStyles={[{backgroundColor: TailwindColors.blue500}]}
                            hoverStyles={[{backgroundColor: TailwindColors.blue700}]}
                            textStyles={[{color: TailwindColors.white}]}
                            text={translate('common.edit')}
                            onPress={() => {
                                navigationToEditRecipe({recipeId: recipe.uniqueId, restaurantId: recipe.restaurantId});
                            }}
                        />
                    </View>
                </View>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <RNImage
                        style={[styles.ratingIconInHeaderWebPanel, styles.mv3]}
                        source={IeattaStars.STARS.LARGE[calcRateForRestaurant(recipe.rate, recipe.reviewCount)]}
                    />
                    <Text style={[styles.ml4, styles.reviewCountInHeaderWebPanel]}>
                        {recipe.rate / recipe.reviewCount}
                        <Text style={[styles.reviewCountInHeaderWebPanel, styles.ml2]}>{`(${recipe.reviewCount} reviews)`}</Text>
                    </Text>
                </View>

                <Text style={[styles.updatedDateInHeaderWebPanel, styles.xl]}>{`Updated ${timeAgo}`}</Text>
            </View>
        </View>
    );

    const renderRightSeeAllPhotosButton = (
        <View
            style={[
                styles.pAbsolute,
                {
                    right: 60,
                    bottom: 20,
                },
                {backgroundColor: 'transparent'},
            ]}
        >
            <Button
                large
                style={[
                    {
                        borderRadius: variables.buttonBorderInPagedHeaderRadius,
                    },
                ]}
                innerStyles={[
                    styles.ph4,
                    styles.pv4,
                    {
                        borderRadius: variables.buttonBorderInPagedHeaderRadius,
                        backgroundColor: TailwindColors.white,
                        borderWidth: 1,
                        borderColor: TailwindColors.gray400,
                    },
                ]}
                hoverStyles={[
                    {
                        backgroundColor: TailwindColors.gray400,
                        borderWidth: 1,
                        borderColor: TailwindColors.gray400,
                    },
                ]}
                textStyles={[styles.lg, styles.fontSemiBold, {color: TailwindColors.gray800}]}
                text={`See ${photos.length} photos`}
                onPress={onSeeAllPhotoPress}
            />
        </View>
    );

    return (
        <View
            style={[styles.flexColumn]}
            testID={RecipeWithPhotosInfoPanel.displayName}
        >
            <View
                style={[
                    styles.w100,
                    {
                        height: variables.detailedHeaderPhotoCarouselItemHeight,
                    },
                    {backgroundColor: 'transparent'},
                ]}
            >
                <PhotoCarouselScrollView
                    key={`photosCarousel-${photos.length}`}
                    relatedId={recipe.uniqueId}
                    photoType={PhotoType.Recipe}
                    shouldShowMask
                    photos={photos}
                />
                <View
                    style={[
                        styles.pAbsolute,
                        {
                            left: 75,
                            right: 75,
                            bottom: 20,
                        },
                        {backgroundColor: 'transparent'},
                    ]}
                >
                    {renderInfo}
                </View>
                {photos.length > 0 && renderRightSeeAllPhotosButton}
            </View>
            <ActionBarInInfoPanel
                actionBarType={FBCollections.Recipes}
                infoId={recipe.uniqueId}
                onWriteReviewPress={() => {
                    navigationToEditReview({relatedId: recipe.uniqueId, reviewType: ReviewType.Recipe});
                }}
            />
        </View>
    );
}

RecipeWithPhotosInfoPanel.displayName = 'RecipeWithPhotosInfoPanel';

export default React.memo(RecipeWithPhotosInfoPanel);
