const React = require('react');
const ReactDOM = require('react-dom');

import { useCallback } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionLineType,
  Edge,
} from 'reactflow';
import './style.css';
import * as dagre from 'dagre';
import './dagre.css';

interface vscode {
  postMessage(message: any): void;
}
// declare function acquireVsCodeApi(): vscode;
declare const vscode: vscode;

const sendMessage = () => {
  console.log('button clicked')
  vscode.postMessage({ command: 'testing' });
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <div>
          <strong>hello</strong>
          <div>sadfsdf</div>
        </div>
      ),
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 0, y: 0 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 0, y: 0 },
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 0, y: 0 },
    type: 'custom',
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    animated: true,
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
    animated: false,
  },
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
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

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [buttonText, setButtonText] = React.useState('The brain is pending');
  const [parsedData, setParsedData] = React.useState('');

  const onConnect = useCallback(
    (params: Edge<any> | Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );
  const onLayout = useCallback(
    (direction: string | undefined) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  React.useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data; // The json data that the extension sent
      switch (message.command) {
        case 'refactor':
          setButtonText('The brain is working');
          break;
        case 'parsed-data':
          setParsedData(message.value);
          console.log(message.value);
          break;
      }
    });
  });

  const fileMessage = (e: any) => {
    const filePath = e.target.files[0].path;
    // Reset event target value to null so the same file selection causes onChange event to trigger
    e.target.value = null;
    if (filePath) {
      vscode.postMessage({
        command: 'onFile',
        value: filePath,
      });
    }
  };

  return (
    <div className="panel">
      <input type="file" name="file" id="file" className="inputfile" onChange={(e) => {fileMessage(e);}}/>
      <div className="layoutflow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        />
        <div className="controls">
          <button onClick={() => onLayout('TB')}>vertical layout</button>
          <button onClick={() => onLayout('LR')}>horizontal layout</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
