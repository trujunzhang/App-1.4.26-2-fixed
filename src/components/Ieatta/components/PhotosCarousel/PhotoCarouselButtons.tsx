import React from 'react';
import {View} from 'react-native';
import Button from '@components/Button';
import * as Expensicons from '@components/Icon/Expensicons';
import useThemeStyles from '@hooks/useThemeStyles';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';

type PhotoCarouselButtonsProps = {
    photoWidth: number;
    photoHeight: number;

    photoIndex: number;

    shouldShowLeftArrow: boolean;
    shouldShowRightArrow: boolean;
    jumpToPhoto: (index: number) => void;
    onLeftArrowPress: () => void;
    onRightArrowPress: () => void;
};

function PhotoCarouselButtons({photoWidth, photoHeight, photoIndex, shouldShowLeftArrow, shouldShowRightArrow, jumpToPhoto, onLeftArrowPress, onRightArrowPress}: PhotoCarouselButtonsProps) {
    const styles = useThemeStyles();

    const renderArrow = (isRightArrow: boolean, onPress: () => void) => {
        return (
            <Button
                small
                style={[
                    {backgroundColor: TailwindColors.white},
                    {
                        width: variables.detailedHeaderArrowWidth,
                        height: variables.detailedHeaderArrowHeight,
                        borderRadius: variables.detailedHeaderArrowWidth / 2,
                    },
                    styles.ph0,
                    styles.pv0,
                ]}
                innerStyles={[
                    {backgroundColor: TailwindColors.gray200},
                    {
                        width: variables.detailedHeaderArrowWidth,
                        height: variables.detailedHeaderArrowHeight,
                        borderRadius: variables.detailedHeaderArrowWidth / 2,
                    },
                ]}
                hoverStyles={[{backgroundColor: TailwindColors.white}]}
                icon={isRightArrow ? Expensicons.ArrowRight : Expensicons.ArrowLeft}
                iconFill={TailwindColors.gray500}
                iconWidth={variables.iconSizeNormal}
                iconHeight={variables.iconSizeNormal}
                iconStyles={[styles.ml0, styles.mr0]}
                onPress={onPress}
                // onPressIn={cancelAutoHideArrow}
                // onPressOut={autoHideArrow}
            />
        );
    };

    return (
        <>
            {/*  left arrow  */}
            <View
                style={[
                    styles.pAbsolute,
                    {
                        top: photoHeight / 2 - variables.detailedHeaderArrowHeight / 2,
                        left: 10,
                    },
                ]}
            >
                {shouldShowLeftArrow &&
                    renderArrow(false, () => {
                        jumpToPhoto(photoIndex - 1);
                        onLeftArrowPress();
                    })}
            </View>

            {/*  right arrow  */}
            <View
                style={[
                    styles.pAbsolute,
                    {
                        top: photoHeight / 2 - variables.detailedHeaderArrowHeight / 2,
                        right: 10,
                    },
                ]}
            >
                {shouldShowRightArrow &&
                    renderArrow(true, () => {
                        jumpToPhoto(photoIndex + 1);
                        onRightArrowPress();
                    })}
            </View>
        </>
    );
}

export default PhotoCarouselButtons;
