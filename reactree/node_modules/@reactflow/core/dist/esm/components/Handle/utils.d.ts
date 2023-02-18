import { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { ConnectionMode, ConnectionStatus } from '../../types';
import type { Connection, HandleType, XYPosition, Node, NodeHandleBounds } from '../../types';
export type ConnectionHandle = {
    id: string | null;
    type: HandleType;
    nodeId: string;
    x: number;
    y: number;
};
export type ValidConnectionFunc = (connection: Connection) => boolean;
export declare function getHandles(node: Node, handleBounds: NodeHandleBounds, type: HandleType, currentHandle: string): ConnectionHandle[];
export declare function getClosestHandle(pos: XYPosition, connectionRadius: number, handles: ConnectionHandle[]): ConnectionHandle | null;
type Result = {
    handleDomNode: Element | null;
    isValid: boolean;
    connection: Connection;
};
export declare function isValidHandle(event: MouseEvent | TouchEvent | ReactMouseEvent | ReactTouchEvent, handle: Pick<ConnectionHandle, 'nodeId' | 'id' | 'type'> | null, connectionMode: ConnectionMode, fromNodeId: string, fromHandleId: string | null, fromType: string, isValidConnection: ValidConnectionFunc, doc: Document | ShadowRoot): Result;
type GetHandleLookupParams = {
    nodes: Node[];
    nodeId: string;
    handleId: string | null;
    handleType: string;
};
export declare function getHandleLookup({ nodes, nodeId, handleId, handleType }: GetHandleLookupParams): ConnectionHandle[];
export declare function getHandleType(edgeUpdaterType: HandleType | undefined, handleDomNode: Element | null): HandleType | null;
export declare function resetRecentHandle(handleDomNode: Element): void;
export declare function getConnectionStatus(isInsideConnectionRadius: boolean, isHandleValid: boolean): ConnectionStatus;
export {};
//# sourceMappingURL=utils.d.ts.map