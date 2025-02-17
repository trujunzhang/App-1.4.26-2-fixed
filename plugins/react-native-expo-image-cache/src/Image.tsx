/* eslint-disable rulesdir/prefer-early-return */

/* eslint-disable @lwc/lwc/no-async-await */

/* eslint-disable react/state-in-constructor */

/* eslint-disable react/static-property-placement */

/* eslint-disable lodash/import-scope */

/* eslint-disable no-restricted-imports */

/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable react/jsx-props-no-spreading */
import * as _ from 'lodash';
import * as React from 'react';
import type {ImageLoadEventData, ImageSourcePropType, ImageStyle, ImageURISource, NativeSyntheticEvent, StyleProp, TextStyle} from 'react-native';
import {Animated, Platform, Image as RNImage, StyleSheet, View} from 'react-native';
// import { BlurView } from "expo-blur";
import type {DownloadOptions} from './CacheManager';
import CacheManager from './CacheManager';

type ImageProps = {
    style?: StyleProp<TextStyle> | StyleProp<ImageStyle>;
    defaultSource?: ImageURISource | number;
    preview?: ImageSourcePropType;
    options?: DownloadOptions;
    uri: string;
    transitionDuration?: number;
    tint?: 'dark' | 'light';
    // onError: (error: { nativeEvent: { error: Error } }) => void;

    onError?: (error: {nativeEvent: {error: Error}}) => void;
    onLoad?: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
};

type ImageState = {
    uri: string | undefined;
    intensity: Animated.Value;
};

export default class Image extends React.Component<ImageProps, ImageState> {
    mounted = true;

    static defaultProps = {
        transitionDuration: 300,
        tint: 'dark',
        onError: () => {},
    };

    state = {
        uri: undefined,
        intensity: new Animated.Value(100),
    };

    componentDidMount() {
        this.load(this.props);
    }

    componentDidUpdate(prevProps: ImageProps, prevState: ImageState) {
        const {preview, transitionDuration, uri: newURI} = this.props;
        const {uri, intensity} = this.state;
        if (newURI !== prevProps.uri) {
            this.load(this.props);
        } else if (uri && preview && prevState.uri === undefined) {
            Animated.timing(intensity, {
                duration: transitionDuration,
                toValue: 0,
                useNativeDriver: Platform.OS === 'android',
            }).start();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async load({uri, options = {}, onError}: ImageProps): Promise<void> {
        if (uri) {
            try {
                if (uri.startsWith('file://')) {
                    if (this.mounted) {
                        this.setState({uri});
                    }
                } else {
                    const path = await CacheManager.get(uri, options).getPath();
                    if (this.mounted) {
                        if (path) {
                            this.setState({uri: path});
                        } else {
                            // onError({nativeEvent: {error: new Error('Could not load image')}});
                        }
                    }
                }
            } catch (error: any) {
                // onError({nativeEvent: {error}});
            }
        }
    }

    render() {
        const {preview, style, defaultSource, tint, onError, onLoad, ...otherProps} = this.props;
        // const {uri, intensity} = this.state;
        const {uri} = this.state;
        const isImageReady = !!uri;
        // const opacity = intensity.interpolate({
        //     inputRange: [0, 100],
        //     outputRange: [0, 0.5],
        // });
        const flattenedStyle = StyleSheet.flatten(style);
        const computedStyle: StyleProp<ImageStyle> = [
            StyleSheet.absoluteFill,
            _.transform(
                _.pickBy(flattenedStyle, (_val, key) => propsToCopy.indexOf(key) !== -1),
                (result: any, value: any, key) => Object.assign(result, {[key]: value - (flattenedStyle.borderWidth || 0)}),
            ),
        ];
        return (
            <View {...{style}}>
                {!!defaultSource && !isImageReady && (
                    <RNImage
                        source={defaultSource}
                        style={computedStyle}
                        {...otherProps}
                    />
                )}
                {!!preview && (
                    <RNImage
                        source={preview}
                        style={computedStyle}
                        blurRadius={Platform.OS === 'android' ? 0.5 : 0}
                        {...otherProps}
                    />
                )}
                {isImageReady && (
                    <RNImage
                        source={{uri}}
                        style={computedStyle}
                        onError={onError}
                        onLoad={onLoad}
                        {...otherProps}
                    />
                )}
                {/* {!!preview && Platform.OS === "ios" && <AnimatedBlurView style={computedStyle} {...{ intensity, tint }} />} */}
                {/* {!!preview && Platform.OS === "android" && ( */}
                {/*  <Animated.View style={[computedStyle, { backgroundColor: tint === "dark" ? black : white, opacity }]} /> */}
                {/* )} */}
            </View>
        );
    }
}

// const black = 'black';
// const white = 'white';
const propsToCopy = ['borderRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderTopLeftRadius', 'borderTopRightRadius'];
// const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
