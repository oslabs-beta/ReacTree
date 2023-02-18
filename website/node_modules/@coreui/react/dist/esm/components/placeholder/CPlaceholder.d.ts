import React, { ElementType, HTMLAttributes } from 'react';
import { Colors } from '../Types';
export interface CPlaceholderProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Set animation type to better convey the perception of something being actively loaded.
     */
    animation?: 'glow' | 'wave';
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
     * Size the component extra small, small, or large.
     */
    size?: 'xs' | 'sm' | 'lg';
    /**
     * The number of columns on extra small devices (<576px).
     */
    xs?: number;
    /**
     * The number of columns on small devices (<768px).
     */
    sm?: number;
    /**
     * The number of columns on medium devices (<992px).
     */
    md?: number;
    /**
     * The number of columns on large devices (<1200px).
     */
    lg?: number;
    /**
     * The number of columns on X-Large devices (<1400px).
     */
    xl?: number;
    /**
     * The number of columns on XX-Large devices (≥1400px).
     */
    xxl?: number;
}
export declare const CPlaceholder: React.ForwardRefExoticComponent<CPlaceholderProps & React.RefAttributes<HTMLSpanElement>>;
