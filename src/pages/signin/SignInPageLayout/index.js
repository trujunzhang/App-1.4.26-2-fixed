import PropTypes from 'prop-types';
import React, {forwardRef, useEffect, useImperativeHandle, useMemo, useRef} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import SignInGradient from '@assets/images/home-fade-gradient.svg';
import ImageSVG from '@components/ImageSVG';
import withLocalize, {withLocalizePropTypes} from '@components/withLocalize';
import usePrevious from '@hooks/usePrevious';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import compose from '@libs/compose';
import SignInPageHero from '@pages/signin/SignInPageHero';
import variables from '@styles/variables';
import BackgroundImage from './BackgroundImage';
import Footer from './Footer';
import SignInPageContent from './SignInPageContent';
import scrollViewContentContainerStyles from './signInPageStyles';

const propTypes = {
    /** The children to show inside the layout */
    children: PropTypes.node.isRequired,

    /** Welcome text to show in the header of the form, changes depending
     * on form type (for example, sign in) */
    welcomeText: PropTypes.string.isRequired,

    /** Welcome header to show in the header of the form, changes depending
     * on form type (for example, sign in) and small vs large screens */
    welcomeHeader: PropTypes.string.isRequired,

    /** Whether to show welcome text on a particular page */
    shouldShowWelcomeText: PropTypes.bool.isRequired,

    /** Whether to show welcome header on a particular page */
    shouldShowWelcomeHeader: PropTypes.bool.isRequired,

    /** A reference so we can expose scrollPageToTop */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    /** Whether or not the sign in page is being rendered in the RHP modal */
    shouldShowSmallScreen: PropTypes.bool,

    /** Override the green headline copy */
    customHeadline: PropTypes.string,

    /** Override the smaller hero body copy below the headline */
    customHeroBody: PropTypes.string,

    ...withLocalizePropTypes,
};

const defaultProps = {
    innerRef: () => {},
    shouldShowSmallScreen: false,
    customHeadline: '',
    customHeroBody: '',
};

function SignInPageLayout(props) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const scrollViewRef = useRef();
    const prevPreferredLocale = usePrevious(props.preferredLocale);
    let containerStyles = [styles.flex1, styles.signInPageInner];
    let contentContainerStyles = [styles.flex1, styles.flexColumn];
    const {windowWidth, windowHeight, isSmallScreenWidth, isMediumScreenWidth} = useWindowDimensions();

    // To scroll on both mobile and web, we need to set the container height manually
    const containerHeight = windowHeight - props.insets.top - props.insets.bottom;

    if (props.shouldShowSmallScreen) {
        containerStyles = [styles.flex1];
        contentContainerStyles = [styles.flex1, styles.flexColumn];
    }

    const scrollPageToTop = (animated = false) => {
        if (!scrollViewRef.current) {
            return;
        }
        scrollViewRef.current.scrollTo({y: 0, animated});
    };

    useImperativeHandle(props.innerRef, () => ({
        scrollPageToTop,
    }));

    useEffect(() => {
        if (prevPreferredLocale !== props.preferredLocale) {
            return;
        }

        scrollPageToTop();
    }, [props.welcomeHeader, props.welcomeText, prevPreferredLocale, props.preferredLocale]);

    const scrollViewStyles = useMemo(() => scrollViewContentContainerStyles(styles), [styles]);
    const signFormContainerStyle = useMemo(
        () => (isSmallScreenWidth ? [styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter] : [styles.flex1, styles.alignItemsEnd, styles.justifyContentCenter, styles.pr25]),
        [isSmallScreenWidth, styles],
    );

    const signFormContent = (
        <View style={signFormContainerStyle}>
            <SignInPageContent
                welcomeHeader={props.welcomeHeader}
                welcomeText={props.welcomeText}
                shouldShowWelcomeText={props.shouldShowWelcomeText}
                shouldShowWelcomeHeader={props.shouldShowWelcomeHeader}
                shouldShowSmallScreen={props.shouldShowSmallScreen}
            >
                {props.children}
            </SignInPageContent>
        </View>
    );
    let pageLayoutView = null;

    if (isSmallScreenWidth) {
        pageLayoutView = (
            <View style={[styles.flex1]}>
                {/* Top Section */}
                <View style={[styles.flex1]}>
                    {/* Left container */}
                    {signFormContent}
                </View>
            </View>
        );
    } else {
        pageLayoutView = (
            <View style={[styles.flex1]}>
                {/* Top Section */}
                <View style={[styles.flex1, styles.flexRow]}>
                    {/* Left container */}
                    {signFormContent}
                    {/* Right container */}
                    <View style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter]}>
                        <View
                            style={[
                                styles.alignSelfStart,
                                StyleUtils.getMaximumWidth(variables.signInContentMaxWidth),
                                props.isMediumScreenWidth ? styles.ph10 : {},
                                props.isLargeScreenWidth ? styles.ph25 : {},
                            ]}
                        >
                            <SignInPageHero
                                customHeadline={props.customHeadline}
                                customHeroBody={props.customHeroBody}
                            />
                        </View>
                    </View>
                </View>
                {/*  Bottom footer section */}
                <Footer scrollPageToTop={scrollPageToTop} />
            </View>
        );
    }

    return <View style={[styles.flex1]}>{pageLayoutView}</View>;
}

SignInPageLayout.propTypes = propTypes;
SignInPageLayout.displayName = 'SignInPageLayout';
SignInPageLayout.defaultProps = defaultProps;

const SignInPageLayoutWithRef = forwardRef((props, ref) => (
    <SignInPageLayout
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        innerRef={ref}
    />
));

SignInPageLayoutWithRef.displayName = 'SignInPageLayoutWithRef';

export default compose(withSafeAreaInsets, withLocalize)(SignInPageLayoutWithRef);
