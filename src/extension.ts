import * as path from 'path';
import * as vscode from 'vscode';


export function activate(extContext: vscode.ExtensionContext) {
    let webviewPanel: vscode.WebviewPanel = vscode.window.createWebviewPanel('vscode-note', 'vscode-note', vscode.ViewColumn.One, {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(extContext.extensionPath, 'out'))]
    });

    webviewPanel.iconPath = vscode.Uri.file(path.join(extContext.extensionPath, 'images/wv-icon.svg'));
    
    webviewPanel.onDidDispose(
        () => {
            // webviewPanel = undefined;
            console.log('webview panel closed.');
        },
        null,
        extContext.subscriptions
    );

    webviewPanel.onDidChangeViewState( () => {
        console.log('viewStateChanged');
        }, 
        null, 
        extContext.subscriptions
        // e => {
        //     const panel = e.webviewPanel;
        //     if (panel.visible) {
        //         this.parseDomain();
        //         this.showNotesPlanView();
        //     }
        // },
        // null,
        // extContext.subscriptions
    );

    webviewPanel.webview.onDidReceiveMessage(
        (msg: any) => {
            switch (msg.command) {
                case 'startup':
                    console.log('message received')
                    // vscode.commands.executeCommand('vscode-note.note.edit', msg.data.id, msg.data.category);
                    break;
                case 'testing':
                    console.log('reachedBrain')
                    webviewPanel.webview.postMessage({ command: 'refactor' });
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
        undefined,
        extContext.subscriptions
    );
    
    function assetsFile (name: string) {
        const file = path.join(extContext.extensionPath, 'out', name);
        return vscode.Uri.file(file)
            .with({ scheme: 'vscode-resource' })
            .toString();
    };

    const webviewHTML: string = `<!DOCTYPE html>
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
        <script src="${assetsFile('main.wv.js')}"></script>
    </body>
    </html>
    `;

    webviewPanel.webview.html = webviewHTML;

    function showPanel(webviewPanel: vscode.WebviewPanel) {
        //if not working try !webviewPanel!.visible
        if (!webviewPanel.visible) {
            webviewPanel!.reveal(vscode.ViewColumn.One);
        }
    }

    extContext.subscriptions.push(vscode.commands.registerCommand('reacTree.start', () => {
        showPanel(webviewPanel);
	}));
};

export function deactivate() { }