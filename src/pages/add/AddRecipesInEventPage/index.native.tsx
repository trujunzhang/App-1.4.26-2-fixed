/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {StackScreenProps} from '@react-navigation/stack';
import {useObject, useQuery} from '@realm/react';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {emptyPeopleInEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import {toRecipeDictInRestaurant} from '@libs/ieatta/eventUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import type SCREENS from '@src/SCREENS';
import type {IFBPeopleInEvent, IFBRecipe} from '@src/types/firebase';
import BaseAddRecipesPage from './BaseAddRecipesPage';

type AddRecipesInEventNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.ADD_RECIPES_IN_EVENT>;

// eslint-disable-next-line @typescript-eslint/ban-types
type AddRecipesInEventPageProps = AddRecipesInEventNavigationProps & {};

function AddRecipesInEventPage({route}: AddRecipesInEventPageProps) {
    const restaurantId = lodashGet(route, 'params.restaurantId', emptyRestaurantTag);
    const peopleInEventId = lodashGet(route, 'params.peopleInEventId', emptyPeopleInEventTag);

    /**
      |--------------------------------------------------
      | Single(PeopleInEvent)
      |--------------------------------------------------
      */
    const peopleInEventInRealm = useObject<IFBPeopleInEvent>(RealmCollections.PeopleInEvent, peopleInEventId);
    const peopleInEvent: IFBPeopleInEvent | undefined = _.isNull(peopleInEventInRealm) === false ? (peopleInEventInRealm as IFBPeopleInEvent) : undefined;

    /**
     |--------------------------------------------------
     | List(recipes)
     |--------------------------------------------------
     */
    const recipesInRestaurantInRealm = useQuery<IFBRecipe>(RealmCollections.Recipes, RealmQuery.queryForRealmRecipes({restaurantId}), [restaurantId]);

    const recipes: IFBRecipe[] = toRealmModelList<IFBRecipe>(recipesInRestaurantInRealm);
    const recipeDictInRestaurant = toRecipeDictInRestaurant(recipes);

    return (
        <BaseAddRecipesPage
            restaurantId={restaurantId}
            peopleInEvent={peopleInEvent}
            recipeDictInRestaurant={recipeDictInRestaurant}
        />
    );
}

AddRecipesInEventPage.displayName = 'AddRecipesInEventPage';

export default AddRecipesInEventPage;
