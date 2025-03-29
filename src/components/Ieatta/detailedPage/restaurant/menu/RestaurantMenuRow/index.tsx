/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import React from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import RestaurantMenuList from '@components/Ieatta/detailedPage/restaurant/menu/RestaurantMenuList';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import type {IFBRecipe} from '@src/types/firebase';
import type {RestaurantMenuRowProps} from './types';

function RestaurantMenuRow({menuRow}: RestaurantMenuRowProps) {
    const {restaurantId, isSmallScreenWidth} = menuRow;

    /**
     |--------------------------------------------------
     | List(recipes)
     |--------------------------------------------------
     */
    const [recipeSnapshot, loadingForRecipes] = useCollection<IFBRecipe>(
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
