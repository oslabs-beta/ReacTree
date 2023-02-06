import * as vscode from 'vscode';
import ReacTreePanel from './panel'


export function activate(extContext: vscode.ExtensionContext) {
    extContext.subscriptions.push(vscode.commands.registerCommand('reacTree.start', () => {
        ReacTreePanel.createOrShow(extContext);
	}));
};

export function deactivate() { }

