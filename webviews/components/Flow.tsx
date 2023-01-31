import * as React from 'react';
import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from 'reactflow';

const Flow = ({ data }: any) => {
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: false },
  ];

  useEffect(() => {
    if (data) {
      setNodes(data);
    }
  }, [data]);

  // const populate = () => {
  //   setNodes(data);
  // };

  // populate();

  // console.log('FLOW', data);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  console.log('NODES', nodes);
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
