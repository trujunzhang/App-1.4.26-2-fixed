import React, {useCallback, useState} from 'react';
import {useCollectionOnce, useDocumentData} from 'react-firebase-hooks/firestore';
import {usePagination} from 'react-firebase-pagination-hooks';
import _ from 'underscore';
import ReportActionsSkeletonView from '@components/ReportActionsSkeletonView';
import {FBCollections, ReviewType} from '@libs/Firebase/constant';
import {getRecipeID} from '@libs/Firebase/helper/RecipeUtils';
import {defaultSortObject} from '@libs/Firebase/review-sort';
import {querySingle} from '@libs/Firebase/services/firebase-query';
import {FirebaseReviewQuery} from '@libs/Firebase/services/review-query';
import Variables from '@styles/variables';
import BaseRecipeScreen from './BaseRecipeScreen';
import {defaultProps, propTypes} from './propTypes';

function RecipeScreen({route, navigation, isSidebarLoaded}) {
    const [reviewSortType, setReviewSortType] = React.useState(defaultSortObject.tag);
    const [reviewSearch, setReviewSearch] = React.useState('');

    const recipeId = getRecipeID(route);
    /**
     |--------------------------------------------------
     | Single(Recipe)
     |--------------------------------------------------
     */
    const [recipe, loadingForRecipe, errorForRecipe] = useDocumentData(
        querySingle({
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

    const reviews = _.map(reviewsSnapshot, (item) => item.data()) || [];

    // console.log('');
    // console.log('================================');
    // console.log(`reviews on the web: ${reviews.length}`);
    // console.log('================================');
    // console.log('');

    const onReviewSearchChanged = useCallback((text) => {
        setReviewSearch(text);
    }, []);
    const onReviewSortChanged = useCallback((sortType) => {
        setReviewSortType(sortType);
    }, []);

    // eslint-disable-next-line rulesdir/prefer-early-return
    const fetchMoreReviews = useCallback(() => {
        if (loadingMoreReviews === false && hasMoreReview) {
            loadMoreReviews();
        }
    }, [hasMoreReview, loadMoreReviews, loadingMoreReviews]);

    return (
        <BaseRecipeScreen
            fetchMoreReviews={fetchMoreReviews}
            recipeId={recipeId}
            navigation={navigation}
            recipe={recipe}
            reviews={reviews}
            shouldShowLoading={loadingForRecipe}
            loadingContent={<ReportActionsSkeletonView />}
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

RecipeScreen.propTypes = propTypes;
RecipeScreen.defaultProps = defaultProps;
RecipeScreen.displayName = 'RecipeScreen';

export default RecipeScreen;
