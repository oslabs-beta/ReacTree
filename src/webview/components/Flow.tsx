import * as React from 'react';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import PIcon from '@mui/icons-material/LocalParking';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  Controls,
} from 'reactflow';
import * as dagre from 'dagre';

import 'reactflow/dist/style.css';
import '../dagre.css';

const Flow = ({ initialNodes, initialEdges, handleAllProps}: any) => {  
  const addNewTools = () => {
    const extraButton1 = document.createElement('button');
    const extraButton2 = document.createElement('button');

    extraButton1.setAttribute('type', 'button');
    extraButton2.setAttribute('type', 'button');

    extraButton1.setAttribute('class', 'react-flow__controls-button react-flow__controls-interactive');
    extraButton2.setAttribute('class', 'react-flow__controls-button react-flow__controls-interactive');

    const toolbar = document.getElementsByClassName('react-flow__panel react-flow__controls bottom left');
    toolbar[0].appendChild(extraButton1);
    toolbar[0].appendChild(extraButton2);
  };
  const [showAllProps, setShowAllProps]: [boolean, Function] = useState(false);
  const [vertical, setVertical] = useState(true);

  useEffect(() => {
    setTimeout(addNewTools, 5);
  }, []);
  
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 250;
  const nodeHeight = 120;
  const [disabled, setDisabled]: any = useState(false);

  const getLayoutedElements = (
    nodes: any[],
    edges: any[],
    direction = 'TB'
  ) => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? 'left' : 'top';
      node.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
      return node;
    });
    return { nodes, edges };
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  useEffect(() => {
    if (initialNodes) {
      setNodes(initialNodes);
    }
    if (initialEdges) {
      setEdges(initialEdges);
    }
  }, [initialNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );
  
  const onLayout = useCallback(
    (direction) => {
      setDisabled(!disabled);
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <div className="tree_view" >
      <div className="layoutflow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        >
        <Controls style={{ borderRadius: '50px',}} /> 
        </ReactFlow>
        {
        vertical ?  
          <button type='button' className='customToolbarButton react-flow__controls-button react-flow__controls-interactive' onClick={() => {
            onLayout('LR')
            setVertical(!vertical)
          }}>
            <SwapHorizRoundedIcon htmlColor='var(--vscode-foreground)' sx={{ fontSize: 35 }}  />
          </button>
          :
          <button type='button' className='customToolbarButton react-flow__controls-button react-flow__controls-interactive' onClick={() => {
            onLayout('TB')
            setVertical(!vertical)
          }}>
            <SwapVertRoundedIcon htmlColor='var(--vscode-foreground)' sx={{ fontSize: 35 }}  />
          </button>
        }
        {
          showAllProps ? 
            <button type='button' className='customToolbarButton2 customToolbarButton react-flow__controls-button react-flow__controls-interactive' onClick={() => {
              handleAllProps('none');
              setShowAllProps(!showAllProps);
            }}>
              <PIcon htmlColor='var(--vscode-settings-focusedRowBorder)' sx={{ fontSize: 25 }} />
            </button>
          :
          <button type='button' className='customToolbarButton2 customToolbarButton react-flow__controls-button react-flow__controls-interactive' onClick={() => {
            handleAllProps('block');
            setShowAllProps(!showAllProps);
          }}>
              <PIcon color='disabled' sx={{ fontSize: 25 }}  />
            </button>
        }
      </div>
    </div>
  );
};

export default Flow;