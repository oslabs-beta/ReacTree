import * as React from 'react';
import { useEffect, useState } from 'react';
// import { Node, Edge } from 'reactflow';
// import 'reactflow/dist/style.css';

// component imports
// import Navbar from './Navbar';
// import Flow from './Flow';

// image imports
// import Redux from '../../../media/Redux.png';
// import CIcon from '@coreui/icons-react';
// import { cibRedux, cilInfo } from '@coreui/icons';

interface vscode {
  postMessage(message: any): void;
}
// declare function acquireVsCodeApi(): vscode;
declare const vscode: vscode;

interface SidebarProps {
  initialNodes: any;
  initialEdges: any[];
  // initialEdges: Edge[];
  viewData: any;
}

const Sidebar = () => {
  // state variables for the incomimg treeData, parsed viewData, user's settings, and the root file name
  const [treeData, setTreeData]: any = useState();
  const [viewData, setViewData]: any = useState();
  const [settings, setSettings]: any =
    useState();
  const [rootFile, setRootFile]: [string | undefined, Function] = useState();
  const [showProps, setShowProps]: [boolean, Function] = useState(false);

  // useEffect whenever the Sidebar is rendered
  useEffect(() => {
    // Event Listener for 'message' from the extension
    window.addEventListener('message', (event) => {
      const message = event.data;
      switch (message.type) {
        // Listener to receive the tree data, update navbar and tree view
        case 'parsed-data': {
          setRootFile(message.value.fileName);
          setTreeData([message.value]);
          // console.log('HERE', treeData);
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

  const handleProps = () => {
    setShowProps(!showProps);
  };

  // Separate useEffect that gets triggered when the treeData and settings state variables get updated
  useEffect(() => {
    if (treeData && settings) {
      // Invoke parser to parse based on user's settings
      parseViewTree();
    }
  }, [treeData, settings]);

  // initialize iniialialNodes for ReactFlow setup
  const initialNodes: any[] = [];
  let id = 0;

  // creates nodes for the initialNodes array
  const getNodes = (tree: any) => {
    if (!tree) {
      return;
    }
    tree.forEach((item: any) => {
      const node: any = {
        id: (++id).toString(),
        data: {
          // if the item has props, show them on each div
          label: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  alignSelf: 'flex-end',
                  marginTop: '-3px',
                  marginRight: '-3px',
                }}
              >
                {/* {item.reduxConnect && (
                  <CIcon icon={cibRedux} width={12} height={12} />
                )} */}
                {/* {Object.keys(item.props).length > 0 && (
                  <CIcon
                    onClick={handleProps}
                    icon={cilInfo}
                    width={12}
                    height={12}
                    style={{ cursor: 'pointer', color: '#003f8e' }}
                  />
                )} */}
              </div>
              <p
                style={{
                  fontWeight: 800,
                  marginBottom: '0.5em',
                  textAlign: 'center',
                  color: item.depth === 0 ? 'white' : 'black',
                }}
              >
                {item.fileName}
              </p>
              {Object.keys(item.props).length > 0 && showProps && (
                <>
                  <hr style={{ width: '75%', margin: '0.25em 0' }} />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      marginRight: '18px',
                    }}
                  >
                    {Object.keys(item.props).map((prop: any, idx: number) => (
                      <div key={idx} style={{ margin: '0 0.5em' }}>
                        &#8226; {prop}
                      </div>
                    ))}
                  </div>
                </>
              )}
              <button
                style={{
                  marginTop: '0.25em',
                  backgroundColor: item.depth === 0 ? 'white' : '#003f8e',
                  color: item.depth === 0 ? 'black' : 'white',
                  padding: '0.5em 1em',
                  borderRadius: '5px',
                }}
                onClick={() => viewFile(item.filePath)}
              >
                File
              </button>
            </div>
          ),
        },
        position: { x: 0, y: 0 },
        type: item.depth === 0 ? 'input' : '',
        style: {
          backgroundColor: item.depth === 0 ? '#003f8e' : 'white',
          borderRadius: '5px',
        },
      };
      initialNodes.push(node);
      if (item.children) {
        getNodes(item.children);
      }
    });
  };

  //initialEdges test
  const initialEdges: any[] = [];
  // const initialEdges: Edge[] = [];
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
  console.log('EDGES', initialEdges);
  // Render section
  return (
    <div className="sidebar">
      {/* <Navbar rootFile={rootFile} /> */}
      <hr className="line_break" />
      {/* <Flow initialNodes={initialNodes} initialEdges={initialEdges} /> */}
    </div>
  );
};

export default Sidebar