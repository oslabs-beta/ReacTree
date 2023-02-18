import React, { ElementType, HTMLAttributes } from 'react';
export interface CListGroupProps extends HTMLAttributes<HTMLDivElement | HTMLUListElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: string | ElementType;
    /**
     * Remove some borders and rounded corners to render list group items edge-to-edge in a parent component (e.g., `<CCard>`).
     */
    flush?: boolean;
    /**
     * Specify a layout type.
     */
    layout?: 'horizontal' | 'horizontal-sm' | 'horizontal-md' | 'horizontal-lg' | 'horizontal-xl' | 'horizontal-xxl';
}
export declare const CListGroup: React.ForwardRefExoticComponent<CListGroupProps & React.RefAttributes<HTMLDivElement | HTMLUListElement>>;
