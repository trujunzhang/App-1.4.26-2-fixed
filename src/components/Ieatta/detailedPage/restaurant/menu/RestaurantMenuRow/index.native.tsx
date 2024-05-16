import {useQuery} from '@realm/react';
import React from 'react';
import {View} from 'react-native';
import RestaurantMenuList from '@components/Ieatta/detailedPage/restaurant/menu/RestaurantMenuList';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toEventsList} from '@libs/Realm/helpers/realmTypeHelper';
import {toRecipesList} from '@libs/Realm/helpers/realmTypeHelper/index.native';
import TailwindColors from '@styles/tailwindcss/colors';
import type {RestaurantMenuRowProps} from './types';

function RestaurantMenuRow({menuRow}: RestaurantMenuRowProps) {
    const {restaurantId, isSmallScreenWidth} = menuRow;

    const recipes = useQuery(RealmCollections.Recipes, (array) => {
        return array.filtered('restaurantId == $0', restaurantId);
    });
    const recipesInRestaurant = toRecipesList(recipes);

    // Log.info("")
    // Log.info("================================")
    // Log.info(`native's restaurantId: ${restaurantId}`)
    // Log.info(`native's recipes: ${recipes.length}`)
    // Log.info("================================")
    // Log.info("")

    return <RestaurantMenuList recipes={recipesInRestaurant} />;
}

export default RestaurantMenuRow;
