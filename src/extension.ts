import * as vscode from 'vscode';
import ReacTreePanel from './panel';

export function activate(extContext: vscode.ExtensionContext) {
  extContext.subscriptions.push(
    vscode.commands.registerCommand('reacTree.start', () => {
      ReacTreePanel.createOrShow(extContext);
    })
  );
  
  // Create reacTree status bar button
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );

  item.command = 'reacTree.start';
  item.tooltip = 'Activate ReacTree';
  item.text = '$(type-hierarchy) Start Tree';
  item.show();
}

export function deactivate() {}
