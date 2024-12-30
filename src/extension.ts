import * as vscode from 'vscode';
import ReacTreePanel from './panel';

export function activate(extContext: vscode.ExtensionContext) {
  extContext.subscriptions.push(
    vscode.commands.registerCommand('reacTree.start', () => {
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor) {
        const currentFilePath = activeEditor.document.uri.fsPath;
        ReacTreePanel.createOrShow(extContext, currentFilePath);
      } else {
        vscode.window.showInformationMessage('No active editor found.');
      }
    })
  );

  // Create reacTree status bar button
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );

  item.command = 'reacTree.start';
  item.tooltip = 'Activate ReacTree';
  item.text = '$(type-hierarchy) View Tree';
  item.show();
}

export function deactivate() {}
