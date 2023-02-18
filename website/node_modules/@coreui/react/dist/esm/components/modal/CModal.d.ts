import React, { HTMLAttributes } from 'react';
export interface CModalProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Align the modal in the center or top of the screen.
     */
    alignment?: 'top' | 'center';
    /**
     * Apply a backdrop on body while modal is open.
     */
    backdrop?: boolean | 'static';
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * @ignore
     */
    duration?: number;
    /**
     * Set modal to covers the entire user viewport.
     */
    fullscreen?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    /**
     * Closes the modal when escape key is pressed.
     */
    keyboard?: boolean;
    /**
     * Callback fired when the component requests to be closed.
     */
    onClose?: () => void;
    /**
     * Callback fired when the component requests to be closed.
     */
    onClosePrevented?: () => void;
    /**
     * Callback fired when the modal is shown, its backdrop is static and a click outside the modal or an escape key press is performed with the keyboard option set to false.
     */
    onShow?: () => void;
    /**
     * Generates modal using createPortal.
     */
    portal?: boolean;
    /**
     * Create a scrollable modal that allows scrolling the modal body.
     */
    scrollable?: boolean;
    /**
     * Size the component small, large, or extra large.
     */
    size?: 'sm' | 'lg' | 'xl';
    /**
     * Remove animation to create modal that simply appear rather than fade in to view.
     */
    transition?: boolean;
    /**
     * By default the component is unmounted after close animation, if you want to keep the component mounted set this property to false.
     */
    unmountOnClose?: boolean;
    /**
     * Toggle the visibility of modal component.
     */
    visible?: boolean;
}
interface ModalContextProps {
    visible?: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
export declare const CModalContext: React.Context<ModalContextProps>;
export declare const CModal: React.ForwardRefExoticComponent<CModalProps & React.RefAttributes<HTMLDivElement>>;
export {};
