import type {NavigationProp} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {clearTestState} from 'realm';
// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import DetailedPageData from '@components/Ieatta/detailedPage/DetailedPageData';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {buildRecipeRows} from '@libs/Firebase/list/builder/recipe';
import type {IReviewOnSearchAndSortChanged} from '@libs/Firebase/list/types/rows/review';
import type {RootStackParamList} from '@libs/Navigation/types';
import type {IFBEvent, IFBRecipe, IFBReview} from '@src/types/firebase';

type BaseRecipeScreenProps = IReviewOnSearchAndSortChanged & {
    fetchMoreReviews: () => void;
    recipeId: string;
    recipe: IFBRecipe | undefined;
    reviews: IFBReview[];
    navigation: NavigationProp<RootStackParamList>;
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
        [isSmallScreenWidth, recipeId, recipe, reviews, onReviewSortChanged, onReviewSearchChanged],
    );

    return (
        <DetailedPageData
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
