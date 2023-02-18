import React, { ElementType, HTMLAttributes } from 'react';
import { Colors, Shapes, TextColors } from '../Types';
export interface CBadgeProps extends HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
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
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: string | ElementType;
    /**
     * Position badge in one of the corners of a link or button.
     */
    position?: 'top-start' | 'top-end' | 'bottom-end' | 'bottom-start';
    /**
     * Select the shape of the component.
     *
     * @type 'rounded' | 'rounded-top' | 'rounded-end' | 'rounded-bottom' | 'rounded-start' | 'rounded-circle' | 'rounded-pill' | 'rounded-0' | 'rounded-1' | 'rounded-2' | 'rounded-3' | string
     */
    shape?: Shapes;
    /**
     * Size the component small.
     */
    size?: 'sm';
    /**
     * Sets the text color of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'white' | 'muted' | 'high-emphasis' | 'medium-emphasis' | 'disabled' | 'high-emphasis-inverse' | 'medium-emphasis-inverse' | 'disabled-inverse' | string
     */
    textColor?: TextColors;
}
export declare const CBadge: React.ForwardRefExoticComponent<CBadgeProps & React.RefAttributes<HTMLDivElement | HTMLSpanElement>>;
