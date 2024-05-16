import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import withWindowDimensions, {windowDimensionsPropTypes} from '@components/withWindowDimensions';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';
import SignInHeroCopy from './SignInHeroCopy';
import SignInHeroImage from './SignInHeroImage';

const propTypes = {
    /** Override the green headline copy */
    customHeadline: PropTypes.string,

    /** Override the smaller hero body copy below the headline */
    customHeroBody: PropTypes.string,

    ...windowDimensionsPropTypes,
};

const defaultProps = {
    customHeadline: '',
    customHeroBody: '',
};

function SignInPageHero(props) {
    const styles = useThemeStyles();
    const styleUtils = useStyleUtils();
    return (
        <View style={[props.windowWidth <= variables.tabletResponsiveWidthBreakpoint ? styles.flexColumn : styles.flexColumn, styles.pt20, styles.alignSelfCenter]}>
            <View style={[styles.alignSelfCenter]}>
                <SignInHeroImage />
            </View>
        </View>
    );
}

SignInPageHero.displayName = 'SignInPageHero';
SignInPageHero.propTypes = propTypes;
SignInPageHero.defaultProps = defaultProps;

export default withWindowDimensions(SignInPageHero);
