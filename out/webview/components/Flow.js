"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const reactflow_1 = require("reactflow");
const dagre = require("dagre");
require("reactflow/dist/style.css");
require("../dagre.css");
const Flow = ({ initialNodes, initialEdges }) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    const nodeWidth = 172;
    // const nodeHeight = 36;
    const nodeHeight = 120;
    const getLayoutedElements = (nodes, edges, direction = 'TB') => {
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
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
    (0, react_1.useEffect)(() => {
        if (initialNodes) {
            setNodes(initialNodes);
        }
        if (initialEdges) {
            setEdges(initialEdges);
        }
    }, [initialNodes]);
    const [nodes, setNodes, onNodesChange] = (0, reactflow_1.useNodesState)(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = (0, reactflow_1.useEdgesState)(layoutedEdges);
    const onConnect = (0, react_1.useCallback)((params) => setEdges((eds) => (0, reactflow_1.addEdge)(Object.assign(Object.assign({}, params), { type: reactflow_1.ConnectionLineType.SmoothStep, animated: true }), eds)), []);
    const onLayout = (0, react_1.useCallback)((direction) => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);
        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
    }, [nodes, edges]);
    return (React.createElement("div", { className: "tree_view" },
        React.createElement("div", { className: "layoutflow" },
            React.createElement(reactflow_1.default, { nodes: nodes, edges: edges, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, onConnect: onConnect, connectionLineType: reactflow_1.ConnectionLineType.SmoothStep, fitView: true },
                React.createElement(reactflow_1.Controls, { style: { borderRadius: '5px' } })),
            React.createElement("div", { className: "controls", style: { width: '100px' } },
                React.createElement("button", { onClick: () => onLayout('TB'), style: {
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: '5px',
                        // width: '80%',
                    } }, "vertical"),
                React.createElement("button", { onClick: () => onLayout('LR'), style: {
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: '5px',
                        paddingLeft: '2px',
                        marginTop: '2px',
                    } }, "horizontal")))));
};
exports.default = Flow;
//# sourceMappingURL=Flow.js.map