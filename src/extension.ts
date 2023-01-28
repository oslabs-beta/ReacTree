import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  
  const panel = vscode.window.createWebviewPanel(
    "webView",
    "Web View",
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = getWebviewContent();

  // context.subscriptions.push(panel.webview.html);
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web View</title>
</head>
<body>
    <p>Hello World</p>
</body>
</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
