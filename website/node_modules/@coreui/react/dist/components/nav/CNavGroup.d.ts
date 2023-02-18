import React, { ReactNode } from 'react';
export interface CNavGroupProps {
    children?: ReactNode;
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Make nav group more compact by cutting all `padding` in half.
     */
    compact?: boolean;
    /**
     * Set group toggler label.
     */
    toggler?: string | ReactNode;
    /**
     * Show nav group items.
     */
    visible?: boolean;
    /**
     * @ignore
     */
    idx?: string;
}
export declare const CNavGroup: React.ForwardRefExoticComponent<CNavGroupProps & React.RefAttributes<HTMLLIElement>>;
