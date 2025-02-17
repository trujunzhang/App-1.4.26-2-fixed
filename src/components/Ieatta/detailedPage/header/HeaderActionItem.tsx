import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import {PressableWithFeedback} from '@components/Pressable';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';
import type {TranslationPaths} from '@src/languages/types';
import type IconAsset from '@src/types/utils/IconAsset';

type HeaderActionItemProps = {
    /** The onPress handler. */
    onItemPress: () => void;

    /** The title of the action. */
    title: TranslationPaths;

    /** The asset to render. */
    icon: IconAsset;

    /** The fill color for the icon. Can be hex, rgb, rgba, or valid react-native named color such as 'red' or 'blue'. */
    fill?: string;
};

function HeaderActionItem({onItemPress, title, icon, fill}: HeaderActionItemProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    return (
        <PressableWithFeedback
            accessible
            accessibilityLabel={translate('common.profile')}
            onPress={onItemPress}
            wrapperStyle={[styles.flex1, styles.actionRowInHeaderPanel]}
        >
            <View style={[styles.flex1, styles.actionRowInHeaderPanel, {backgroundColor: 'transparent'}]}>
                <Icon
                    fill={fill}
                    width={variables.iconSizeNormal}
                    height={variables.iconSizeNormal}
                    src={icon}
                />
                <Text style={styles.actionTitleInHeaderPanel}>{translate(title)}</Text>
            </View>
        </PressableWithFeedback>
    );
}

export default HeaderActionItem;
