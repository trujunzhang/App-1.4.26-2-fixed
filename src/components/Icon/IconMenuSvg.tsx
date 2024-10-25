import React from 'react';
import Svg, {Path} from 'react-native-svg';

type IconMenuSvgProps = {
    /** The width of the icon. */
    width?: number;

    /** The height of the icon. */
    height?: number;

    /** The fill color for the icon. Can be hex, rgb, rgba, or valid react-native named color such as 'red' or 'blue'. */
    fill?: string;
};

function IconMenuSvg({width, height, fill}: IconMenuSvgProps) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 32 25"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M2 2.5H30"
                stroke={fill}
                strokeWidth={3.82799}
                strokeMiterlimit={10}
                strokeLinecap="round"
            />
            <Path
                d="M2 12.5H30"
                stroke={fill}
                strokeWidth={3.82799}
                strokeMiterlimit={10}
                strokeLinecap="round"
            />
            <Path
                d="M2 22.5H30"
                stroke={fill}
                strokeWidth={3.82799}
                strokeMiterlimit={10}
                strokeLinecap="round"
            />
        </Svg>
    );
}

export default IconMenuSvg;
