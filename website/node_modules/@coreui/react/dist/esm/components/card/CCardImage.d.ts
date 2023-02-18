import React, { ElementType, ImgHTMLAttributes } from 'react';
export interface CCardImageProps extends ImgHTMLAttributes<HTMLImageElement | HTMLOrSVGElement | HTMLOrSVGImageElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: string | ElementType;
    /**
     * Optionally orientate the image to the top, bottom, or make it overlaid across the card.
     */
    orientation?: 'top' | 'bottom';
}
export declare const CCardImage: React.ForwardRefExoticComponent<CCardImageProps & React.RefAttributes<HTMLOrSVGElement | HTMLOrSVGImageElement>>;
