import React, { ElementType, HTMLAttributes } from 'react';
export interface CNavProps extends HTMLAttributes<HTMLDivElement | HTMLUListElement | HTMLOListElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: string | ElementType;
    /**
     * Specify a layout type for component.
     */
    layout?: 'fill' | 'justified';
    /**
     * Set the nav variant to tabs or pills.
     */
    variant?: 'tabs' | 'pills';
}
export declare const CNav: React.ForwardRefExoticComponent<CNavProps & React.RefAttributes<HTMLDivElement | HTMLOListElement | HTMLUListElement>>;
