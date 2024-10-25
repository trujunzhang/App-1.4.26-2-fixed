// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import React from 'react';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
import RestaurantMenuList from '@components/Ieatta/detailedPage/restaurant/menu/RestaurantMenuList';
import {FBCollections} from '@libs/Firebase/constant';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import type {IFBRecipe} from '@src/types/firebase';
import type {RestaurantMenuRowProps} from './types';

function RestaurantMenuRow({menuRow}: RestaurantMenuRowProps) {
    const {restaurantId, isSmallScreenWidth} = menuRow;

    /**
     |--------------------------------------------------
     | List(recipes)
     |--------------------------------------------------
     */
    const [recipeSnapshot, loadingForRecipes] = useCollectionOnce<IFBRecipe>(
        FirebaseQuery.queryEventOrMenuInRestaurant({
            path: FBCollections.Recipes,
            restaurantId,
        }),
    );

    const recipesInRestaurant = recipeSnapshot === undefined ? [] : _.map(recipeSnapshot.docs, (item) => item.data());

    return (
        <RestaurantMenuList
            recipes={recipesInRestaurant}
            loadingForRecipes={loadingForRecipes}
        />
    );
}

export default RestaurantMenuRow;
