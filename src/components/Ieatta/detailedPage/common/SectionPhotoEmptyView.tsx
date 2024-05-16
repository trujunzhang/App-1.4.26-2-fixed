import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';

function SectionPhotoEmptyView() {
    const styles = useThemeStyles();

    return (
        <View style={[styles.flexRow, styles.w100, styles.h100, styles.mh4, {backgroundColor: TailwindColors.gray200}]}>
            <View
                style={[
                    {
                        width: variables.photoInRestaurantMobileItemWidth,
                        backgroundColor: TailwindColors.gray600,
                    },
                    styles.h100,
                    styles.justifyContentCenter,
                    styles.alignItemsCenter,
                ]}
            >
                <Icon
                    fill={TailwindColors.gray400}
                    width={variables.iconSizeSuperLarge}
                    height={variables.iconSizeSuperLarge}
                    src={Expensicons.EmptyCamera}
                />
            </View>
        </View>
    );
}

export default React.memo(SectionPhotoEmptyView);
