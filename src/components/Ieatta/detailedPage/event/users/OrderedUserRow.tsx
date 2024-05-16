import React from 'react';
import {Image as RNImage, View} from 'react-native';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import DisplayNames from '@components/DisplayNames';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import IconWithTooltip from '@components/Ieatta/components/IconWithTooltip';
import IeattaUserDetailsTooltip from '@components/Ieatta/detailedPage/common/IeattaUserDetailsTooltip';
import {PressableWithFeedback} from '@components/Pressable';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import type {IFBPeopleInEvent} from '@src/types/firebase';
import type {PersonalDetails} from '@src/types/onyx';

type OrderedUserRowProps = {
    peopleInEvent: IFBPeopleInEvent;
    user: PersonalDetails;
    recipesCount: number;
};

function OrderedUserRow({peopleInEvent, user, recipesCount}: OrderedUserRowProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const addButton = (
        <IconWithTooltip
            toolTip="add.recipe.button"
            onPress={() => {
                Navigation.navigate(ROUTES.ADD_RECIPES_IN_EVENT.getRoute({restaurantId: peopleInEvent.restaurantId, peopleInEventId: peopleInEvent.uniqueId}));
            }}
            testID="Add Icon"
            containerStyle={[styles.mr2]}
            iconFill={TailwindColors.red500}
            iconSrc={Expensicons.Plus}
        />
    );

    const addButtonxxx = (
        <Tooltip text={translate('add.recipe.button')}>
            <PressableWithFeedback
                onPress={() => {
                    Navigation.navigate(ROUTES.ADD_RECIPES_IN_EVENT.getRoute({restaurantId: peopleInEvent.restaurantId, peopleInEventId: peopleInEvent.uniqueId}));
                }}
                style={styles.signInIconButton}
                role={CONST.ROLE.BUTTON}
                accessibilityLabel="add.recipe.button"
            >
                <View
                    style={[styles.flexRow, styles.alignItemsCenter, styles.ml2]}
                    accessible={false}
                >
                    <Icon
                        testID="Add Icon"
                        fill={TailwindColors.red500}
                        src={Expensicons.Plus}
                    />
                </View>
            </PressableWithFeedback>
        </Tooltip>
    );

    return (
        <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween, styles.sidebarLink, styles.sidebarLinkInnerLHN]}>
            <View style={[styles.chatLinkRowPressable, styles.flexGrow1, styles.optionItemAvatarNameWrapper, styles.optionRow, styles.justifyContentCenter]}>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <IeattaUserDetailsTooltip userId={user.userID}>
                        <View>
                            <Avatar
                                containerStyles={[styles.actionAvatar]}
                                avatarUrl={user.originalUrl}
                                type={CONST.ICON_TYPE_AVATAR}
                                name={user.displayName}
                            />
                        </View>
                    </IeattaUserDetailsTooltip>

                    <View style={[styles.ph4, styles.flexColumn]}>
                        <View style={[styles.flexRow, styles.alignItemsCenter, styles.mw100, styles.overflowHidden]}>
                            <IeattaUserDetailsTooltip userId={user.userID}>
                                <View>
                                    <DisplayNames
                                        accessibilityLabel={translate('accessibilityHints.chatUserDisplayNames')}
                                        fullTitle={user.displayName ?? ''}
                                        displayNamesWithTooltips={[]}
                                        // displayNamesWithTooltips={optionItem.displayNamesWithTooltips}
                                        tooltipEnabled
                                        numberOfLines={1}
                                        textStyles={[styles.optionDisplayName, styles.optionDisplayNameCompact, styles.pre, styles.fontExtraBold]}
                                        shouldUseFullTitle
                                    />
                                </View>
                            </IeattaUserDetailsTooltip>
                        </View>
                        <View style={[styles.flexRow]}>
                            <Text style={[styles.textLabel]}>{`${recipesCount} Recipes Ordered`}</Text>
                        </View>
                    </View>
                    {addButton}
                </View>
            </View>
        </View>
    );
}

OrderedUserRow.displayName = 'OrderedUserRow';

export default React.memo(OrderedUserRow);
