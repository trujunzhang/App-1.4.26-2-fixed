/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type {RefObject} from 'react';
import React, {useEffect, useRef, useState} from 'react';
import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';
import {View} from 'react-native';
import type {ValueOf} from 'type-fest';
import Button from '@components/Button';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import type {PopoverMenuItem} from '@components/PopoverMenu';
import PopoverMenu from '@components/PopoverMenu';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import type {ReviewDropdownOption} from '@libs/FirebaseIeatta/review-sort';
import CONST from '@src/CONST';
import type {AnchorPosition} from '@src/styles';
import AnchorAlignment from '@src/types/utils/AnchorAlignment';

type ReviewSortButtonProps = {
    /** Text to display for the menu header */
    menuHeaderText?: string;

    /** Callback to execute when the main button is pressed */
    onPress?: (event: GestureResponderEvent | KeyboardEvent | undefined, value: string) => void;

    onItemChanged: (item: ReviewDropdownOption) => void;

    /** Call the onPress function on main button when Enter key is pressed */
    pressOnEnter?: boolean;

    /** Whether we should show a loading state for the main button */
    isLoading?: boolean;

    /** The size of button size */
    buttonSize?: ValueOf<typeof CONST.DROPDOWN_BUTTON_SIZE>;

    /** Should the confirmation button be disabled? */
    isDisabled?: boolean;

    /** Additional styles to add to the component */
    style?: StyleProp<ViewStyle>;

    /** Menu options to display */
    /** e.g. [{text: 'Pay with Expensify', icon: Wallet}] */
    options: ReviewDropdownOption[];

    /** The anchor alignment of the popover menu */
    anchorAlignment?: AnchorAlignment;

    /* ref for the button */
    buttonRef?: RefObject<View>;
};

function ReviewSortButton({
    isLoading = false,
    isDisabled = false,
    pressOnEnter = false,
    menuHeaderText = '',
    style,
    buttonSize = CONST.DROPDOWN_BUTTON_SIZE.MEDIUM,
    anchorAlignment = {
        horizontal: CONST.MODAL.ANCHOR_ORIGIN_HORIZONTAL.RIGHT,
        vertical: CONST.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP, // we assume that popover menu opens below the button, anchor is at TOP
    },
    buttonRef,
    onPress = (event: GestureResponderEvent | KeyboardEvent | undefined, value: string) => {},
    onItemChanged,
    options,
}: ReviewSortButtonProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [popoverAnchorPosition, setPopoverAnchorPosition] = useState<AnchorPosition | null>(null);
    const {windowWidth, windowHeight} = useWindowDimensions();
    const caretButton = useRef<View & HTMLDivElement>(null);
    const selectedItem = options[selectedItemIndex] || options[0];
    const innerStyleDropButton = StyleUtils.getDropDownButtonHeight(buttonSize);
    const isButtonSizeLarge = buttonSize === CONST.DROPDOWN_BUTTON_SIZE.LARGE;

    useEffect(() => {
        if (!caretButton.current) {
            return;
        }
        if (!isMenuVisible) {
            return;
        }
        if ('measureInWindow' in caretButton.current) {
            caretButton.current.measureInWindow((x, y, w, h) => {
                setPopoverAnchorPosition({
                    horizontal: x + w,
                    vertical:
                        anchorAlignment.vertical === CONST.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP
                            ? y + h + CONST.MODAL.POPOVER_MENU_PADDING // if vertical anchorAlignment is TOP, menu will open below the button and we need to add the height of button and padding
                            : y - CONST.MODAL.POPOVER_MENU_PADDING, // if it is BOTTOM, menu will open above the button so NO need to add height but DO subtract padding
                });
            });
        }
        // }, [windowWidth, windowHeight, isMenuVisible, anchorAlignment.vertical]);
    }, [windowWidth, windowHeight, isMenuVisible]);

    const onItemSelected = (item: PopoverMenuItem, index: number) => {
        setIsMenuVisible(false);
        onItemChanged(item as any);
    };

    return (
        <View>
            {options.length > 1 ? (
                <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter, style]}>
                    <Button
                        success
                        pressOnEnter={pressOnEnter}
                        ref={buttonRef}
                        onPress={(event) => onPress(event, selectedItem.value)}
                        text={selectedItem.text}
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        shouldRemoveRightBorderRadius
                        style={[styles.flex1, styles.pr0]}
                        large={isButtonSizeLarge}
                        medium={!isButtonSizeLarge}
                        innerStyles={[innerStyleDropButton]}
                    />

                    <Button
                        ref={caretButton}
                        success
                        isDisabled={isDisabled}
                        style={[styles.pl0]}
                        onPress={() => setIsMenuVisible(!isMenuVisible)}
                        shouldRemoveLeftBorderRadius
                        large={isButtonSizeLarge}
                        medium={!isButtonSizeLarge}
                        innerStyles={[styles.dropDownButtonCartIconContainerPadding, innerStyleDropButton]}
                    >
                        <View style={[styles.dropDownButtonCartIconView, innerStyleDropButton]}>
                            <View style={[styles.buttonDivider]} />
                            <View style={[styles.dropDownButtonArrowContain]}>
                                <Icon
                                    src={Expensicons.DownArrow}
                                    fill={theme.textLight}
                                />
                            </View>
                        </View>
                    </Button>
                </View>
            ) : (
                <Button
                    success
                    ref={buttonRef}
                    pressOnEnter={pressOnEnter}
                    isDisabled={isDisabled}
                    style={[styles.w100, style]}
                    isLoading={isLoading}
                    text={selectedItem.text}
                    onPress={(event) => onPress(event, options[0].value)}
                    large={isButtonSizeLarge}
                    medium={!isButtonSizeLarge}
                    innerStyles={[innerStyleDropButton]}
                />
            )}
            {options.length > 1 && popoverAnchorPosition && (
                <PopoverMenu
                    isVisible={isMenuVisible}
                    onClose={() => setIsMenuVisible(false)}
                    onItemSelected={onItemSelected}
                    anchorPosition={popoverAnchorPosition}
                    anchorRef={caretButton}
                    withoutOverlay
                    // anchorAlignment={anchorAlignment}
                    headerText={menuHeaderText}
                    menuItems={options.map((item: any, index: number) => ({
                        ...item,
                        onSelected: () => {
                            setSelectedItemIndex(index);
                        },
                    }))}
                />
            )}
        </View>
    );
}

ReviewSortButton.displayName = 'ReviewSortButton';

export default React.memo(ReviewSortButton);
