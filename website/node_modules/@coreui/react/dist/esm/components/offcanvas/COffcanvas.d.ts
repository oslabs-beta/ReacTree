import React, { HTMLAttributes } from 'react';
export interface COffcanvasProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Apply a backdrop on body while offcanvas is open.
     */
    backdrop?: boolean;
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Closes the offcanvas when escape key is pressed [docs]
     */
    keyboard?: boolean;
    /**
     * Callback fired when the component requests to be hidden.
     */
    onHide?: () => void;
    /**
     * Callback fired when the component requests to be shown.
     */
    onShow?: () => void;
    /**
     * Components placement, there’s no default placement.
     */
    placement: 'start' | 'end' | 'top' | 'bottom';
    /**
     * Generates modal using createPortal.
     */
    portal?: boolean;
    /**
     * Allow body scrolling while offcanvas is open
     */
    scroll?: boolean;
    /**
     * Toggle the visibility of offcanvas component.
     */
    visible?: boolean;
}
export declare const COffcanvas: React.ForwardRefExoticComponent<COffcanvasProps & React.RefAttributes<HTMLDivElement>>;
