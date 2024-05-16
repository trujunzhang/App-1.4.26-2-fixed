import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import Button from '@components/Button';
import Divider from '@components/Divider';
import * as Expensicons from '@components/Icon/Expensicons';
import Text from '@components/Text';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';

type ActionBarInInfoPanelProps = {
    actionBarType: string;
    infoId: string;
    shouldShowAddPhotoButton?: boolean;
    onWriteReviewPress?: () => void;
    onAddPhotoPress?: () => void;
};

function ActionBarInInfoPanel({actionBarType, infoId, shouldShowAddPhotoButton = true, onWriteReviewPress, onAddPhotoPress}: ActionBarInInfoPanelProps) {
    const theme = useTheme();
    const styles = useThemeStyles();

    // const onWriteReviewPress = () => {};
    // const onAddPhotoPress = () => {};

    const writeAReview = (
        <Button
            large
            style={[
                {
                    borderRadius: variables.buttonBorderInPagedHeaderRadius,
                },
            ]}
            innerStyles={[
                styles.ph8,
                {
                    borderRadius: variables.buttonBorderInPagedHeaderRadius,
                    backgroundColor: TailwindColors.red600,
                },
            ]}
            hoverStyles={[{backgroundColor: TailwindColors.red700}]}
            textStyles={[styles.textStrong, styles.textLarge, {color: TailwindColors.white}]}
            icon={Expensicons.WriteAReview}
            iconWidth={variables.iconSizeLarge}
            iconHeight={variables.iconSizeLarge}
            iconFill={theme.text}
            iconStyles={[styles.mr2]}
            text="Write a Review"
            onPress={onWriteReviewPress}
        />
    );
    const addPhoto = (
        <Button
            large
            style={[
                {
                    borderRadius: variables.buttonBorderInPagedHeaderRadius,
                },
            ]}
            innerStyles={[
                styles.ph8,
                {
                    borderRadius: variables.buttonBorderInPagedHeaderRadius,
                    backgroundColor: TailwindColors.white,
                    borderWidth: 1,
                    borderColor: TailwindColors.gray400,
                },
            ]}
            hoverStyles={[
                {
                    backgroundColor: TailwindColors.gray400,
                    borderWidth: 1,
                    borderColor: TailwindColors.gray100,
                },
            ]}
            textStyles={[styles.textStrong, styles.textLarge, {color: TailwindColors.gray800}]}
            icon={Expensicons.AddPhoto}
            iconWidth={variables.iconSizeLarge}
            iconHeight={variables.iconSizeLarge}
            iconFill={theme.text}
            iconStyles={[styles.mr2]}
            text="Add photo"
            onPress={onAddPhotoPress}
        />
    );
    return (
        <View style={[styles.flex1, styles.flexColumn]}>
            <View style={[styles.flexRow, styles.pl8, styles.pv6, styles.gap4]}>
                {writeAReview}
                {shouldShowAddPhotoButton && addPhoto}
            </View>
            <View style={[styles.flexRow, styles.justifyContentCenter, styles.ph10]}>
                <Divider dividerStyle={[styles.justifyContentCenter]} />
            </View>
        </View>
    );
}

ActionBarInInfoPanel.displayName = 'ActionBarInInfoPanel';

export default ActionBarInInfoPanel;
