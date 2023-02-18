import * as vscode from 'vscode';
import ReacTreePanel from './panel';

export function activate(extContext: vscode.ExtensionContext) {
  // Create reacTree status bar button
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );

  item.command = 'reacTree.startStatusBar';
  item.tooltip = 'Activate ReacTree';
  item.text = '$(type-hierarchy) Start Tree';
  item.show();

  extContext.subscriptions.push(
    vscode.commands.registerCommand('reacTree.start', () => {
      ReacTreePanel.createOrShow(extContext);
    })
  );

  extContext.subscriptions.push(
    vscode.commands.registerCommand('reacTree.startStatusBar', () => {
      ReacTreePanel.createOrShow(extContext);
    })
  );
}

export function deactivate() {}
