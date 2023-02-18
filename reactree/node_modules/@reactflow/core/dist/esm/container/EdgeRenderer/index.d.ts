import { ReactNode } from 'react';
import { GraphViewProps } from '../GraphView';
type EdgeRendererProps = Pick<GraphViewProps, 'edgeTypes' | 'onEdgeClick' | 'onEdgeDoubleClick' | 'defaultMarkerColor' | 'onlyRenderVisibleElements' | 'onEdgeUpdate' | 'onEdgeContextMenu' | 'onEdgeMouseEnter' | 'onEdgeMouseMove' | 'onEdgeMouseLeave' | 'onEdgeUpdateStart' | 'onEdgeUpdateEnd' | 'edgeUpdaterRadius' | 'noPanClassName' | 'elevateEdgesOnSelect' | 'rfId' | 'disableKeyboardA11y'> & {
    elevateEdgesOnSelect: boolean;
    children: ReactNode;
};
declare const _default: import("react").MemoExoticComponent<{
    ({ defaultMarkerColor, onlyRenderVisibleElements, elevateEdgesOnSelect, rfId, edgeTypes, noPanClassName, onEdgeUpdate, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onEdgeClick, edgeUpdaterRadius, onEdgeDoubleClick, onEdgeUpdateStart, onEdgeUpdateEnd, children, }: EdgeRendererProps): JSX.Element | null;
    displayName: string;
}>;
export default _default;
//# sourceMappingURL=index.d.ts.map