import React from 'react';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
import {View} from 'react-native';
// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import RestaurantMenuList from '@components/Ieatta/detailedPage/restaurant/menu/RestaurantMenuList';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import {FBCollections} from '@libs/Firebase/constant';
import {queryEventOrMenuInRestaurant} from '@libs/Firebase/services/firebase-query';
import TailwindColors from '@styles/tailwindcss/colors';
import type {IFBRecipe} from '@src/types/firebase';
import type {RestaurantMenuRowProps} from './types';

function RestaurantMenuRow({menuRow}: RestaurantMenuRowProps) {
    const {restaurantId, isSmallScreenWidth} = menuRow;

    /**
     |--------------------------------------------------
     | List(recipes)
     |--------------------------------------------------
     */
    const [recipeSnapshot, loader] = useCollectionOnce(
        queryEventOrMenuInRestaurant({
            path: FBCollections.Recipes,
            restaurantId,
        }),
    );

    const recipesInRestaurant = recipeSnapshot === undefined ? [] : _.map(recipeSnapshot.docs, (item) => item.data() as IFBRecipe);

    return <RestaurantMenuList recipes={recipesInRestaurant} />;
}

export default RestaurantMenuRow;
