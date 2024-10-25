import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {View} from 'react-native';
import {FullScreenToolBar, NativeHeader} from '@components/AppHeader';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import ScreenWrapper from '@components/ScreenWrapper';
import type {ViewportOffsetTopProps} from '@components/withViewportOffsetTop';
import withViewportOffsetTop from '@components/withViewportOffsetTop';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import type {CentralPaneNavigatorParamList, RootStackParamList} from '@libs/Navigation/types';
import Navigation from '@navigation/Navigation';
import Variables from '@styles/variables';

type PhotosPageLayoutProps = ViewportOffsetTopProps & {
    /** Whether to show the loading content. */
    shouldShowLoading?: boolean;

    /** The content to show when loading. */
    loadingContent?: React.ReactNode;

    shouldShowNotFoundPage: boolean;

    shouldShowHeader?: boolean;

    showFullscreen?: boolean;

    /**
     * The navigation prop is passed by the navigator. It is used to trigger the onEntryTransitionEnd callback
     * when the screen transition ends.
     *
     * This is required because transitionEnd event doesn't trigger in the testing environment.
     */
    navigation?: StackNavigationProp<RootStackParamList> | StackNavigationProp<CentralPaneNavigatorParamList>;

    headerPanel?: React.ReactNode;

    children: React.ReactNode;

    containerStyle?: StyleProp<ViewStyle>;
};

function PhotosPageLayout({
    showFullscreen = false,
    shouldShowLoading = false,
    shouldShowHeader = true,
    loadingContent = null,
    shouldShowNotFoundPage,
    navigation,
    viewportOffsetTop,
    headerPanel,
    containerStyle,
    children,
}: PhotosPageLayoutProps) {
    const {isSmallScreenWidth} = useWindowDimensions();

    const styles = useThemeStyles();

    const screenWrapperStyle = [styles.appContent, styles.flex1, {marginTop: showFullscreen ? 0 : viewportOffsetTop}];

    const renderContent = () => {
        if (shouldShowLoading) {
            return loadingContent;
        }
        return children;
    };

    const renderHeader = () => {
        if (shouldShowHeader) {
            if (isSmallScreenWidth) {
                return (
                    <NativeHeader
                        shouldShowBackButton
                        shouldShowSearchIcon={false}
                        title="headerPanel.photo.grid"
                        shouldShowSubtitle={false}
                        shouldShowAvatar={false}
                        shouldShowAddIcon
                        onAddIconPress={() => {}}
                    />
                );
            }
            return <FullScreenToolBar />;
        }
        return null;
    };

    return (
        <View style={[styles.flex1]}>
            <ScreenWrapper
                navigation={navigation}
                style={screenWrapperStyle}
                includePaddingTop={showFullscreen === false}
                includeSafeAreaPaddingBottom={showFullscreen === false}
                shouldShowOfflineIndicator={false}
                shouldEnableKeyboardAvoidingView
                testID={PhotosPageLayout.displayName}
            >
                <FullPageNotFoundView
                    shouldShow={shouldShowNotFoundPage}
                    subtitleKey="notFound.noAccess"
                    shouldShowBackButton={isSmallScreenWidth}
                    onBackButtonPress={Navigation.goBack}
                    shouldShowLink={false}
                >
                    <View style={[styles.flex1]}>
                        {renderHeader()}
                        <View
                            style={[
                                styles.flex1,
                                styles.w100,
                                styles.alignSelfCenter,
                                {
                                    maxWidth: Variables.maxWidthInPhotosGridAndPage,
                                },
                                containerStyle,
                            ]}
                        >
                            {renderContent()}
                        </View>
                    </View>
                </FullPageNotFoundView>
            </ScreenWrapper>
        </View>
    );
}

PhotosPageLayout.displayName = 'PhotosPageLayout';

export default withViewportOffsetTop(PhotosPageLayout);
