import * as path from 'path';
import * as vscode from 'vscode';
import { getNonce } from "./getNonce";
// import { Parser } from './parser';
// import { Tree } from "./types/Tree";

export default class ReacTreePanel {
    
  public static currentPanel: ReacTreePanel | undefined;

  private static readonly viewType = "reacTree";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionPath: string;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionPath: string) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
      
    // If we already have a panel, show it.
    // Otherwise, create a new panel.
    if (ReacTreePanel.currentPanel) {
      ReacTreePanel.currentPanel._panel.reveal(column);
    } else {
    // ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One);
      console.log('FIRST')
      ReacTreePanel.currentPanel = new ReacTreePanel(extensionPath, vscode.ViewColumn.Two);
    }
  }

  private constructor(extensionPath: string, column: vscode.ViewColumn) {
    console.log('SECOND')
    this._extensionPath = extensionPath;

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
      (msg: any) => {
        switch (msg.command) {
          case 'startup':
            console.log('message received')
            // vscode.commands.executeCommand('vscode-note.note.edit', msg.data.id, msg.data.category);
            break;
          case 'testing':
            console.log('reachedBrain')
            this._panel!.webview.postMessage({ command: 'refactor' });
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