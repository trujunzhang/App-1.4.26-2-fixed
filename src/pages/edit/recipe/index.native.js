import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useObject, useQuery} from '@realm/react';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FBCollections} from '@libs/Firebase/constant';
import {emptyRecipeTag} from '@libs/ieatta/editFormUtils';
import {RealmCollections} from '@libs/Realm/constant';
import CONST from '@src/CONST';
import BaseEditRecipePage from './BaseEditRecipePage';

const propTypes = {
    /** The route object passed to this page from the navigator */
    route: PropTypes.shape({
        /** Each parameter passed via the URL */
        params: PropTypes.shape({
            /** The policyID that is being configured */
            recipeId: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

const defaultProps = {};

function EditRecipePage(props) {
    const recipeId = lodashGet(props.route, 'params.recipeId', emptyRecipeTag);

    /**
      |--------------------------------------------------
      | Single(Recipe)
      |--------------------------------------------------
      */
    const recipe = useObject(RealmCollections.Recipes, recipeId);

    return (
        <BaseEditRecipePage
            key={lodashGet(recipe, 'uniqueId', emptyRecipeTag)}
            recipeId={recipeId}
            recipe={recipe}
            isNewModel={recipeId === CONST.IEATTA_EDIT_MODEL_NEW}
        />
    );
}

EditRecipePage.propTypes = propTypes;
EditRecipePage.defaultProps = defaultProps;
EditRecipePage.displayName = 'EditRecipePage';

// export default compose(
// withNetwork()
// )(EditRecipePage);

export default EditRecipePage;
