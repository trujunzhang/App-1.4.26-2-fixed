// import { FlashList as PageList } from '@shopify/flash-list';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {FlatList as PageList, View} from 'react-native';
import {CommonTopBar, NativeHeader} from '@components/AppHeader';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import ScreenWrapper from '@components/ScreenWrapper';
import type {ViewportOffsetTopProps} from '@components/withViewportOffsetTop';
import withViewportOffsetTop from '@components/withViewportOffsetTop';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {PlatformStackNavigationProp} from '@libs/Navigation/PlatformStackNavigation/types';
import type {AuthScreensParamList, ReportsSplitNavigatorParamList, RightIeattaNavigatorParamList, RootNavigatorParamList} from '@libs/Navigation/types';
import Navigation from '@navigation/Navigation';
import {HomeSplitNavigatorParamList} from '@src/appConfig/navigation/types';
import PageFlashListItemWithEvent from './PageFlashListItemWithEvent';

type DetailedPageLayoutProps = ViewportOffsetTopProps & {
    rowsData: IPageRow[];
    fetchMoreReviews: () => void;
    shouldShowNotFoundPage: boolean;

    /**
     * The navigation prop is passed by the navigator. It is used to trigger the onEntryTransitionEnd callback
     * when the screen transition ends.
     *
     * This is required because transitionEnd event doesn't trigger in the testing environment.
     */
    // TODO: djzhang
    // navigation?: StackNavigationProp<RootStackParamList> | StackNavigationProp<AuthScreensParamList> | StackNavigationProp<RightIeattaNavigatorParamList>;
    // navigation?: PlatformStackNavigationProp<RootNavigatorParamList> | PlatformStackNavigationProp<ReportsSplitNavigatorParamList>;
    navigation?: PlatformStackNavigationProp<RootNavigatorParamList> | PlatformStackNavigationProp<HomeSplitNavigatorParamList> | PlatformStackNavigationProp<RightIeattaNavigatorParamList>;

    shouldShowLoading: boolean;
    loadingContent?: React.ReactNode;
};

const keyExtractor = (item: IPageRow) => `row_${item.rowKey}`;

function DetailedPageLayout({rowsData, fetchMoreReviews, shouldShowNotFoundPage, navigation, shouldShowLoading, loadingContent = null, viewportOffsetTop}: DetailedPageLayoutProps) {
    const {isSmallScreenWidth} = useResponsiveLayout();

    const styles = useThemeStyles();

    const screenWrapperStyle = [styles.appContent, styles.flex1, {marginTop: viewportOffsetTop}];

    // Log.info("")
    // Log.info("================================")
    // Log.info(`rowsData: ${JSON.stringify(rowsData)}`)
    // Log.info("================================")
    // Log.info("")

    // navigation?: PlatformStackNavigationProp<RootNavigatorParamList> | PlatformStackNavigationProp<ReportsSplitNavigatorParamList>;

    return (
        <View style={[styles.flex1]}>
            <ScreenWrapper
                // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
                navigation={navigation as PlatformStackNavigationProp<RootNavigatorParamList> | PlatformStackNavigationProp<ReportsSplitNavigatorParamList>}
                style={screenWrapperStyle}
                shouldEnableKeyboardAvoidingView
                testID={DetailedPageLayout.displayName}
            >
                <FullPageNotFoundView
                    shouldShow={shouldShowNotFoundPage}
                    subtitleKey="notFound.noAccess"
                    shouldShowBackButton={isSmallScreenWidth}
                    onBackButtonPress={Navigation.goBack}
                    shouldShowLink={false}
                >
                    <View style={[styles.flex1, styles.h100]}>
                        {isSmallScreenWidth ? (
                            <NativeHeader
                                shouldShowBackButton
                                shouldShowSearchIcon={false}
                            />
                        ) : (
                            <CommonTopBar />
                        )}
                        <View style={[styles.flex1]}>
                            {shouldShowLoading ? (
                                <View style={[styles.flex1, styles.fullScreen]}>{loadingContent}</View>
                            ) : (
                                <PageList
                                    indicatorStyle="white"
                                    keyboardShouldPersistTaps="always"
                                    data={rowsData}
                                    testID="page-items-flashlist"
                                    keyExtractor={keyExtractor}
                                    renderItem={({item}) => {
                                        return <PageFlashListItemWithEvent pageRow={item} />;
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    // estimatedItemSize={variables.optionRowHeight}
                                    onEndReachedThreshold={2.2}
                                    onEndReached={fetchMoreReviews}
                                />
                            )}
                        </View>
                    </View>
                </FullPageNotFoundView>
            </ScreenWrapper>
        </View>
    );
}

DetailedPageLayout.displayName = 'DetailedPageLayout';

export default withViewportOffsetTop(DetailedPageLayout);
