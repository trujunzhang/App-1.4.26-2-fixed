import lodashGet from 'lodash/get';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import Avatar from '@components/Avatar';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import Tooltip from '@components/Tooltip';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';

type PressableAvatarWithIndicatorOnyxProps = {
    /** Whether the avatar is loading */
    isLoading: OnyxEntry<boolean>;
};

type PressableAvatarWithIndicatorProps = PressableAvatarWithIndicatorOnyxProps & {
    /** Whether the create menu is open */
    isCreateMenuOpen: boolean;
};

function PressableAvatarWithIndicator({isCreateMenuOpen = false, isLoading = true}: PressableAvatarWithIndicatorProps) {
    const currentUserPersonalDetails = useCurrentUserPersonalDetails();
    const {translate} = useLocalize();
    const styles = useThemeStyles();

    const loggedUserUri: string | undefined = currentUserPersonalDetails?.avatar as string | undefined;

    const showSettingsPage = useCallback(() => {
        if (isCreateMenuOpen) {
            // Prevent opening Settings page when click profile avatar quickly after clicking FAB icon
            return;
        }

        Navigation.navigate(ROUTES.SETTINGS_ROOT_RIGHT);
    }, [isCreateMenuOpen]);

    // Log.info("")
    // Log.info("================================")
    // Log.info(`currentUserPersonalDetails.avatar: ${JSON.stringify(currentUserPersonalDetails) }`)
    // Log.info("================================")
    // Log.info("")

    return (
        <PressableWithoutFeedback
            accessibilityLabel={translate('sidebarScreen.buttonMySettings')}
            role={CONST.ROLE.BUTTON}
            onPress={showSettingsPage}
        >
            <OfflineWithFeedback pendingAction={lodashGet(currentUserPersonalDetails, 'pendingFields.avatar', null)}>
                <Tooltip text={translate('common.settings')}>
                    <View style={[styles.sidebarAvatar]}>
                        <Avatar
                            size={CONST.AVATAR_SIZE.SMALL}
                            shouldShowAsAvatar
                            avatarUrl={loggedUserUri}
                            type={CONST.ICON_TYPE_AVATAR}
                        />
                    </View>
                </Tooltip>
            </OfflineWithFeedback>
        </PressableWithoutFeedback>
    );
}

PressableAvatarWithIndicator.displayName = 'PressableAvatarWithIndicator';
export default withOnyx<PressableAvatarWithIndicatorProps, PressableAvatarWithIndicatorOnyxProps>({
    isLoading: {
        key: ONYXKEYS.IS_LOADING_APP,
    },
})(PressableAvatarWithIndicator);
