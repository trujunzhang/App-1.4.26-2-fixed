import Str from 'expensify-common/lib/str';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import ImagePlaceholder from '@components/ImagePlaceholder';
import PressableWithFeedback from '@components/Pressable/PressableWithFeedback';
import SelectCircle from '@components/SelectCircle';
import Text from '@components/Text';
import TextWithTooltip from '@components/TextWithTooltip';
import useLocalize from '@hooks/useLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import BaseListItem from './BaseListItem';
import type {AddRecipeListItemProps, ChoiceRecipeItem} from './types';

function AddRecipeListItem<TItem extends ChoiceRecipeItem>({
    item,
    isFocused,
    showTooltip,
    isDisabled,
    canSelectMultiple,
    onSelectRow,
    onCheckboxPress,
    onDismissError,
    shouldPreventDefaultFocusOnSelectRow,
    rightHandSideComponent,
    onFocus,
    shouldSyncFocus,
}: AddRecipeListItemProps<TItem>) {
    const styles = useThemeStyles();
    const theme = useTheme();
    const StyleUtils = useStyleUtils();
    const {translate} = useLocalize();

    const focusedBackgroundColor = styles.sidebarLinkActive.backgroundColor;
    const subscriptAvatarBorderColor = isFocused ? focusedBackgroundColor : theme.sidebar;
    const hoveredBackgroundColor = !!styles.sidebarLinkHover && 'backgroundColor' in styles.sidebarLinkHover ? styles.sidebarLinkHover.backgroundColor : theme.sidebar;

    const handleCheckboxPress = useCallback(() => {
        if (onCheckboxPress) {
            onCheckboxPress(item);
        } else {
            onSelectRow(item);
        }
    }, [item, onCheckboxPress, onSelectRow]);

    return (
        <BaseListItem
            item={item}
            wrapperStyle={[styles.flex1, styles.justifyContentBetween, styles.sidebarLinkInner, styles.userSelectNone, styles.peopleRow, isFocused && styles.sidebarLinkActive, styles.mv1]}
            isFocused={isFocused}
            isDisabled={isDisabled}
            showTooltip={showTooltip}
            canSelectMultiple={canSelectMultiple}
            onSelectRow={onSelectRow}
            onDismissError={onDismissError}
            shouldPreventDefaultFocusOnSelectRow={shouldPreventDefaultFocusOnSelectRow}
            rightHandSideComponent={rightHandSideComponent}
            errors={item.errors}
            pendingAction={item.pendingAction}
            FooterComponent={
                item.invitedSecondaryLogin ? (
                    <Text style={[styles.ml9, styles.ph5, styles.pb3, styles.textLabelSupporting]}>
                        {translate('workspace.people.invitedBySecondaryLogin', {secondaryLogin: item.invitedSecondaryLogin})}
                    </Text>
                ) : undefined
            }
            keyForList={item.keyForList}
            onFocus={onFocus}
            shouldSyncFocus={shouldSyncFocus}
        >
            {(hovered?: boolean) => (
                <>
                    <View style={[styles.leftImageWrapperInSelectionListItem, styles.mr2]}>
                        <ImagePlaceholder
                            sourceUri={item.recipeUrl}
                            style={[styles.w100, styles.h100]}
                            imageType="png"
                            placeholder={Expensicons.PNGBusinessMediumSquare}
                        />
                    </View>
                    <View style={[styles.flex1, styles.flexColumn, styles.justifyContentCenter, styles.alignItemsStretch, styles.optionRow]}>
                        <View style={[styles.flexRow, styles.alignItemsCenter]}>
                            <TextWithTooltip
                                shouldShowTooltip={showTooltip}
                                text={Str.removeSMSDomain(item.text ?? '')}
                                style={[
                                    styles.optionDisplayName,
                                    isFocused ? styles.sidebarLinkActiveText : styles.sidebarLinkText,
                                    item.isBold !== false && styles.sidebarLinkTextBold,
                                    styles.pre,
                                    item.alternateText ? styles.mb1 : null,
                                ]}
                            />
                        </View>
                        {!!item.alternateText && (
                            <TextWithTooltip
                                shouldShowTooltip={showTooltip}
                                text={Str.removeSMSDomain(item.alternateText ?? '')}
                                style={[styles.textLabelSupporting, styles.lh16, styles.pre]}
                            />
                        )}
                    </View>
                    {!!item.rightElement && item.rightElement}
                    {canSelectMultiple && !item.isDisabled && (
                        <PressableWithFeedback
                            onPress={handleCheckboxPress}
                            disabled={isDisabled}
                            role={CONST.ROLE.BUTTON}
                            accessibilityLabel={item.text ?? ''}
                            style={[styles.ml2, styles.optionSelectCircle]}
                        >
                            <SelectCircle
                                isChecked={item.isSelected ?? false}
                                selectCircleStyles={styles.ml0}
                            />
                        </PressableWithFeedback>
                    )}
                </>
            )}
        </BaseListItem>
    );
}

AddRecipeListItem.displayName = 'AddRecipeListItem';

export default AddRecipeListItem;
