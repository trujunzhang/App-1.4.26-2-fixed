import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import ExpensifyWordmark from '@components/ExpensifyWordmark';
import OfflineIndicator from '@components/OfflineIndicator';
import SignInPageForm from '@components/SignInPageForm';
import Text from '@components/Text';
import withLocalize, {withLocalizePropTypes} from '@components/withLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import compose from '@libs/compose';
import SignInHeroImage from '@pages/signin/SignInHeroImage';
import variables from '@styles/variables';

const propTypes = {
    /** The children to show inside the layout */
    children: PropTypes.node.isRequired,

    /** Welcome text to show in the header of the form, changes depending
     * on form type (for example, sign in) */
    welcomeText: PropTypes.string.isRequired,

    /** Welcome header to show in the header of the form, changes depending
     * on form type (for example. sign in) and small vs large screens */
    welcomeHeader: PropTypes.string.isRequired,

    /** Whether to show welcome text on a particular page */
    shouldShowWelcomeText: PropTypes.bool.isRequired,

    /** Whether to show welcome header on a particular page */
    shouldShowWelcomeHeader: PropTypes.bool.isRequired,

    /** Whether to show signIn hero image on a particular page */
    shouldShowSmallScreen: PropTypes.bool.isRequired,

    ...withLocalizePropTypes,
};

function SignInPageContent(props) {
    const {isSmallScreenWidth} = useWindowDimensions();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();

    return (
        <View>
            {isSmallScreenWidth ? (
                <View style={[styles.mb12]}>
                    <SignInHeroImage shouldShowSmallScreen />
                </View>
            ) : null}
            <View style={[isSmallScreenWidth ? styles.alignItemsCenter : styles.alignItemsStart]}>
                <View>
                    <Text
                        style={[
                            styles.loginHeroHeader,
                            StyleUtils.getLineHeightStyle(variables.lineHeightSignInHeroXSmall),
                            StyleUtils.getFontSizeStyle(variables.fontSizeSignInHeroXSmall),
                            !props.welcomeText ? styles.mb5 : {},
                            !isSmallScreenWidth ? styles.textAlignLeft : {},
                            styles.mb2,
                        ]}
                    >
                        {props.welcomeHeader}
                    </Text>
                    <Text style={[styles.loginHeroBody, styles.mb2, styles.textNormal, !isSmallScreenWidth ? styles.textAlignLeft : {}]}>{props.welcomeText}</Text>
                </View>
                <View style={[styles.mt2, styles.alignItemsStart]}>
                    {props.children}
                    <OfflineIndicator style={[styles.m0, styles.p8, styles.alignItemsStart]} />
                </View>
            </View>
        </View>
    );
}

SignInPageContent.propTypes = propTypes;
SignInPageContent.displayName = 'SignInPageContent';

export default compose(withLocalize, withSafeAreaInsets)(SignInPageContent);
