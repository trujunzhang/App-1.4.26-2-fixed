import type {AvatarSource} from '@libs/UserUtils';
import type {AvatarType} from '@src/types/onyx/OnyxCommon';
import type ChildrenProps from '@src/types/utils/ChildrenProps';

type FallbackUserDetails = {
    /** The name to display in bold */
    displayName?: string;

    /** The login for the tooltip fallback */
    login?: string;

    /** The avatar for the tooltip fallback */
    avatar?: AvatarSource;

    /** Denotes whether it is an avatar or a workspace avatar */
    type?: AvatarType;
};

type Icon = {
    /** Source for the avatar. Can be a URL or an icon. */
    source?: AvatarSource;

    /** A fallback avatar icon to display when there is an error on loading avatar from remote URL.
     * If the avatar is type === workspace, this fallback icon will be ignored and decided based on the name prop.
     */
    fallbackIcon?: AvatarSource;

    /** Denotes whether it is an avatar or a workspace avatar */
    type?: AvatarType;

    /** Owner of the avatar. If user, displayName. If workspace, policy name */
    name?: string;
};

type IeattaUserDetailsTooltipProps = ChildrenProps & {
    userId: string;
};

export default IeattaUserDetailsTooltipProps;
