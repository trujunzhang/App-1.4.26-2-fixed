// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import React, {useMemo} from 'react';
import DetailedPageLayout from '@components/Ieatta/detailedPage/DetailedPageLayout';
import useWindowDimensions from '@hooks/useWindowDimensions';
import type {RecipeScreenNavigationProps} from '@libs/Firebase/helper/RecipeUtils';
import {buildRecipeRows} from '@libs/Firebase/list/builder/recipe';
import type {IReviewOnSearchAndSortChanged} from '@libs/Firebase/list/types/rows/review';
import type {IFBRecipe, IFBReview} from '@src/types/firebase';

type BaseRecipeScreenProps = RecipeScreenNavigationProps &
    IReviewOnSearchAndSortChanged & {
        fetchMoreReviews: () => void;
        recipeId: string;
        recipe: IFBRecipe | undefined;
        reviews: IFBReview[];
        shouldShowLoading?: boolean;
        loadingContent?: React.ReactNode;
    };

// eslint-disable-next-line react/prop-types
function BaseRecipeScreen({
    fetchMoreReviews,
    recipeId,
    recipe,
    reviews,
    navigation,
    shouldShowLoading = false,
    loadingContent = null,
    onReviewSortChanged,
    onReviewSearchChanged,
}: BaseRecipeScreenProps) {
    const {isSmallScreenWidth} = useWindowDimensions();

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundPage = _.isUndefined(recipe) && !shouldShowLoading;

    const rowsData = useMemo(
        () =>
            buildRecipeRows(isSmallScreenWidth, {
                recipeId,
                recipe,
                reviews,
                reviewChanged: {
                    onReviewSortChanged,
                    onReviewSearchChanged,
                },
            }),
        [isSmallScreenWidth, recipe, reviews, onReviewSortChanged, onReviewSearchChanged],
    );

    return (
        <DetailedPageLayout
            shouldShowNotFoundPage={shouldShowNotFoundPage}
            rowsData={rowsData}
            fetchMoreReviews={fetchMoreReviews}
            navigation={navigation}
            shouldShowLoading={shouldShowLoading}
            loadingContent={loadingContent}
        />
    );
}

export default BaseRecipeScreen;
BaseRecipeScreen.displayName = 'BaseRecipeScreen';
