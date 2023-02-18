import React, { HTMLAttributes } from 'react';
export interface CCloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Toggle the disabled state for the component.
     */
    disabled?: boolean;
    /**
     * Change the default color to white.
     */
    white?: boolean;
}
export declare const CCloseButton: React.ForwardRefExoticComponent<CCloseButtonProps & React.RefAttributes<HTMLButtonElement>>;
