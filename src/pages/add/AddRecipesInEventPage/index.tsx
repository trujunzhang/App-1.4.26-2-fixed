import type {StackScreenProps} from '@react-navigation/stack';
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {useCollectionOnce, useDocumentData} from 'react-firebase-hooks/firestore';
import {FBCollections} from '@libs/Firebase/constant';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import {emptyPeopleInEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import {toRecipeDictInRestaurant} from '@libs/ieatta/eventUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import type SCREENS from '@src/SCREENS';
import type {IFBPeopleInEvent, IFBRecipe} from '@src/types/firebase';
import BaseAddRecipesPage from './BaseAddRecipesPage';

type AddRecipesInEventNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.ADD_RECIPES_IN_EVENT>;

type AddRecipesInEventPageProps = AddRecipesInEventNavigationProps & {};

function AddRecipesInEventPage({route}: AddRecipesInEventPageProps) {
    const restaurantId = lodashGet(route, 'params.restaurantId', emptyRestaurantTag);
    const peopleInEventId = lodashGet(route, 'params.peopleInEventId', emptyPeopleInEventTag);

    /**
      |--------------------------------------------------
      | Single(PeopleInEvent)
      |--------------------------------------------------
      */
    const [peopleInEvent, loadingForPeopleInEvent, errorForPeopleInEvent] = useDocumentData<IFBPeopleInEvent>(
        FirebaseQuery.querySingle({
            path: FBCollections.PeopleInEvent,
            id: peopleInEventId,
        }),
    );

    /**
     |--------------------------------------------------
     | List(recipes)
     |--------------------------------------------------
     */
    const [recipesSnapshot, loader] = useCollectionOnce<IFBRecipe>(
        FirebaseQuery.queryEventOrMenuInRestaurant({
            path: FBCollections.Recipes,
            restaurantId,
        }),
    );

    const recipesInRestaurant = recipesSnapshot === undefined ? [] : _.map(recipesSnapshot.docs, (item) => item.data());
    const recipeDictInRestaurant: Record<string, IFBRecipe> = toRecipeDictInRestaurant(recipesInRestaurant);

    return (
        <BaseAddRecipesPage
            peopleInEvent={peopleInEvent}
            recipeDictInRestaurant={recipeDictInRestaurant}
        />
    );
}

AddRecipesInEventPage.displayName = 'AddRecipesInEventPage';

export default AddRecipesInEventPage;
