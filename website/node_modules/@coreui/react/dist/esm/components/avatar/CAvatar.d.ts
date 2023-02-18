import React, { HTMLAttributes } from 'react';
import { Colors, Shapes, TextColors } from '../Types';
export interface CAvatarProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    color?: Colors;
    /**
     * Select the shape of the component.
     *
     * @type 'rounded' | 'rounded-top' | 'rounded-end' | 'rounded-bottom' | 'rounded-start' | 'rounded-circle' | 'rounded-pill' | 'rounded-0' | 'rounded-1' | 'rounded-2' | 'rounded-3' | string
     */
    shape?: Shapes;
    /**
     * Size the component small, large, or extra large.
     */
    size?: string;
    /**
     * The src attribute for the img element.
     */
    src?: string;
    /**
     * Sets the color context of the status indicator to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    status?: Colors;
    /**
     * Sets the text color of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'white' | 'muted' | 'high-emphasis' | 'medium-emphasis' | 'disabled' | 'high-emphasis-inverse' | 'medium-emphasis-inverse' | 'disabled-inverse' | string
     */
    textColor?: TextColors;
}
export declare const CAvatar: React.ForwardRefExoticComponent<CAvatarProps & React.RefAttributes<HTMLDivElement>>;
