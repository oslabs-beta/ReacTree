import React, { ElementType, HTMLAttributes } from 'react';
export interface CNavbarNavProps extends HTMLAttributes<HTMLDivElement | HTMLUListElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: string | ElementType;
}
export declare const CNavbarNav: React.ForwardRefExoticComponent<CNavbarNavProps & React.RefAttributes<HTMLDivElement | HTMLUListElement>>;
