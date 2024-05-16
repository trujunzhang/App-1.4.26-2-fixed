import lodashGet from 'lodash/get';
import React, {useCallback, useMemo, useState} from 'react';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import SelectionList from '@components/Ieatta/components/Selections/SelectionList';
import AddRecipeListItem from '@components/Ieatta/components/Selections/SelectionList/AddRecipeListItem';
import ScreenWrapper from '@components/ScreenWrapper';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {ParseModelPeopleInEvent} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import {convertToRadioItemForRecipes} from '@libs/ieatta/recipeUtils';
import Navigation from '@libs/Navigation/Navigation';
import * as OptionsListUtils from '@libs/OptionsListUtils';
import {BaseAddRecipesPageDefaultProps, BaseAddRecipesPagePropTypes} from './propTypes';

function BaseAddRecipesPage({peopleInEvent, recipeDictInRestaurant}) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const [searchValue, setSearchValue] = useState('');

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundView = false;
    const shouldShowLoading = false;
    const selectRecipe = (item) => {
        const {recipeId, isSelected} = item;

        let nextModel = {...peopleInEvent};
        if (isSelected) {
            nextModel = ParseModelPeopleInEvent.removeRecipe({
                model: {...peopleInEvent},
                recipeId,
            });
        } else {
            nextModel = ParseModelPeopleInEvent.addRecipe({
                model: {...peopleInEvent},
                recipeId,
            });
        }

        new FirebaseHelper()
            .setData({
                path: FBCollections.PeopleInEvent,
                model: nextModel,
            })
            .then(() => {})
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const sections = useMemo(() => {
        const value = searchValue;
        return convertToRadioItemForRecipes({title: translate('add.recipe.section.title'), recipeDictInRestaurant, recipeIds: lodashGet(peopleInEvent, 'recipeIds', []), searchValue});
    }, [peopleInEvent, recipeDictInRestaurant, searchValue, translate]);

    const headerMessage = OptionsListUtils.getHeaderMessageForNonUserList(false, searchValue);

    const selectedOptionKey = null;

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}
            shouldEnablePickerAvoiding={false}
            shouldEnableMaxHeight
            testID={BaseAddRecipesPage.displayName}
        >
            <FullPageNotFoundView
                onBackButtonPress={() => Navigation.goBack()}
                shouldShow={shouldShowNotFoundView}
                subtitleKey="workspace.common.notAuthorized"
            >
                <HeaderWithBackButton title={translate('add.recipe.title')} />
                {shouldShowLoading ? (
                    <FullScreenLoadingIndicator style={[styles.flex1, styles.pRelative]} />
                ) : (
                    <>
                        <SelectionList
                            ListItem={AddRecipeListItem}
                            sectionTitleStyles={styles.mt5}
                            sections={sections}
                            textInputValue={searchValue}
                            headerMessage={headerMessage}
                            textInputLabel={translate('add.recipe.search')}
                            rted
                            initiallyFocusedOptionKey={selectedOptionKey}
                            onChangeText={setSearchValue}
                            onSelectRow={selectRecipe}
                            canSelectMultiple
                        />
                    </>
                )}
            </FullPageNotFoundView>
        </ScreenWrapper>
    );
}

BaseAddRecipesPage.propTypes = BaseAddRecipesPagePropTypes;
BaseAddRecipesPage.defaultProps = BaseAddRecipesPageDefaultProps;
BaseAddRecipesPage.displayName = 'BaseAddRecipesPage';

export default BaseAddRecipesPage;
