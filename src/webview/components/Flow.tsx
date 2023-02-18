import * as React from 'react';
import * as ReactDOM from "react-dom";
import Navbar from "./Navbar";
import { Button, IconButton } from '@mui/material';
import NextIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PIcon from '@mui/icons-material/LocalParking';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  MiniMap,
  Controls,
} from 'reactflow';
import * as dagre from 'dagre';

import 'reactflow/dist/style.css';
import '../dagre.css';
import { Diversity1Sharp } from '@mui/icons-material';

const Flow = ({ initialNodes, initialEdges, showAllProps, setShowAllProps, showPropsStatus, setShowPropsStatus, handleProps}: any) => {  

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 172;
  // const nodeHeight = 36;
  const nodeHeight = 120;
  const [disabled, setDisabled]: any = useState(false);
  const [appended, setAppended]: any = useState(false);

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

  // useEffect(() => {
  //   let divs = document.getElementsByClassName("react-flow__panel react-flow__controls bottom left")
  //   if(!appended && divs.length > 0){
  //     setAppended(true)
  //     for (let i = 0; i < divs.length; i++) {
  //       const id = Math.random().toString() //or some such identifier 
  //       const d = document.createElement("div")
  //       console.log("divs length: ", divs.length)
  //       d.id = id
  //       divs[i].appendChild(d)
  //       ReactDOM.render(<IconButton>
  //         <PIcon/>
  //       </IconButton>, document.getElementById(id))
  //     }
  //   }
  // }, [<Navbar/>])     

  function clearSelection() {
    
    const obj = {}
    //clear current selection
    for(let key in showPropsStatus){
      if(showPropsStatus[key] === true){
        obj[key] = false;
      }
    }
    setShowPropsStatus({
      ...showPropsStatus, 
      ...obj 
    });
    return;
  }

  useEffect(() => {  //incorporate async/await functionality similar to fetching in solo project
    if(!showAllProps){
      console.log(showPropsStatus)

      clearSelection()
      // const updatePropsStatus = async () => {
      //   for(let key in showPropsStatus){
      //     if(showPropsStatus[key] === true){
      //       console.log(showPropsStatus[key])
      //       await setShowPropsStatus({...showPropsStatus, [key]: !showPropsStatus[key]});
      //       // await handleProps(key);
      //       console.log(showPropsStatus[key])
      //     }
      //   }
      // }

      // updatePropsStatus();
      console.log(showPropsStatus)
      
    }
  },[showAllProps])

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
        <Controls style={{ borderRadius: '50px',}}/> 
        </ReactFlow>

        {/* <div className="controls" style={{ width: '100px' }}>
          <button className={disabled ? "show" : "hide"}
            onClick={() => onLayout('TB')}
            style={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '5px',
              // width: '80%',
            }}
          >
            vertical
          </button>
          <button className={disabled ? "hide" : "show"}
            onClick={() => onLayout('LR')}
            style={{
              backgroundColor: 'white', 
              color: 'black',
              borderRadius: '5px',
              position:'absolute',
              // paddingLeft: '2px',
              // marginTop: '2px',
            }}
          >
            horizontal
          </button> 
        </div> */}
      </div>
      <div className="controls" /*style={{ width: '100px' }}*/>
          <IconButton className={disabled ? "show" : "hide"}
            onClick={() => onLayout('TB')}
            style={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '0px',
              position:'absolute',
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
          <IconButton className={disabled ? "hide" : "show"}
            onClick={() => onLayout('LR')}
            style={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '0px',
              position:'absolute',
            }}
          >
            <NextIcon />
          </IconButton> 
      </div>
      
      <div className='allProps' 
         style={{ right:"0", 
         position:"absolute",
         borderRadius: '0px',
         backgroundColor: 'white'}}>
        <IconButton onClick={() => {
          if(showAllProps){
            /*setShowPropsStatus()*/
          }
          setShowAllProps(!showAllProps);
          }}>
          <PIcon/>
        </IconButton>
      </div>
    </div>
  );
};

export default Flow;