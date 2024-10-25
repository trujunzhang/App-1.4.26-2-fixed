import React, {useCallback, useState} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import TextInput from '@components/TextInput';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import type {OnReviewSearchChanged} from '@libs/Firebase/list/types/rows/review';
import variables from '@styles/variables';

type SearchReviewProps = {
    // Text explaining what the user can search for
    placeholder?: string;

    // Text showing up in a tooltip when component is hovered
    tooltip?: string;

    // Styles to apply on the outer element
    style?: StyleProp<ViewStyle>;

    /** Styles to apply to the outermost element */
    containerStyle?: StyleProp<ViewStyle>;

    onReviewSearchChanged: OnReviewSearchChanged;
};

function SearchReview({onReviewSearchChanged, placeholder, tooltip, style, containerStyle}: SearchReviewProps) {
    const styles = useThemeStyles();
    const theme = useTheme();
    const {translate} = useLocalize();
    const [search, setSearch] = useState('');

    /**
     * Handle text input and validate the text input if it is blurred
     *
     * @param {String} text
     */
    const onTextInput = useCallback(
        (text: string) => {
            setSearch(text);
            onReviewSearchChanged(text);
        },
        [onReviewSearchChanged],
    );

    return (
        <View style={containerStyle}>
            <Tooltip text={tooltip ?? translate('common.search')}>
                <View style={[styles.searchContainer, style]}>
                    <Icon
                        src={Expensicons.MagnifyingGlass}
                        width={variables.iconSizeSmall}
                        height={variables.iconSizeSmall}
                        fill={theme.icon}
                    />
                    <TextInput
                        accessibilityLabel="Text input field"
                        label="Search within reviews"
                        containerStyles={[styles.flex1]}
                        onChangeText={onTextInput}
                        value={search}
                    />
                </View>
            </Tooltip>
        </View>
    );
}

SearchReview.displayName = 'SearchReview';

export type {SearchReviewProps};
export default SearchReview;
