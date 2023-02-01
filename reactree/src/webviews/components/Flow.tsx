import * as React from "react";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from "reactflow";

const Flow = ({ data, initialEdges }: any) => {
  useEffect(() => {
    if (data) {
      setNodes(data);
    }
    if (initialEdges) {
      setEdges(initialEdges);
    }
  }, [data]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="tree_view">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        // nodeTypes={nodeTypes}
      />
    </div>
  );
};

export default Flow;
