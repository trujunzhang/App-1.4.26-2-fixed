import {useObject, useQuery} from '@realm/react';
import React, {useCallback, useState} from 'react';
import {ReviewType} from '@libs/Firebase/constant';
import {getRecipeID} from '@libs/Firebase/helper/RecipeUtils';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toEventsList, toReviewsList} from '@libs/Realm/helpers/realmTypeHelper';
import Variables from '@styles/variables';
import BaseRecipeScreen from './BaseRecipeScreen';
import {defaultProps, propTypes} from './propTypes';

function RecipeScreen({route, navigation}) {
    const [currentIndex, setCurrentIndex] = useState(Variables.paginationLimitInDetailedReviews);

    const recipeId = getRecipeID(route);

    const recipe = useObject(RealmCollections.Recipes, recipeId);

    const reviewsInRealm = useQuery(RealmCollections.Reviews, (array) => {
        return array.filtered('recipeId  == $0 && reviewType == $1', recipeId, ReviewType.Recipe);
    }).slice(0, currentIndex);

    const reviews = toReviewsList(reviewsInRealm);

    // Log.info('');
    // Log.info('================================');
    // Log.info(`reviews: ${reviews.length}`);
    // Log.info(`eventsInRecipe: ${JSON.stringify(eventsInRecipe[0])}`)
    // Log.info(`reviewsInRecipe: ${JSON.stringify(reviews[0])}`);
    // Log.info('================================');
    // Log.info('');

    const onReviewSearchChanged = useCallback((text) => {}, []);
    const onReviewSortChanged = useCallback((sortType) => {}, []);
    const fetchMoreReviews = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            return prevIndex + Variables.paginationLimitInDetailedReviews;
        });
    }, []);

    return (
        <BaseRecipeScreen
            fetchMoreReviews={fetchMoreReviews}
            recipeId={recipeId}
            navigation={navigation}
            recipe={recipe}
            reviews={reviews}
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

RecipeScreen.propTypes = propTypes;
RecipeScreen.defaultProps = defaultProps;
RecipeScreen.displayName = 'RecipeScreen';

export default RecipeScreen;
