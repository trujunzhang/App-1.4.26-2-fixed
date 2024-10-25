import lodashGet from 'lodash/get';
import React, {useCallback, useMemo, useState} from 'react';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import AddRecipeListItem from '@components/Ieatta/components/Selections/AddRecipeListItem';
import type {ChoiceRecipeItem} from '@components/Ieatta/components/Selections/types';
import ScreenWrapper from '@components/ScreenWrapper';
import SelectionList from '@components/SelectionList';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {ParseModelPeopleInEvent} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import {convertToRadioItemForRecipes} from '@libs/ieatta/recipeUtils';
import Navigation from '@libs/Navigation/Navigation';
import * as OptionsListUtils from '@libs/OptionsListUtils';
import type {IFBPeopleInEvent, IFBRecipe} from '@src/types/firebase';

type BaseAddRecipesPageProps = {
    peopleInEvent: IFBPeopleInEvent | undefined;
    recipeDictInRestaurant: Record<string, IFBRecipe>;
};

function BaseAddRecipesPage({peopleInEvent, recipeDictInRestaurant}: BaseAddRecipesPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const [searchValue, setSearchValue] = useState('');

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundView = false;
    const shouldShowLoading = false;
    const selectRecipe = (item: ChoiceRecipeItem) => {
        const {recipeId, isSelected} = item;

        if (peopleInEvent === null || peopleInEvent === undefined) {
            return;
        }

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
                    <SelectionList
                        ListItem={AddRecipeListItem}
                        sectionTitleStyles={styles.mt5}
                        sections={sections}
                        textInputValue={searchValue}
                        headerMessage={headerMessage}
                        textInputLabel={translate('add.recipe.search')}
                        initiallyFocusedOptionKey={selectedOptionKey}
                        onChangeText={setSearchValue}
                        onSelectRow={selectRecipe}
                        canSelectMultiple
                    />
                )}
            </FullPageNotFoundView>
        </ScreenWrapper>
    );
}

BaseAddRecipesPage.displayName = 'BaseAddRecipesPage';

export default BaseAddRecipesPage;
