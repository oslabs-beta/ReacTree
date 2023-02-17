import { describe, suite , test, before} from 'mocha';
import { expect } from 'chai';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	describe('reacTree loads correctly', () => {
    let reacTree;
    before (() => {
      reacTree = vscode.extensions.getExtension('ReacTreeDev.reactree');
    });

    test('reacTree is registered as an extension', () => {
      expect(reacTree).to.not.be.undefined;
    });

    test('reacTree extension is activated after VSCode startup', () => {
      expect(reacTree.isActive).to.be.true;
    });

    test('reacTree extension package.json exists', () => {
      expect(reacTree.packageJSON).to.not.be.undefined;
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
