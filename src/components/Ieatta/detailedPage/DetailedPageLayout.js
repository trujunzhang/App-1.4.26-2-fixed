// import { FlashList as PageList } from '@shopify/flash-list';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import {FlatList as PageList, View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import NativeHeader from '@components/AppHeader/NativeHeader';
import TopBar from '@components/AppHeader/TopBar';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import ScreenWrapper from '@components/ScreenWrapper';
import withViewportOffsetTop from '@components/withViewportOffsetTop';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import compose from '@libs/compose';
import Log from '@libs/Log';
import Navigation from '@navigation/Navigation';
import variables from '@styles/variables';
import PageFlashListItemWithEvent from './PageFlashListItemWithEvent';
import {pageRowPropTypes} from './pageLayoutProptypes';

const propTypes = {
    /** Sections for the section list */
    rowsData: PropTypes.arrayOf(pageRowPropTypes).isRequired,

    fetchMoreReviews: PropTypes.func.isRequired,

    shouldShowNotFoundPage: PropTypes.bool.isRequired,

    viewportOffsetTop: PropTypes.number.isRequired,

    // eslint-disable-next-line react/forbid-prop-types
    navigation: PropTypes.object.isRequired,

    shouldShowLoading: PropTypes.bool.isRequired,
    loadingContent: PropTypes.node,
};
const defaultProps = {
    loadingContent: null,
};

const keyExtractor = (item) => `row_${item.rowKey}`;

// eslint-disable-next-line react/prop-types
function DetailedPageLayout({rowsData, fetchMoreReviews, shouldShowNotFoundPage, navigation, shouldShowLoading, loadingContent, viewportOffsetTop}) {
    const {isSmallScreenWidth} = useWindowDimensions();

    const styles = useThemeStyles();

    // const isTopMostReportId = currentReportID === getReportID(route);
    const isTopMostReportId = true;

    const screenWrapperStyle = [styles.appContent, styles.flex1, {marginTop: viewportOffsetTop}];

    // Log.info("")
    // Log.info("================================")
    // Log.info(`rowsData: ${JSON.stringify(rowsData)}`)
    // Log.info("================================")
    // Log.info("")

    return (
        <View style={[styles.flex1]}>
            <ScreenWrapper
                navigation={navigation}
                style={screenWrapperStyle}
                shouldEnableKeyboardAvoidingView={isTopMostReportId}
                testID={DetailedPageLayout.displayName}
            >
                <FullPageNotFoundView
                    shouldShow={shouldShowNotFoundPage}
                    subtitleKey="notFound.noAccess"
                    shouldShowCloseButton={false}
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
                            <TopBar />
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
                                        return <PageFlashListItemWithEvent item={item} />;
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    estimatedItemSize={variables.optionRowHeight}
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

DetailedPageLayout.propTypes = propTypes;
DetailedPageLayout.defaultProps = defaultProps;
DetailedPageLayout.displayName = 'DetailedPageLayout';

export default compose(withViewportOffsetTop, withOnyx())(DetailedPageLayout);
