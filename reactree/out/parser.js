"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const babelParser = require("@babel/parser");
const path = require("path");
const fs = require("fs");
const getNonce_1 = require("./getNonce");
class Parser {
    constructor(filePath) {
        // Fix when selecting files in wsl file system
        this.entryFile = filePath;
        if (process.platform === 'linux' && this.entryFile.includes('wsl$')) {
            this.entryFile = path.resolve(filePath.split(path.win32.sep).join(path.posix.sep));
            this.entryFile = '/' + this.entryFile.split('/').slice(3).join('/');
            // Fix for when running wsl but selecting files held on windows file system
        }
        else if (process.platform === 'linux' &&
            /[a-zA-Z]/.test(this.entryFile[0])) {
            const root = `/mnt/${this.entryFile[0].toLowerCase()}`;
            this.entryFile = path.join(root, filePath.split(path.win32.sep).slice(1).join(path.posix.sep));
        }
        this.tree = undefined;
        // Break down and reasemble given filePath safely for any OS using path?
    }
    // Public method to generate component tree based on current entryFile
    parse() {
        // Create root Tree node
        const root = {
            id: (0, getNonce_1.getNonce)(),
            name: path.basename(this.entryFile).replace(/\.(t|j)sx?$/, ''),
            fileName: path.basename(this.entryFile),
            filePath: this.entryFile,
            importPath: '/',
            expanded: false,
            depth: 0,
            count: 1,
            thirdParty: false,
            reactRouter: false,
            reduxConnect: false,
            children: [],
            parentList: [],
            props: {},
            error: '',
        };
        this.tree = root;
        this.parser(root);
        return this.tree;
    }
    getTree() {
        return this.tree;
    }
    // Set Sapling Parser with a specific Data Tree (from workspace state)
    setTree(tree) {
        this.entryFile = tree.filePath;
        this.tree = tree;
    }
    updateTree(filePath) {
        let children = [];
        const getChildNodes = (node) => {
            const { depth, filePath, expanded } = node;
            children.push({ depth, filePath, expanded });
        };
        const matchExpand = (node) => {
            for (let i = 0; i < children.length; i += 1) {
                const oldNode = children[i];
                if (oldNode.depth === node.depth &&
                    oldNode.filePath === node.filePath &&
                    oldNode.expanded) {
                    node.expanded = true;
                }
            }
        };
        const callback = (node) => {
            if (node.filePath === filePath) {
                node.children.forEach((child) => {
                    this.traverseTree(getChildNodes, child);
                });
                const newNode = this.parser(node);
                this.traverseTree(matchExpand, newNode);
                children = [];
            }
        };
        this.traverseTree(callback, this.tree);
        return this.tree;
    }
    // Traverses the tree and changes expanded property of node whose id matches provided id
    toggleNode(id, expanded) {
        const callback = (node) => {
            if (node.id === id) {
                node.expanded = expanded;
            }
        };
        this.traverseTree(callback, this.tree);
        return this.tree;
    }
    // Traverses all nodes of current component tree and applies callback to each node
    traverseTree(callback, node = this.tree) {
        if (!node) {
            return;
        }
        callback(node);
        node.children.forEach((childNode) => {
            this.traverseTree(callback, childNode);
        });
    }
    // Recursively builds the React component tree structure starting from root node
    parser(componentTree) {
        // If import is a node module, do not parse any deeper
        if (!['\\', '/', '.'].includes(componentTree.importPath[0])) {
            componentTree.thirdParty = true;
            if (componentTree.fileName === 'react-router-dom' ||
                componentTree.fileName === 'react-router') {
                componentTree.reactRouter = true;
            }
            return;
        }
        // Check that file has valid fileName/Path, if not found, add error to node and halt
        const fileName = this.getFileName(componentTree);
        if (!fileName) {
            componentTree.error = 'File not found.';
            return;
        }
        // If current node recursively calls itself, do not parse any deeper:
        if (componentTree.parentList.includes(componentTree.filePath)) {
            return;
        }
        // Create abstract syntax tree of current component tree file
        let ast;
        try {
            ast = babelParser.parse(fs.readFileSync(path.resolve(componentTree.filePath), 'utf-8'), {
                sourceType: 'module',
                tokens: true,
                plugins: ['jsx', 'typescript'],
            });
        }
        catch (err) {
            componentTree.error = 'Error while processing this file/node';
            return componentTree;
        }
        // Find imports in the current file, then find child components in the current file
        const imports = this.getImports(ast.program.body);
        // Get any JSX Children of current file:
        if (ast.tokens) {
            componentTree.children = this.getJSXChildren(ast.tokens, imports, componentTree);
        }
        // Check if current node is connected to the Redux store
        if (ast.tokens) {
            componentTree.reduxConnect = this.checkForRedux(ast.tokens, imports);
        }
        // Recursively parse all child components
        componentTree.children.forEach((child) => this.parser(child));
        return componentTree;
    }
    // Finds files where import string does not include a file extension
    getFileName(componentTree) {
        const ext = path.extname(componentTree.filePath);
        let fileName = componentTree.fileName;
        if (!ext) {
            // Try and find file extension that exists in directory:
            const fileArray = fs.readdirSync(path.dirname(componentTree.filePath));
            const regEx = new RegExp(`${componentTree.fileName}.(j|t)sx?$`);
            fileName = fileArray.find((fileStr) => fileStr.match(regEx));
            fileName ? (componentTree.filePath += path.extname(fileName)) : null;
        }
        return fileName;
    }
    // Extracts Imports from current file
    // const Page1 = lazy(() => import('./page1')); -> is parsed as 'ImportDeclaration'
    // import Page2 from './page2'; -> is parsed as 'VariableDeclaration'
    getImports(body) {
        const bodyImports = body.filter((item) => item.type === 'ImportDeclaration' || 'VariableDeclaration');
        // console.log('bodyImports are: ', bodyImports);
        return bodyImports.reduce((accum, curr) => {
            // Import Declarations:
            if (curr.type === 'ImportDeclaration') {
                curr.specifiers.forEach((i) => {
                    accum[i.local.name] = {
                        importPath: curr.source.value,
                        importName: i.imported ? i.imported.name : i.local.name,
                    };
                });
            }
            // Imports Inside Variable Declarations: // Not easy to deal with nested objects
            if (curr.type === 'VariableDeclaration') {
                const importPath = this.findVarDecImports(curr.declarations[0]);
                if (importPath) {
                    const importName = curr.declarations[0].id.name;
                    accum[curr.declarations[0].id.name] = {
                        importPath,
                        importName,
                    };
                }
            }
            return accum;
        }, {});
    }
    // Recursive helper method to find import path in Variable Declaration
    findVarDecImports(ast) {
        // Base Case, find import path in variable declaration and return it,
        if (ast.hasOwnProperty('callee') && ast.callee.type === 'Import') {
            return ast.arguments[0].value;
        }
        // Otherwise look for imports in any other non null/undefined objects in the tree:
        for (let key in ast) {
            if (ast.hasOwnProperty(key) && typeof ast[key] === 'object' && ast[key]) {
                const importPath = this.findVarDecImports(ast[key]);
                if (importPath) {
                    return importPath;
                }
            }
        }
        return false;
    }
    // Finds JSX React Components in current file
    getJSXChildren(astTokens, importsObj, parentNode) {
        let childNodes = {};
        let props = {};
        let token;
        for (let i = 0; i < astTokens.length; i++) {
            // Case for finding JSX tags eg <App .../>
            if (astTokens[i].type.label === 'jsxTagStart' &&
                astTokens[i + 1].type.label === 'jsxName' &&
                importsObj[astTokens[i + 1].value]) {
                token = astTokens[i + 1];
                props = this.getJSXProps(astTokens, i + 2);
                childNodes = this.getChildNodes(importsObj, token, props, parentNode, childNodes);
                // Case for finding components passed in as props e.g. <Route component={App} />
            }
            else if (astTokens[i].type.label === 'jsxName' &&
                (astTokens[i].value === 'component' ||
                    astTokens[i].value === 'children') &&
                importsObj[astTokens[i + 3].value]) {
                token = astTokens[i + 3];
                childNodes = this.getChildNodes(importsObj, token, props, parentNode, childNodes);
            }
        }
        return Object.values(childNodes);
    }
    getChildNodes(imports, astToken, props, parent, children) {
        if (children[astToken.value]) {
            children[astToken.value].count += 1;
            children[astToken.value].props = Object.assign(Object.assign({}, children[astToken.value].props), props);
        }
        else {
            // Add tree node to childNodes if one does not exist
            children[astToken.value] = {
                id: (0, getNonce_1.getNonce)(),
                name: imports[astToken.value]['importName'],
                fileName: path.basename(imports[astToken.value]['importPath']),
                filePath: path.resolve(path.dirname(parent.filePath), imports[astToken.value]['importPath']),
                importPath: imports[astToken.value]['importPath'],
                expanded: false,
                depth: parent.depth + 1,
                thirdParty: false,
                reactRouter: false,
                reduxConnect: false,
                count: 1,
                props: props,
                children: [],
                parentList: [parent.filePath].concat(parent.parentList),
                error: '',
            };
        }
        return children;
    }
    // Extracts prop names from a JSX element
    getJSXProps(astTokens, j) {
        const props = {};
        while (astTokens[j].type.label !== 'jsxTagEnd') {
            if (astTokens[j].type.label === 'jsxName' &&
                astTokens[j + 1].value === '=') {
                props[astTokens[j].value] = true;
            }
            j += 1;
        }
        return props;
    }
    // Checks if current Node is connected to React-Redux Store
    checkForRedux(astTokens, importsObj) {
        // Check that react-redux is imported in this file (and we have a connect method or otherwise)
        let reduxImported = false;
        let connectAlias;
        Object.keys(importsObj).forEach((key) => {
            if (importsObj[key].importPath === 'react-redux' &&
                importsObj[key].importName === 'connect') {
                reduxImported = true;
                connectAlias = key;
            }
        });
        if (!reduxImported) {
            return false;
        }
        // Check that connect method is invoked and exported in the file
        for (let i = 0; i < astTokens.length; i += 1) {
            if (astTokens[i].type.label === 'export' &&
                astTokens[i + 1].type.label === 'default' &&
                astTokens[i + 2].value === connectAlias) {
                return true;
            }
        }
        return false;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map