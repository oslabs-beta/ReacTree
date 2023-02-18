"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
// import * as myExtension from '../../extension';
(0, mocha_1.suite)('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    (0, mocha_1.describe)('reacTree loads correctly', () => {
        let reacTree;
        (0, mocha_1.before)(() => {
            reacTree = vscode.extensions.getExtension('team-sapling.sapling');
        });
        (0, mocha_1.test)('reacTree is registered as an extension', () => {
            (0, chai_1.expect)(reacTree).to.not.be.undefined;
        });
        (0, mocha_1.test)('reacTree extension is activated after VSCode startup', () => {
            (0, chai_1.expect)(reacTree.isActive).to.be.true;
        });
        (0, mocha_1.test)('reacTree extension package.json exists', () => {
            (0, chai_1.expect)(reacTree.packageJSON).to.not.be.undefined;
        });
    });
    // describe('It registers saplings commands successfully', () => {
    //   let commandList;
    //   before( (done) => {
    // 		vscode.commands.getCommands().then(commands => {
    //       commandList = commands;
    //       done();
    //     });
    // 	});
    //   test('It registers the sapling.generateTree command', () => {
    //     expect(commandList).to.be.an('array').that.does.include('sapling.generateTree');
    //   });
    // });
});
//# sourceMappingURL=extension.test.js.map