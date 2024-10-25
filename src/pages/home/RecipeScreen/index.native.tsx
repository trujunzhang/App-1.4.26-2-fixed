import {useObject, useQuery} from '@realm/react';
import _ from 'lodash';
import React, {useCallback, useState} from 'react';
import {ReviewType} from '@libs/Firebase/constant';
import type {RecipeScreenNavigationProps} from '@libs/Firebase/helper/RecipeUtils';
import {getRecipeID} from '@libs/Firebase/helper/RecipeUtils';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import Variables from '@styles/variables';
import type {IFBRecipe, IFBReview} from '@src/types/firebase';
import BaseRecipeScreen from './BaseRecipeScreen';

// eslint-disable-next-line @typescript-eslint/ban-types
type RecipeScreenProps = RecipeScreenNavigationProps & {};

function RecipeScreen({route, navigation}: RecipeScreenProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(Variables.paginationLimitInDetailedReviews);

    const recipeId = getRecipeID(route);

    const recipeInRealm = useObject<IFBRecipe>(RealmCollections.Recipes, recipeId);
    const recipe: IFBRecipe | undefined = _.isNull(recipeInRealm) === false ? (recipeInRealm as IFBRecipe) : undefined;

    const reviewsInRealm = useQuery(RealmCollections.Reviews, (array) => {
        return array.filtered('recipeId  == $0 && reviewType == $1', recipeId, ReviewType.Recipe);
    }).slice(0, currentIndex);

    const reviews: IFBReview[] = toRealmModelList<IFBReview>(reviewsInRealm);

    // Log.info('');
    // Log.info('================================');
    // Log.info(`reviews: ${reviews.length}`);
    // Log.info(`eventsInRecipe: ${JSON.stringify(eventsInRecipe[0])}`)
    // Log.info(`reviewsInRecipe: ${JSON.stringify(reviews[0])}`);
    // Log.info('================================');
    // Log.info('');

    const onReviewSearchChanged = useCallback((text: string) => {}, []);
    const onReviewSortChanged = useCallback((sortType: string) => {}, []);
    const fetchMoreReviews = useCallback(() => {
        setCurrentIndex((prevIndex: number) => {
            return prevIndex + Variables.paginationLimitInDetailedReviews;
        });
    }, []);

    return (
        <BaseRecipeScreen
            route={route}
            navigation={navigation}
            fetchMoreReviews={fetchMoreReviews}
            recipeId={recipeId}
            recipe={recipe}
            reviews={reviews}
            onReviewSearchChanged={onReviewSearchChanged}
            onReviewSortChanged={onReviewSortChanged}
        />
    );
}

RecipeScreen.displayName = 'RecipeScreen';

export default RecipeScreen;
