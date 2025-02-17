import React, {useCallback} from 'react';
import {View} from 'react-native';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import PressableAvatarWithIndicator from './PressableAvatarWithIndicator';

type AvatarWithOptionalStatusProps = {
    emojiStatus?: string;
    isCreateMenuOpen?: boolean;
};

function AvatarWithOptionalStatus({emojiStatus = '', isCreateMenuOpen = false}: AvatarWithOptionalStatusProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const showStatusPage = useCallback(() => {
        if (isCreateMenuOpen) {
            // Prevent opening Settings page when click profile avatar quickly after clicking FAB icon
            return;
        }

        // Navigation.navigate(ROUTES.SETTINGS_STATUS);
        Navigation.navigate(ROUTES.SETTINGS);
    }, [isCreateMenuOpen]);

    return (
        <View style={styles.sidebarStatusAvatarContainer}>
            <PressableWithoutFeedback
                accessibilityLabel={translate('sidebarScreen.buttonMySettings')}
                role={CONST.ROLE.BUTTON}
                onPress={showStatusPage}
                style={styles.flex1}
            >
                <Tooltip text={translate('statusPage.status')}>
                    <View style={styles.sidebarStatusAvatar}>
                        <Text
                            style={styles.emojiStatusLHN}
                            numberOfLines={1}
                        >
                            {emojiStatus}
                        </Text>
                    </View>
                </Tooltip>
            </PressableWithoutFeedback>
            <PressableAvatarWithIndicator isCreateMenuOpen={isCreateMenuOpen} />
        </View>
    );
}

AvatarWithOptionalStatus.displayName = 'AvatarWithOptionalStatus';
export default AvatarWithOptionalStatus;
