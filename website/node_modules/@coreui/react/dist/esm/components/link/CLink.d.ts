import React, { AllHTMLAttributes, ElementType } from 'react';
export interface CLinkProps extends AllHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    /**
     * Toggle the active state for the component.
     */
    active?: boolean;
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: string | ElementType;
    /**
     * Toggle the disabled state for the component.
     */
    disabled?: boolean;
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href?: string;
}
export declare const CLink: React.ForwardRefExoticComponent<CLinkProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
