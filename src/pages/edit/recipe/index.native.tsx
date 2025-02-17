/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {StackScreenProps} from '@react-navigation/stack';
import {useObject, useQuery, useRealm} from '@realm/react';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {PhotoType} from '@libs/FirebaseIeatta/constant';
import {emptyRecipeTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import RealmHelper from '@libs/Realm/services/realm-helper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBPhoto, IFBRecipe} from '@src/types/firebase';
import BaseEditRecipePage from './BaseEditRecipePage';

type EditRecipeNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.RECIPE>;

// eslint-disable-next-line @typescript-eslint/ban-types
type EditRecipePageProps = EditRecipeNavigationProps & {};

function EditRecipePage(props: EditRecipePageProps) {
    const recipeId = lodashGet(props.route, 'params.recipeId', emptyRecipeTag);
    const restaurantId = lodashGet(props.route, 'params.restaurantId', emptyRestaurantTag);

    const {windowWidth} = useWindowDimensions();
    const realm = useRealm();

    /**
      |--------------------------------------------------
      | Single(Recipe)
      |--------------------------------------------------
      */
    const recipeInRealm = useObject<IFBRecipe>(RealmCollections.Recipes, recipeId);
    const recipe: IFBRecipe | undefined = _.isNull(recipeInRealm) === false ? (recipeInRealm as IFBRecipe) : undefined;

    const photos = useQuery(
        RealmCollections.Photos,
        RealmQuery.queryForRealmPhotos({
            relatedId: recipeId,
            photoType: PhotoType.Recipe,
        }),
    );
    const photosInPage: IFBPhoto[] = toRealmModelList<IFBPhoto>(photos);

    // eslint-disable-next-line @lwc/lwc/no-async-await
    const onAfterSelectedCover = async (firebasePhotoId: string) => {
        await new RealmHelper(realm).updateSqlPhotoCover({firebasePhotoId, coverId: recipeId, coverType: RealmCollections.Recipes});
    };

    return (
        <BaseEditRecipePage
            key={lodashGet(recipe, 'uniqueId', emptyRecipeTag)}
            initialPanelWidth={windowWidth}
            restaurantId={restaurantId}
            recipeId={recipeId}
            recipe={recipe}
            isNewModel={recipeId === CONST.IEATTA_EDIT_MODEL_NEW}
            photosInPage={photosInPage}
            onAfterSelectedCover={onAfterSelectedCover}
        />
    );
}

EditRecipePage.displayName = 'EditRecipePage';

export default EditRecipePage;
