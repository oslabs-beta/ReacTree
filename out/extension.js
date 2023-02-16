"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const panel_1 = require("./panel");
function activate(extContext) {
    extContext.subscriptions.push(vscode.commands.registerCommand('reacTree.start', () => {
        panel_1.default.createOrShow(extContext);
    }));
}
exports.activate = activate;
;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map