import {useQuery} from '@realm/react';
import React from 'react';
import RestaurantMenuList from '@components/Ieatta/detailedPage/restaurant/menu/RestaurantMenuList';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import type {IFBRecipe} from '@src/types/firebase';
import type {RestaurantMenuRowProps} from './types';

function RestaurantMenuRow({menuRow}: RestaurantMenuRowProps) {
    const {restaurantId, isSmallScreenWidth} = menuRow;

    const recipes = useQuery<IFBRecipe>(RealmCollections.Recipes, (array) => {
        return array.filtered('restaurantId == $0', restaurantId);
    });
    const recipesInRestaurant: IFBRecipe[] = toRealmModelList<IFBRecipe>(recipes);

    // Log.info("")
    // Log.info("================================")
    // Log.info(`native's restaurantId: ${restaurantId}`)
    // Log.info(`native's recipes: ${recipes.length}`)
    // Log.info("================================")
    // Log.info("")

    return <RestaurantMenuList recipes={recipesInRestaurant} />;
}

export default RestaurantMenuRow;
