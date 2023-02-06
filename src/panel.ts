import * as path from 'path';
import * as vscode from 'vscode';
import { getNonce } from "./getNonce";
import { TestParser } from './TestParser';
import { Tree } from "./types/Tree";

export default class ReacTreePanel {
    
    public static currentPanel: ReacTreePanel | undefined;

    private static readonly viewType = "reacTree";

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionPath: string;
    parser: TestParser | undefined;
    private readonly _extContext: vscode.ExtensionContext;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extContext: vscode.ExtensionContext) {
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        
		// If we already have a panel, show it.
		// Otherwise, create a new panel.
        if (ReacTreePanel.currentPanel) {
            ReacTreePanel.currentPanel._panel.reveal(column);
        } else {
        // ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One);
            console.log('FIRST')
			ReacTreePanel.currentPanel = new ReacTreePanel(extContext, extContext.extensionPath, vscode.ViewColumn.Two);
		}
	}

    private constructor(extContext: vscode.ExtensionContext, extensionPath: string, column: vscode.ViewColumn) {
        console.log('SECOND')
		  this._extensionPath = extensionPath;
      this._extContext = extContext;
      const state: Tree | undefined = extContext.workspaceState.get('reactree');
    if (state) {
      this.parser = new TestParser(state.filePath);
      this.parser.setTree(state);
    }
  

		// Create and show a new webview panel
		this._panel = vscode.window.createWebviewPanel(ReacTreePanel.viewType, "ReacTree", column, {
			// Enable javascript in the webview
			enableScripts: true,

			// And restric the webview to only loading content from our extension's `media` directory.
			localResourceRoots: [vscode.Uri.file(path.join(this._extensionPath, "out"))],
		});

		// Set the webview's initial html content
		this._panel.webview.html = this._getHtmlForWebview();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        
        this._panel.webview.onDidReceiveMessage(
            async (msg: any) => {
                switch (msg.type) {
                    case 'startup':
                        console.log('message received')
                        // vscode.commands.executeCommand('vscode-note.note.edit', msg.data.id, msg.data.category);
                        break;
                    case 'testing':
                        console.log('reachedBrain')
                        this._panel.webview.postMessage({ command: 'refactor' });
                        break;
                    case 'edit-contentFile':
                        vscode.commands.executeCommand('vscode-note.note.edit.col.content', msg.data.id, msg.data.n);
                        break;
                    case 'edit-col':
                        vscode.commands.executeCommand('vscode-note.note.edit.col', msg.data.id, msg.data.cn);
                        break;
                    case 'doc':
                        vscode.commands.executeCommand('vscode-note.note.doc.show', msg.data);
                        break;
                    case 'files':
                        vscode.commands.executeCommand('vscode-note.note.files.open', msg.data);
                        break;
                    case "onFile": {
                      // Edge case if the user sends in nothing
                      if (!msg.value) {
                        return;
                      }
                      // Run an instance of the parser
                      this.parser = new TestParser(msg.value);
                      this.parser.parse();
                      this.updateView();
                      break;
                    }
            
                    // Case when clicking on tree to open file
                    case "onViewFile": {
                      if (!msg.value) {
                        return;
                      }
                      // Open and the show the user the file they want to see
                      const doc = await vscode.workspace.openTextDocument(msg.value);
                      const editor = await vscode.window.showTextDocument(doc, {preserveFocus: false, preview: false});
                      break;
                    }
            
                    // Case when sapling becomes visible in sidebar
                    case "onReacTreeVisible": {
                      if (!this.parser) {
                        return;
                      }
                      // Get and send the saved tree to the webview
                      this.updateView();
                      break;
                    }
            
                    // Case to retrieve the user's settings
                    case "onSettingsAcquire": {
                      // use getConfiguration to check what the current settings are for the user
                      const settings = await vscode.workspace.getConfiguration('reactree');
                      // send a message back to the webview with the data on settings
                      this._panel.webview.postMessage({
                        type: "settings-data",
                        value: settings.view
                      });
                      break;
                    }
            
                    // Case that changes the parser's recorded node expanded/collapsed structure
                    case "onNodeToggle": {
                      // let the parser know that the specific node clicked changed it's expanded value, save in state
                      this._extContext.workspaceState.update(
                        'reactree',
                        this.parser!.toggleNode(msg.value.id, msg.value.expanded)
                      );
                      break;
                    }
            
                    // Message sent to the webview to bold the active file
                    case "onBoldCheck": {
                      // Check there is an activeText Editor
                      const fileName = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document.fileName: null;
                      // Message sent to the webview to bold the active file
                      if (fileName) {
                        this._panel.webview.postMessage({
                          type: "current-tab",
                          value: fileName
                        });
                      }
                      break;
                    }
                }
            },
            null,
            this._disposables
        );
    }

    public dispose() {
      ReacTreePanel.currentPanel = undefined;
          console.log('dipose part 1')
      // Clean up our resources
      this._panel.dispose();
          console.log('dipose part 2')

      while (this._disposables.length) {
        const x = this._disposables.pop();
        if (x) {
          x.dispose();
        }
      }
    }
  
    private updateView() {
      // Save current state of tree to workspace state:
      const tree = this.parser!.getTree();
      this._extContext.workspaceState.update('reactree', tree);
      // Send updated tree to webview
      this._panel.webview.postMessage({
        type: "parsed-data",
        value: tree
      });
    }

    private _getHtmlForWebview() {
		const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, "out", 'main.wv.js'));
		const scriptUri = scriptPathOnDisk.with({ scheme: "vscode-resource" });

		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();

		return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>reacttree</title>
        </head>
        <body>
            <div id="root"></div>
            <script>
                const vscode = acquireVsCodeApi();
                window.onload = function() {
                    vscode.postMessage({ command: 'startup' });
                    console.log('HTML started up.');
                };
            </script>
            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
        </html>
        `;
	}
}