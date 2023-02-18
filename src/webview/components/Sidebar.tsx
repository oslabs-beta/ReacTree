import * as React from "react";
import { useEffect, useState } from "react";
import { Node, Edge } from "reactflow";
import Button from '@mui/material/Button';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import Badge from '@mui/material/Badge';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import InfoIcon from '@mui/icons-material/Info';

import Flow from './Flow';
import Navbar from './Navbar';

import CIcon from "@coreui/icons-react";
import { cibRedux, cilInfo, cilZoom } from "@coreui/icons";
import { types } from "util";
import { borderBottom, fontSize, padding } from "@mui/system";

interface vscode {
  postMessage(message: any): void;
}
// declare function acquireVsCodeApi(): vscode;
declare const vscode: vscode;

interface SidebarProps {
  initialNodes: any;
  initialEdges: Edge<any>[];
  viewData: any;
}

const Sidebar = () => {
  // state variables for the incomimg treeData, parsed viewData, user's settings, and the root file name
  const [treeData, setTreeData]: any = useState();
  const [viewData, setViewData]: any = useState();
  const [settings, setSettings]: [{ [key: string]: boolean }, Function] =
    useState();
  const [rootFile, setRootFile]: [string | undefined, Function] = useState();
  const [showProps, setShowProps]: [boolean, Function] = useState(false);
  // const [showRender, setShowRender]: [boolean, Function] = useState(false);
  const [showPropsStatus, setShowPropsStatus]: [any, Function] = useState({});
  const [showAllProps, setShowAllProps]: any = useState(false);

  useEffect(() => {
    // Event Listener for 'message' from the extension
    window.addEventListener('message', (event) => {
      const message = event.data;
      switch (message.type) {
        // Listener to receive the tree data, update navbar and tree view
        case 'parsed-data': {
          console.log('BEFORE HERE ', message.value);
          let data = [];
          data.push(message.value);
          console.log('DATA ', data);
          setRootFile(message.value.fileName);
          setSettings(message.settings);
          setTreeData(data);
          console.log('HERE', treeData);
          break;
        }
        // Listener to receive the user's settings
        case 'settings-data': {
          setSettings(message.value);
          break;
        }
      }
    });

    // Post message to the extension whenever sapling is opened
    vscode.postMessage({
      type: 'onReacTreeVisible',
      value: null,
    });

    // Post message to the extension for the user's settings whenever sapling is opened
    vscode.postMessage({
      type: 'onSettingsAcquire',
      value: null,
    });
    // console.log('HERE', viewData);
  }, []);

  const viewFile = (file: any) => {
    // Edge case to verify that there is in fact a file path for the current node
    if (file) {
      vscode.postMessage({
        type: 'onViewFile',
        value: file,
      });
    }
  };
  // toggle prop icon on/off
  // const handleProps = () => {
  //   setShowProps(!showProps);
  // };

  // // toggle render icon on/off
  // const openRender = () => {
  //   setShowRender(true);
  // };

  // const closeRender = () => {
  //   setShowRender(false);
  // };

  // Separate useEffect that gets triggered when the treeData and settings state variables get updated
  useEffect(() => {
    if (treeData && settings) {
      // Invoke parser to parse based on user's settings
      parseViewTree();
    }
  }, [treeData, settings]);

  // initialize iniialialNodes for ReactFlow setup
  const initialNodes: Node[] = [];
  let id = 0;
  const propsObj: any = {};
  // creates nodes for the initialNodes array
  const makePropsObj = (fileName: string) => {
    propsObj[fileName] = false;
    // setShowPropsStatus(propsObj);
  };

  const handleProps = (fileName: string) => {
    setShowPropsStatus({
      ...showPropsStatus,
      [fileName]: !showPropsStatus[fileName],
    });
    // setShowPropsStatus(propsObj)
    // propsObj[fileName] = !propsObj[fileName]
    // setShowPropsStatus(propsObj);
    // console.log("fileName", fileName)
    // console.log("AFTER CLICK", propsObj);
    console.log('AFTER CLICK STATE', showPropsStatus);
  };

  const sendFilePath = (item: any) => {
    console.log('FILEPATH', item.filepath);
    vscode.postMessage({
      type: 'onViewFileContent',
      value: item,
    });
  };


  const getNodes = (tree: any) => {
    if (!tree) {
      return;
    }

    tree.forEach((item: any) => {
      makePropsObj(item.fileName);
      
      const node = {
        id: (++id).toString(),
        data: {
          // if the item has props, show them on each div
          label: (
            // <Badge badgeContent={item.count} color="primary">
            <div className="nodeData">
              {/* for rendering modal to show live render of component */}
                {item.count > 1 && (
                  <Badge badgeContent={item.count}  sx={{
                    "& .MuiBadge-badge": {
                      color: "var(--vscode-button-foreground)",
                      backgroundColor: "var(--vscode-settings-focusedRowBorder)"
                    }
                  }}>
                  </Badge>
                )}

                

              <p className='nodeTitle'
                style={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  paddingBottom: '6px',
                  margin: "8px 0px 2px 0px",
                  textAlign: "center",
                  color: 'var(--vscode-foreground)',
                  fontSize: '22px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  borderBottom: "2px solid var(--vscode-settings-focusedRowBorder)"

                }}
              >
                {item.fileName}
              </p>
              {Object.keys(item.props).length > 0 &&
                (showPropsStatus[item.fileName] === true || showAllProps === true) && (
                  <>
                    <div
                      style={{
                        display: "block",
                        columnWidth: '112px',
                        fontSize: '11pt',
                        color: 'var(--vscode-foreground)',
                        borderBottom: "2px solid var(--vscode-settings-focusedRowBorder)",
                        padding: '4px 0px 6px 5px',
                        wordBreak: 'break-all'
                      }}
                    >
                      {Object.keys(item.props).map((prop: any, idx: number) => (
                        <div key={idx} style={{display: 'flex' }}>
                          &#8226;{prop}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              <div style={{justifyContent: 'space-between', display: 'flex', margin: '5px 0px'}}>
                <div className="nodeToolbar">
                  {Object.keys(item.props).length > 0 && (
                      <InfoIcon style={{ cursor: "pointer", padding: '0px 3px' }} htmlColor={'var(--vscode-foreground)'} sx={{ fontSize: 19 }} onClick={() => handleProps(item.fileName)}/>
                    )}
                    {item.children.length > 0 && <CloseFullscreenIcon style={{ cursor: "pointer", padding: '0px 3px' }} htmlColor={'var(--vscode-foreground)'} sx={{ fontSize: 19 }}/>}
                    <TextSnippetIcon style={{ cursor: "pointer", padding: '0px 3px' }} htmlColor={'var(--vscode-foreground)'} sx={{ fontSize: 19 }} onClick={() => viewFile(item.filePath)}/>
                    {/* <VisibilityIcon style={{ cursor: "pointer", padding: '0px 3px' }} htmlColor={'var(--vscode-foreground)'} sx={{ fontSize: 17 }}/> */}
                </div>
                <div className="nodeIndicators">
                  {item.reduxConnect && (
                    <CIcon icon={cibRedux} width={12} height={12}/>
                  )}
                </div>
              </div>
            </div>
          ),
        },
        onClick : () => handleProps(item.fileName),
        position: { x: 0, y: 0 },
        type: item.depth === 0 ? 'input' : '',
        style: {
          backgroundColor: "var(--vscode-dropdown-background)",
          borderRadius: "15px",
          width: '265px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          border: 'none', 
          padding: '10px 10px 3px 10px'
        },
      };
      initialNodes.push(node);
      if (item.children) {
        getNodes(item.children);
      }
    });
    console.log('initial nodes: ', initialNodes);
  };

  //initialEdges test
  const initialEdges: Edge[] = [];
  let ide = 0;

  const makeEdges = (tree: any, parentId?: any) => {
    if (!tree) {
      return;
    }
    tree.forEach((item: any) => {
      const nodeId = ++ide;
      if (parentId) {
        const edge = {
          id: `e${parentId}-${nodeId}`,
          source: parentId.toString(),
          target: nodeId.toString(),
          type: 'smoothstep',
          animated: false,
        };
        initialEdges.push(edge);
      }
      if (item.children) {
        makeEdges(item.children, nodeId);
      }
    });
  };

  // Edits and returns component tree based on users settings
  const parseViewTree = (): void => {
    // Deep copy of the treeData passed in
    const treeParsed = JSON.parse(JSON.stringify(treeData[0]));

    // Helper function for the recursive parsing
    const traverse = (node: any): void => {
      let validChildren = [];

      // Logic to parse the nodes based on the users settings
      for (let i = 0; i < node.children.length; i++) {
        if (
          node.children[i].thirdParty &&
          settings.thirdParty &&
          !node.children[i].reactRouter
        ) {
          validChildren.push(node.children[i]);
        } else if (node.children[i].reactRouter && settings.reactRouter) {
          validChildren.push(node.children[i]);
        } else if (
          !node.children[i].thirdParty &&
          !node.children[i].reactRouter
        ) {
          validChildren.push(node.children[i]);
        }
      }

      // Update children with only valid nodes, and recurse through each node
      node.children = validChildren;
      node.children.forEach((child: any) => {
        traverse(child);
      });
    };

    // Invoking the helper function
    traverse(treeParsed);
    // Update the vewData state
    setViewData([treeParsed]);
  };
  getNodes(viewData);

  makeEdges(viewData);

  // Render section
  return (
    <div className="sidebar">
      <Navbar rootFile={rootFile} />

      <Flow initialNodes={initialNodes} initialEdges={initialEdges} showAllProps={showAllProps} setShowAllProps={setShowAllProps} />
    </div>
  );
};

export default Sidebar;
