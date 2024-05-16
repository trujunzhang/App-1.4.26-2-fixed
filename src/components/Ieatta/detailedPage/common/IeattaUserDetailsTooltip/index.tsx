import React from 'react';
import BaseIeattaUserDetailsTooltip from './BaseIeattaUserDetailsTooltip';
import type IeattaUserDetailsTooltipProps from './types';

function IeattaUserDetailsTooltip({children, ...props}: IeattaUserDetailsTooltipProps) {
    return (
        <BaseIeattaUserDetailsTooltip
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            {children}
        </BaseIeattaUserDetailsTooltip>
    );
}

IeattaUserDetailsTooltip.displayName = 'UserDetailsTooltip';

export default IeattaUserDetailsTooltip;
