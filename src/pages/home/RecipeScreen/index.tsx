/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React, {useCallback} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {usePagination} from 'react-firebase-pagination-hooks';
import {DetailedPageSkeletonView} from '@components/Ieatta/components/SkeletonViews';
import {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import type {RecipeScreenNavigationProps} from '@libs/FirebaseIeatta/helper/RecipeUtils';
import {getRecipeID} from '@libs/FirebaseIeatta/helper/RecipeUtils';
import {defaultSortObject} from '@libs/FirebaseIeatta/review-sort';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {FirebaseReviewQuery} from '@libs/FirebaseIeatta/services/review-query';
import Variables from '@styles/variables';
import type {IFBRecipe, IFBReview} from '@src/types/firebase';
import BaseRecipeScreen from './BaseRecipeScreen';

// eslint-disable-next-line @typescript-eslint/ban-types
type RecipeScreenProps = RecipeScreenNavigationProps & {};

function RecipeScreen({route, navigation}: RecipeScreenProps) {
    const [reviewSortType, setReviewSortType] = React.useState(defaultSortObject.tag);
    const [reviewSearch, setReviewSearch] = React.useState('');

    const recipeId = getRecipeID(route);
    /**
     |--------------------------------------------------
     | Single(Recipe)
     |--------------------------------------------------
     */
    const [recipe, loadingForRecipe, errorForRecipe] = useDocumentData<IFBRecipe>(
        FirebaseQuery.querySingle({
            path: FBCollections.Recipes,
            id: recipeId,
        }),
    );

    /**
     |--------------------------------------------------
     | List(reviews)
     |--------------------------------------------------
     */
    const reviewQuery = React.useCallback(() => {
        return new FirebaseReviewQuery({
            relatedId: recipeId,
            reviewType: ReviewType.Recipe,
            reviewSortType,
            reviewSearch,
        }).buildForReview();
    }, [recipeId, reviewSortType, reviewSearch]);

    const [reviewsSnapshot, {loaded, loadingMore: loadingMoreReviews, hasMore: hasMoreReview, loadMore: loadMoreReviews}, errorForReviews] = usePagination(reviewQuery(), {
        limit: Variables.paginationLimitInDetailedReviews,
    });

    const reviews = _.map(reviewsSnapshot, (item) => item.data() as IFBReview) || [];

    // console.log('');
    // console.log('================================');
    // console.log(`reviews on the web: ${reviews.length}`);
    // console.log('================================');
    // console.log('');

    const onReviewSearchChanged = useCallback((text: string) => {
        setReviewSearch(text);
    }, []);
    const onReviewSortChanged = useCallback((sortType: string) => {
        setReviewSortType(sortType);
    }, []);

    // eslint-disable-next-line rulesdir/prefer-early-return
    const fetchMoreReviews = useCallback(() => {
        if (!loadingMoreReviews && hasMoreReview) {
            loadMoreReviews();
        }
    }, [hasMoreReview, loadMoreReviews, loadingMoreReviews]);

    return (
        <BaseRecipeScreen
            route={route}
            navigation={navigation}
            fetchMoreReviews={fetchMoreReviews}
            recipeId={recipeId}
            recipe={recipe}
            reviews={reviews}
            shouldShowLoading={loadingForRecipe}
            loadingContent={<DetailedPageSkeletonView />}
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

RecipeScreen.displayName = 'RecipeScreen';

export default RecipeScreen;
