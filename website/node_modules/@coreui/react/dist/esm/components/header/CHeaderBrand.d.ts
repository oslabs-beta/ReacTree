import React, { ElementType, AnchorHTMLAttributes } from 'react';
export interface CHeaderBrandProps extends AnchorHTMLAttributes<HTMLAnchorElement | HTMLSpanElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: string | ElementType;
}
export declare const CHeaderBrand: React.ForwardRefExoticComponent<CHeaderBrandProps & React.RefAttributes<HTMLAnchorElement | HTMLSpanElement>>;
