import React, { ElementType, LabelHTMLAttributes } from 'react';
export interface CInputGroupTextProps extends LabelHTMLAttributes<HTMLLabelElement | HTMLSpanElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: string | ElementType;
}
export declare const CInputGroupText: React.ForwardRefExoticComponent<CInputGroupTextProps & React.RefAttributes<HTMLLabelElement | HTMLSpanElement>>;
