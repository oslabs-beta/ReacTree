import * as babelParser from "@babel/parser";
import * as path from "path";
import * as fs from "fs";
import { getNonce } from "./getNonce";
import { Tree } from "./types/Tree";
import { ImportObj } from "./types/ImportObj";
import { File } from "@babel/types";

export class Parser {
  entryFile: string;
  tree: Tree | undefined;
  projectRoot: string;
  hasSrcDir: boolean;

  constructor(filePath: string) {
    this.entryFile = this.normalizePath(filePath);
    this.tree = undefined;
    this.projectRoot = this.findProjectRoot(this.entryFile);
    this.hasSrcDir = fs.existsSync(path.join(this.projectRoot, "src"));
  }

  private normalizePath(filePath: string): string {
    if (process.platform === "linux") {
      if (filePath.includes("wsl$")) {
        return (
          "/" + filePath.split(path.win32.sep).slice(3).join(path.posix.sep)
        );
        // Fix for when running wsl but selecting files held on windows file system
      } else if (/[a-zA-Z]/.test(filePath[0])) {
        const root = `/mnt/${filePath[0].toLowerCase()}`;
        return path.join(
          root,
          filePath.split(path.win32.sep).slice(1).join(path.posix.sep)
        );
      }
    }
    return filePath;
  }
  // finds project root directory, the ditectory where "package.json" exists
  private findProjectRoot(filePath: string): string {
    let currentDir = path.dirname(filePath);
    while (currentDir !== path.parse(currentDir).root) {
      if (fs.existsSync(path.join(currentDir, "package.json"))) {
        return currentDir;
      }
      currentDir = path.dirname(currentDir);
    }
    throw new Error("Project root not found");
  }

  public parse(): Tree {
    const rootImportPath = this.hasSrcDir ? "./src/app/" : "./app/";
    // Create root Tree node
    const root = {
      id: getNonce(),
      name: path.basename(this.entryFile).replace(/\.(t|j)sx?$/, ""),
      fileName: path.basename(this.entryFile),
      filePath: this.entryFile,
      importPath: rootImportPath,
      expanded: false,
      depth: 0,
      count: 1,
      thirdParty: false,
      reactRouter: false,
      reduxConnect: false,
      children: [],
      parentList: [],
      props: {},
      error: "",
    };

    this.tree = root;
    console.log(this.tree);
    this.parser(root);
    return this.tree;
  }

  public getTree(): Tree {
    return this.tree!;
  }

  // Set Sapling Parser with a specific Data Tree (from workspace state)
  public setTree(tree: Tree): void {
    this.entryFile = tree.filePath;
    this.tree = tree;
  }

  public updateTree(filePath: string): Tree {
    let children: any[] = [];

    const getChildNodes = (node: Tree): void => {
      const { depth, filePath, expanded } = node;
      children.push({ depth, filePath, expanded });
    };

    const matchExpand = (node: Tree): void => {
      for (let i = 0; i < children.length; i += 1) {
        const oldNode = children[i];
        if (
          oldNode.depth === node.depth &&
          oldNode.filePath === node.filePath &&
          oldNode.expanded
        ) {
          node.expanded = true;
        }
      }
    };

    const callback = (node: Tree): void => {
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

    return this.tree!;
  }

  // Traverses the tree and changes expanded property of node whose id matches provided id
  public toggleNode(id: string, expanded: boolean): Tree {
    const callback = (node: { id: string; expanded: boolean }) => {
      if (node.id === id) {
        node.expanded = expanded;
      }
    };

    this.traverseTree(callback, this.tree);

    return this.tree!;
  }

  // Traverses all nodes of current component tree and applies callback to each node
  private traverseTree(
    callback: Function,
    node: Tree | undefined = this.tree
  ): void {
    if (!node) {
      return;
    }

    callback(node);

    node.children.forEach((childNode) => {
      this.traverseTree(callback, childNode);
    });
  }

  // Recursively builds the React component tree structure starting from root node
  private parser(componentTree: Tree): Tree | undefined {
    if (componentTree.parentList.includes(componentTree.filePath)) {
      return;
    }

    // Create abstract syntax tree of current component tree file
    let ast: babelParser.ParseResult<File>;
    try {
      ast = babelParser.parse(
        fs.readFileSync(path.resolve(componentTree.filePath), "utf-8"),
        {
          sourceType: "module",
          tokens: true,
          plugins: ["jsx", "typescript"],
        }
      );
    } catch (err) {
      componentTree.error = "Error while processing this file/node";
      return componentTree;
    }

    // Find imports in the current file, then find child components in the current file
    const imports = this.getImports(ast.program.body);

    // Get any JSX Children of current file:
    if (ast.tokens) {
      const childrenObj = this.getJSXChildren(
        ast.tokens,
        imports,
        componentTree
      );
      componentTree.children = Object.values(childrenObj);
    }

    // Check if current node is connected to the Redux store
    if (ast.tokens) {
      componentTree.reduxConnect = this.checkForRedux(ast.tokens, imports);
    }

    // Recursively parse all child components
    componentTree.children.forEach((child) => this.parser(child));

    return componentTree;
  }

  // Extracts Imports from current file
  // const Page1 = lazy(() => import('./page1')); -> is parsed as 'ImportDeclaration'
  // import Page2 from './page2'; -> is parsed as 'VariableDeclaration'
  private getImports(body: { [key: string]: any }[]): ImportObj {
    const bodyImports = body.filter(
      (item) => item.type === "ImportDeclaration" || "VariableDeclaration"
    );

    return bodyImports.reduce((accum, curr) => {
      // Import Declarations:
      if (curr.type === "ImportDeclaration") {
        curr.specifiers.forEach(
          (i: { local: { name: string }; imported: { name: string } }) => {
            const { importPath, filePath } = this.resolveImportPath(
              curr.source.value
            );
            accum[i.local.name] = {
              importPath,
              filePath,
              importName: i.imported ? i.imported.name : i.local.name,
            };
          }
        );
        // Imports Inside Variable Declarations: // Not easy to deal with nested objects
      } else if (curr.type === "VariableDeclaration") {
        const importPath = this.findVarDecImports(curr.declarations[0]);
        if (typeof importPath === "string") {
          const importName = curr.declarations[0].id.name;
          const { importPath: resolvedImportPath, filePath } =
            this.resolveImportPath(importPath);
          accum[curr.declarations[0].id.name] = {
            importPath: resolvedImportPath,
            filePath,
            importName,
          };
        }
      }
      return accum;
    }, {} as ImportObj);
  }

  // Finds files name and file extension
  private resolveImportPath(importPath: string): {
    importPath: string;
    filePath: string;
  } {
    if (importPath.startsWith("@/")) {
      const relativePath = importPath.slice(2);
      const importPathResolved = this.hasSrcDir
        ? `./src/${relativePath}`
        : `./${relativePath}`;
      const filePathResolved = path.join(
        this.projectRoot,
        this.hasSrcDir ? "src" : "",
        relativePath
      );
      return {
        importPath: importPathResolved,
        filePath: this.addFileExtension(filePathResolved),
      };
    } else if (importPath.startsWith("./") || importPath.startsWith("../")) {
      const filePathResolved = path.resolve(
        path.dirname(this.entryFile),
        importPath
      );
      const importPathResolved = path.relative(
        this.projectRoot,
        filePathResolved
      );
      return {
        importPath: `./${importPathResolved.replace(/\\/g, "/")}`,
        filePath: this.addFileExtension(filePathResolved),
      };
    } else if (importPath.startsWith("/")) {
      const filePathResolved = path.join(this.projectRoot, importPath);
      return {
        importPath,
        filePath: this.addFileExtension(filePathResolved),
      };
    } else {
      // Third-party import
      return { importPath, filePath: importPath };
    }
  }

  private addFileExtension(filePath: string): string {
    const extensions = [".tsx", ".ts", ".jsx", ".js"];
    for (const ext of extensions) {
      if (fs.existsSync(`${filePath}${ext}`)) {
        return `${filePath}${ext}`;
      }
    }
    return filePath;
  }

  // Recursive helper method to find import path in Variable Declaration
  private findVarDecImports(ast: { [key: string]: any }): string | boolean {
    // Base Case, find import path in variable declaration and return it,
    if (ast.hasOwnProperty("callee") && ast.callee.type === "Import") {
      return ast.arguments[0].value;
    }

    // Otherwise look for imports in any other non null/undefined objects in the tree:
    for (let key in ast) {
      if (ast.hasOwnProperty(key) && typeof ast[key] === "object" && ast[key]) {
        const importPath = this.findVarDecImports(ast[key]);
        if (importPath) {
          return importPath;
        }
      }
    }

    return false;
  }

  // Finds JSX React Components in current file
  private getJSXChildren(
    astTokens: any[],
    importsObj: ImportObj,
    parentNode: Tree
  ): { [fileName: string]: Tree } {
    let childNodes: { [fileName: string]: Tree } = {};
    let props: { [key: string]: boolean } = {};
    let currentElement: string | null = null;

    for (let i = 0; i < astTokens.length; i++) {
      const token = astTokens[i];

      // Case for finding JSX tags eg <App .../>
      if (token.type.label === "jsxTagStart") {
        currentElement = null;
        props = {};
      }

      // JSX element name
      if (token.type.label === "jsxName" && currentElement === null) {
        currentElement = token.value;
        // Check if this element is an imported component
        if (importsObj[currentElement]) {
          childNodes = this.getChildNodes(
            importsObj,
            { value: currentElement },
            props,
            parentNode,
            childNodes
          );
        }
      }

      // JSX props
      if (token.type.label === "jsxName" && currentElement !== null) {
        const propName = token.value;
        if (astTokens[i + 1].type.label === "eq") {
          props[propName] = true;

          // Check for component passed as prop
          if (
            astTokens[i + 2].type.label === "jsxTagStart" &&
            astTokens[i + 3].type.label === "jsxName" &&
            importsObj[astTokens[i + 3].value]
          ) {
            childNodes = this.getChildNodes(
              importsObj,
              { value: astTokens[i + 3].value },
              {},
              parentNode,
              childNodes
            );
          }
        }
      }

      // Handle components in JSX expressions
      if (token.type.label === "jsxExpressionStart") {
        let j = i + 1;
        while (
          j < astTokens.length &&
          astTokens[j].type.label !== "jsxExpressionEnd"
        ) {
          if (
            astTokens[j].type.label === "name" &&
            importsObj[astTokens[j].value]
          ) {
            childNodes = this.getChildNodes(
              importsObj,
              { value: astTokens[j].value },
              {},
              parentNode,
              childNodes
            );
          }
          j++;
        }
        i = j; // Skip to end of expression
      }

      // End of JSX element
      if (token.type.label === "jsxTagEnd") {
        currentElement = null;
        props = {};
      }
    }

    return childNodes;
  }

  private getChildNodes(
    imports: ImportObj,
    astToken: { [key: string]: any },
    props: { [key: string]: boolean },
    parent: Tree,
    children: { [key: string]: Tree }
  ): { [key: string]: Tree } {
    const uniqueChildren: { [fileName: string]: Tree } = {};

    Object.entries(children).forEach(([key, child]) => {
      uniqueChildren[child.fileName] = child;
    });

    const importInfo = imports[astToken.value];
    const isThirdParty = !importInfo.importPath.startsWith(".");
    const fileName = path.basename(importInfo.filePath);

    if (uniqueChildren[fileName]) {
      uniqueChildren[fileName].count += 1;
      uniqueChildren[fileName].props = {
        ...uniqueChildren[fileName].props,
        ...props,
      };
    } else {
      // Add tree node to childNodes if one does not exist
      uniqueChildren[fileName] = {
        id: getNonce(),
        name: importInfo.importName,
        fileName: fileName,
        filePath: importInfo.filePath,
        importPath: importInfo.importPath,
        expanded: false,
        depth: parent.depth + 1,
        thirdParty: isThirdParty,
        reactRouter: false,
        reduxConnect: false,
        count: 1,
        props: props,
        children: [],
        parentList: [parent.filePath].concat(parent.parentList),
        error: "",
      };
    }

    return uniqueChildren;
  }

  // Extracts prop names from a JSX element
  // private getJSXProps(
  //   astTokens: { [key: string]: any }[],
  //   j: number
  // ): { [key: string]: boolean } {
  //   const props: any = {};
  //   while (astTokens[j].type.label !== "jsxTagEnd") {
  //     if (
  //       astTokens[j].type.label === "jsxName" &&
  //       astTokens[j + 1].value === "="
  //     ) {
  //       props[astTokens[j].value] = true;
  //     }
  //     j += 1;
  //   }
  //   return props;
  // }

  // Checks if current Node is connected to React-Redux Store
  private checkForRedux(astTokens: any[], importsObj: ImportObj): boolean {
    // Check that react-redux is imported in this file (and we have a connect method or otherwise)
    let reduxImported = false;
    let connectAlias;
    Object.keys(importsObj).forEach((key) => {
      if (
        importsObj[key].importPath === "react-redux" &&
        importsObj[key].importName === "connect"
      ) {
        reduxImported = true;
        connectAlias = key;
      }
    });

    if (!reduxImported) {
      return false;
    }

    // Check that connect method is invoked and exported in the file
    for (let i = 0; i < astTokens.length; i += 1) {
      if (
        astTokens[i].type.label === "export" &&
        astTokens[i + 1].type.label === "default" &&
        astTokens[i + 2].value === connectAlias
      ) {
        return true;
      }
    }
    return false;
  }
}
