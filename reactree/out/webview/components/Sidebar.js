"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const Flow_1 = require("./Flow");
const Navbar_1 = require("./Navbar");
const Modal_1 = require("./Modal");
const icons_react_1 = require("@coreui/icons-react");
const icons_1 = require("@coreui/icons");
const Sidebar = () => {
    // state variables for the incomimg treeData, parsed viewData, user's settings, and the root file name
    const [treeData, setTreeData] = (0, react_1.useState)();
    const [viewData, setViewData] = (0, react_1.useState)();
    const [settings, setSettings] = (0, react_1.useState)();
    const [rootFile, setRootFile] = (0, react_1.useState)();
    const [showProps, setShowProps] = (0, react_1.useState)(false);
    // const [showRender, setShowRender]: [boolean, Function] = useState(false);
    const [showPropsStatus, setShowPropsStatus] = (0, react_1.useState)({});
    const [modalActive, setModalActive] = (0, react_1.useState)(false);
    const [fileContent, setFileContent] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
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
                case 'file-content': {
                    console.log('FROM BACKEND', message.value);
                    console.log('TYPE', typeof message.value);
                    setFileContent(message.value);
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
    const viewFile = (file) => {
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
    (0, react_1.useEffect)(() => {
        if (treeData && settings) {
            // Invoke parser to parse based on user's settings
            parseViewTree();
        }
    }, [treeData, settings]);
    // initialize iniialialNodes for ReactFlow setup
    const initialNodes = [];
    let id = 0;
    const propsObj = {};
    // creates nodes for the initialNodes array
    const makePropsObj = (fileName) => {
        propsObj[fileName] = false;
        // setShowPropsStatus(propsObj);
    };
    const handleProps = (fileName) => {
        setShowPropsStatus(Object.assign(Object.assign({}, showPropsStatus), { [fileName]: !showPropsStatus[fileName] }));
        // setShowPropsStatus(propsObj)
        // propsObj[fileName] = !propsObj[fileName]
        // setShowPropsStatus(propsObj);
        // console.log("fileName", fileName)
        // console.log("AFTER CLICK", propsObj);
        console.log('AFTER CLICK STATE', showPropsStatus);
    };
    const sendFilePath = (item) => {
        console.log('FILEPATH', item.filepath);
        vscode.postMessage({
            type: 'onViewFileContent',
            value: item,
        });
    };
    const handleModal = () => {
        setModalActive(!modalActive);
    };
    const getNodes = (tree) => {
        if (!tree) {
            return;
        }
        tree.forEach((item) => {
            makePropsObj(item.fileName);
            const node = {
                id: (++id).toString(),
                data: {
                    // if the item has props, show them on each div
                    label: (React.createElement("div", { style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        } },
                        React.createElement("div", { style: { alignSelf: 'flex-end' } },
                            item.reduxConnect && (React.createElement(icons_react_1.default, { icon: icons_1.cibRedux, width: 12, height: 12 })),
                            Object.keys(item.props).length > 0 && (React.createElement(icons_react_1.default, { onClick: () => handleProps(item), 
                                // onClick={() => setShowProps(!showProps)}
                                icon: icons_1.cilInfo, width: 12, height: 12, style: { cursor: 'pointer', color: '#003f8e' } })),
                            React.createElement(icons_react_1.default, { onClick: () => {
                                    sendFilePath(item);
                                    handleModal();
                                }, icon: icons_1.cilZoom, width: 12, height: 12, style: {
                                    marginLeft: '0.25rem',
                                    color: '#003f8e',
                                    cursor: 'pointer',
                                } })),
                        React.createElement("p", { style: {
                                fontWeight: 800,
                                marginBottom: '0.5em',
                                textAlign: 'center',
                                color: item.depth === 0 ? 'white' : 'black',
                            } }, item.fileName),
                        Object.keys(item.props).length > 0 &&
                            showPropsStatus[item.fileName] === true && (React.createElement(React.Fragment, null,
                            React.createElement("hr", { style: { width: '75%', margin: '0.25em 0' } }),
                            React.createElement("div", { style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    marginRight: '18px',
                                } }, Object.keys(item.props).map((prop, idx) => (React.createElement("div", { key: idx, style: { margin: '0 0.5em' } },
                                "\u2022 ",
                                prop)))))),
                        React.createElement("button", { style: {
                                marginTop: '0.25em',
                                backgroundColor: item.depth === 0 ? 'white' : '#003f8e',
                                color: item.depth === 0 ? 'black' : 'white',
                                padding: '0.5em 1em',
                                borderRadius: '5px',
                            }, onClick: () => viewFile(item.filePath) }, "File"))),
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
        console.log('initial nodes: ', initialNodes);
    };
    //initialEdges test
    const initialEdges = [];
    let ide = 0;
    const makeEdges = (tree, parentId) => {
        if (!tree) {
            return;
        }
        tree.forEach((item) => {
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
    const parseViewTree = () => {
        // Deep copy of the treeData passed in
        const treeParsed = JSON.parse(JSON.stringify(treeData[0]));
        // Helper function for the recursive parsing
        const traverse = (node) => {
            let validChildren = [];
            // Logic to parse the nodes based on the users settings
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].thirdParty &&
                    settings.thirdParty &&
                    !node.children[i].reactRouter) {
                    validChildren.push(node.children[i]);
                }
                else if (node.children[i].reactRouter && settings.reactRouter) {
                    validChildren.push(node.children[i]);
                }
                else if (!node.children[i].thirdParty &&
                    !node.children[i].reactRouter) {
                    validChildren.push(node.children[i]);
                }
            }
            // Update children with only valid nodes, and recurse through each node
            node.children = validChildren;
            node.children.forEach((child) => {
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
    return (React.createElement("div", { className: "sidebar" },
        React.createElement(Navbar_1.default, { rootFile: rootFile }),
        React.createElement("hr", { className: "line_break" }),
        React.createElement(Modal_1.default, { modalActive: modalActive, handleModal: handleModal, fileContent: fileContent }),
        React.createElement(Flow_1.default, { initialNodes: initialNodes, initialEdges: initialEdges })));
};
exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map