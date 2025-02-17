/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type {ForwardedRef} from 'react';
import React, {forwardRef, useState} from 'react';
import type {ImageLoadEventData, NativeSyntheticEvent} from 'react-native';
import {Image as RNImage, View} from 'react-native';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import ImagePlaceholder from '@components/ImagePlaceholder';
import type {BaseTextInputProps, BaseTextInputRef} from '@components/TextInput/BaseTextInput/types';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import Log from '@libs/Log';

type PhotoPreviewPanelProps = {
    /** BasePicker label */
    // label?: string | null;
    /** Input value */
    // value: string;
    /** The ID used to uniquely identify the input in a Form */
    // inputID?: string;
    /** Saves a draft of the input value when used in a form */
    // shouldSaveDraft?: boolean;
    /** A callback method that is called when the value changes and it receives the selected value as an argument */
    // onInputChange: (value: number, index?: number) => void;
} & BaseTextInputProps;

function PhotoPreviewPanel({inputID, value = '', onInputChange, label = '', shouldSaveDraft = false}: PhotoPreviewPanelProps, ref: ForwardedRef<BaseTextInputRef>) {
    const styles = useThemeStyles();
    const {windowWidth, windowHeight} = useWindowDimensions();

    const [aspectRatio, setAspectRatio] = useState(1);
    const [imageWidth, setImageWidth] = useState<number>(0);
    const [imageHeight, setImageHeight] = useState<number>(0);

    Log.info('');
    Log.info('================================');
    Log.info(`imgUri on the PhotoPreviewPanel on the mobile: ${value}`);
    Log.info('================================');
    Log.info('');

    /**
     * Forms use inputID to set values. But BasePicker passes an index as the second parameter to onValueChange
     * We are overriding this behavior to make BasePicker work with Form
     */
    const onValueChange = (rating: number) => {};

    return (
        // <View style={[styles.flex1, {width: windowWidth, height: 300}]}>
        <View style={[styles.flex1, styles.w100, {height: 300}]}>
            <View style={[styles.pAbsolute, styles.pInset]}>
                <RNImage
                    style={[styles.w100, styles.h100]}
                    source={Ieattaicons.GridBG}
                />
            </View>
            <ImagePlaceholder
                sourceUri={value}
                // style={[styles.flex1, styles.w100, {aspectRatio}]}
                style={[styles.flex1, styles.w100, {height: 300}]}
                resizeMode="contain"
                imageType="svg"
                placeholder={Ieattaicons.LargeEmptyBizSkyline}
                onLoad={(event: NativeSyntheticEvent<ImageLoadEventData>) => {
                    const {width, height} = event.nativeEvent.source;
                    Log.info('');
                    Log.info('================================');
                    Log.info(`Edit photo page: ${width}`);
                    Log.info('================================');
                    Log.info('');
                    setImageWidth(width);
                    setImageHeight(height);
                    setAspectRatio(width / height);
                }}
            />
        </View>
    );
}

PhotoPreviewPanel.displayName = 'PhotoPreviewPanel';

export default forwardRef(PhotoPreviewPanel);
