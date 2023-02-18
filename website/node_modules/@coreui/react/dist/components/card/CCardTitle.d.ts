import React, { ElementType, HTMLAttributes } from 'react';
export interface CCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: string | ElementType;
}
export declare const CCardTitle: React.ForwardRefExoticComponent<CCardTitleProps & React.RefAttributes<HTMLHeadingElement>>;
