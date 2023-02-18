"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../../parser");
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const path = require("path");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
(0, mocha_1.suite)('Parser Test Suite', () => {
    let parser, tree, file;
    // UNPARSED TREE TEST
    (0, mocha_1.describe)('It initializes correctly', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_0/index.js');
            parser = new parser_1.Parser(file);
        });
        (0, mocha_1.test)('A new instance of the parser class is an object', () => {
            (0, chai_1.expect)(parser).to.be.an('object');
        });
        (0, mocha_1.test)('It initializes with a proper entry file and an undefined tree', () => {
            (0, chai_1.expect)(parser.entryFile).to.equal(file);
            (0, chai_1.expect)(parser.tree).to.be.undefined;
        });
    });
    // TEST 0: ONE CHILD
    (0, mocha_1.describe)('It works for simple apps', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_0/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('Parsing returns a object tree that is not undefined', () => {
            (0, chai_1.expect)(tree).to.be.an('object');
        });
        (0, mocha_1.test)('Parsed tree has a property called name with value index and one child with name App', () => {
            (0, chai_1.expect)(tree).to.have.own.property('name').that.is.equal('index');
            (0, chai_1.expect)(tree).to.have.own.property('children').that.is.an('array');
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('name').that.is.equal('App');
        });
    });
    // TEST 1: NESTED CHILDREN
    (0, mocha_1.describe)('It works for 2 components', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_1/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('Parsed tree has a property called name with value index and one child with name App, which has its own child Main', () => {
            (0, chai_1.expect)(tree).to.have.own.property('name').to.equal('index');
            (0, chai_1.expect)(tree.children[0].name).to.equal('App');
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('children').that.is.an('array');
            (0, chai_1.expect)(tree.children[0].children[0]).to.have.own.property('name').to.equal('Main');
        });
        (0, mocha_1.test)('Parsed tree children should equal the child components', () => {
            (0, chai_1.expect)(tree.children).to.have.lengthOf(1);
            (0, chai_1.expect)(tree.children[0].children).to.have.lengthOf(1);
        });
        (0, mocha_1.test)('Parsed tree depth is accurate', () => {
            (0, chai_1.expect)(tree).to.have.own.property('depth').that.is.equal(0);
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('depth').that.is.equal(1);
            (0, chai_1.expect)(tree.children[0].children[0]).to.have.own.property('depth').that.is.equal(2);
        });
    });
    // TEST 2: THIRD PARTY, REACT ROUTER, DESTRUCTURED IMPORTS
    (0, mocha_1.describe)('It works for third party / React Router components and destructured imports', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_2/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('Should parse destructured and third party imports', () => {
            (0, chai_1.expect)(tree.children).to.have.lengthOf(3);
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('name').that.is.oneOf(['Switch', 'Route']);
            (0, chai_1.expect)(tree.children[1]).to.have.own.property('name').that.is.oneOf(['Switch', 'Route']);
            (0, chai_1.expect)(tree.children[2]).to.have.own.property('name').that.is.equal('Tippy');
        });
        (0, mocha_1.test)('reactRouter should be designated as third party and reactRouter', () => {
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('thirdParty').to.be.true;
            (0, chai_1.expect)(tree.children[1]).to.have.own.property('thirdParty').to.be.true;
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('reactRouter').to.be.true;
            (0, chai_1.expect)(tree.children[1]).to.have.own.property('reactRouter').to.be.true;
        });
        (0, mocha_1.test)('Tippy should be designated as third party and not reactRouter', () => {
            (0, chai_1.expect)(tree.children[2]).to.have.own.property('thirdParty').to.be.true;
            (0, chai_1.expect)(tree.children[2]).to.have.own.property('reactRouter').to.be.false;
        });
    });
    // TEST 3: IDENTIFIES REDUX STORE CONNECTION
    (0, mocha_1.describe)('It identifies a Redux store connection and designates the component as such', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_3/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('The reduxConnect properties of the connected component and the unconnected component should be true and false, respectively', () => {
            (0, chai_1.expect)(tree.children[1].children[0].name).to.equal('ConnectedContainer');
            (0, chai_1.expect)(tree.children[1].children[0]).to.have.own.property('reduxConnect').that.is.true;
            (0, chai_1.expect)(tree.children[1].children[1].name).to.equal('UnconnectedContainer');
            (0, chai_1.expect)(tree.children[1].children[1]).to.have.own.property('reduxConnect').that.is.false;
        });
    });
    // TEST 4: ALIASED IMPORTS
    (0, mocha_1.describe)('It works for aliases', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_4/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('alias should still give us components', () => {
            (0, chai_1.expect)(tree.children).to.have.lengthOf(2);
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('name').that.is.equal('Switch');
            (0, chai_1.expect)(tree.children[1]).to.have.own.property('name').that.is.equal('Route');
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('name').that.is.not.equal('S');
            (0, chai_1.expect)(tree.children[1]).to.have.own.property('name').that.is.not.equal('R');
        });
    });
    // TEST 5: MISSING EXTENSIONS AND UNUSED IMPORTS
    (0, mocha_1.describe)('It works for extension-less imports', () => {
        let names, paths, expectedNames, expectedPaths;
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_5/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
            names = tree.children.map(child => child.name);
            paths = tree.children.map(child => child.filePath);
            expectedNames = ['JS', 'JSX', 'TS', 'TSX'];
            expectedPaths = [
                '../../../src/test/test_apps/test_5/components/JS.js',
                '../../../src/test/test_apps/test_5/components/JSX.jsx',
                '../../../src/test/test_apps/test_5/components/TS.ts',
                '../../../src/test/test_apps/test_5/components/TSX.tsx'
            ].map(el => path.resolve(__dirname, el));
        });
        (0, mocha_1.test)('Check children match expected children', () => {
            (0, chai_1.expect)(tree.children).to.have.lengthOf(4);
            for (let i = 0; i < tree.children.length; i++) {
                (0, chai_1.expect)(tree.children[i].name).to.equal(expectedNames[i]);
                (0, chai_1.expect)(tree.children[i].filePath).to.equal(expectedPaths[i]);
                (0, chai_1.expect)(tree.children[i].error).to.equal('');
            }
        });
        (0, mocha_1.test)('Imports that are not invoked should not be children', () => {
            (0, chai_1.expect)(names).to.not.contain('Switch');
            (0, chai_1.expect)(names).to.not.contain('Route');
        });
    });
    // TEST 6: BAD IMPORT OF APP2 FROM APP1 COMPONENT
    (0, mocha_1.describe)('It works for badly imported children nodes', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_6/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('improperly imported child component should exist but show an error', () => {
            (0, chai_1.expect)(tree.children[0].children[0]).to.have.own.property('name').that.equals('App2');
            (0, chai_1.expect)(tree.children[0].children[0]).to.have.own.property('error').that.does.not.equal('');
        });
    });
    // TEST 7: SYNTAX ERROR IN APP FILE CAUSES PARSER ERROR
    (0, mocha_1.describe)('It should log an error when the parser encounters a javascript syntax error', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_7/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('Should have a nonempty error message on the invalid child and not parse further', () => {
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('name').that.equals('App');
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('error').that.does.not.equal('');
            (0, chai_1.expect)(tree.children[0].children).to.have.lengthOf(0);
        });
    });
    // TEST 8: MULTIPLE PROPS ON ONE COMPONENT
    (0, mocha_1.describe)('It should properly count repeat components and consolidate and grab their props', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_8/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('Grandchild should have a count of 1', () => {
            (0, chai_1.expect)(tree.children[0].children[0]).to.have.own.property('count').that.equals(1);
        });
        (0, mocha_1.test)('Grandchild should have the correct three props', () => {
            (0, chai_1.expect)(tree.children[0].children[0].props).has.own.property('prop1').that.is.true;
            (0, chai_1.expect)(tree.children[0].children[0].props).has.own.property('prop2').that.is.true;
            (0, chai_1.expect)(tree.children[0].children[0].props).has.own.property('prop3').that.is.true;
        });
    });
    // TEST 9: FINDING DIFFERENT PROPS ACROSS TWO OR MORE IDENTICAL COMPONENTS
    (0, mocha_1.describe)('It should properly count repeat components and consolidate and grab their props', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_9/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('Grandchild should have a count of 2', () => {
            (0, chai_1.expect)(tree.children[0].children[0]).to.have.own.property('count').that.equals(2);
        });
        (0, mocha_1.test)('Grandchild should have the correct two props', () => {
            (0, chai_1.expect)(tree.children[0].children[0].props).has.own.property('prop1').that.is.true;
            (0, chai_1.expect)(tree.children[0].children[0].props).has.own.property('prop2').that.is.true;
        });
    });
    // TEST 10: CHECK CHILDREN WORKS AND COMPONENTS WORK
    (0, mocha_1.describe)('It should render children when children are rendered as values of prop called component', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_10/index.jsx');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('Parent should have children that match the value stored in component prop', () => {
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('name').that.is.equal('BrowserRouter');
            (0, chai_1.expect)(tree.children[1]).to.have.own.property('name').that.is.equal('App');
            (0, chai_1.expect)(tree.children[1].children[3]).to.have.own.property('name').that.is.equal('DrillCreator');
            (0, chai_1.expect)(tree.children[1].children[4]).to.have.own.property('name').that.is.equal('HistoryDisplay');
        });
    });
    // TEST 11: PARSER DOESN'T BREAK UPON RECURSIVE COMPONENTS
    (0, mocha_1.describe)('It should render the second call of mutually recursive components, but no further', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_11/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('Tree should not be undefined', () => {
            (0, chai_1.expect)(tree).to.not.be.undefined;
        });
        (0, mocha_1.test)('Tree should have an index component while child App1, grandchild App2, great-grandchild App1', () => {
            (0, chai_1.expect)(tree).to.have.own.property('name').that.is.equal('index');
            (0, chai_1.expect)(tree.children).to.have.lengthOf(1);
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('name').that.is.equal('App1');
            (0, chai_1.expect)(tree.children[0].children).to.have.lengthOf(1);
            (0, chai_1.expect)(tree.children[0].children[0]).to.have.own.property('name').that.is.equal('App2');
            (0, chai_1.expect)(tree.children[0].children[0].children).to.have.lengthOf(1);
            (0, chai_1.expect)(tree.children[0].children[0].children[0]).to.have.own.property('name').that.is.equal('App1');
            (0, chai_1.expect)(tree.children[0].children[0].children[0].children).to.have.lengthOf(0);
        });
    });
    // TEST 12: NEXT.JS APPS
    (0, mocha_1.describe)('It should parse Next.js applications', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_12/pages/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('Root should be named index, children should be named Head, Navbar, and Image, children of Navbar should be named Link and Image', () => {
            (0, chai_1.expect)(tree).to.have.own.property('name').that.is.equal('index');
            (0, chai_1.expect)(tree.children).to.have.lengthOf(3);
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('name').that.is.equal('Head');
            (0, chai_1.expect)(tree.children[1]).to.have.own.property('name').that.is.equal('Navbar');
            (0, chai_1.expect)(tree.children[2]).to.have.own.property('name').that.is.equal('Image');
            (0, chai_1.expect)(tree.children[1].children).to.have.lengthOf(2);
            (0, chai_1.expect)(tree.children[1].children[0]).to.have.own.property('name').that.is.equal('Link');
            (0, chai_1.expect)(tree.children[1].children[1]).to.have.own.property('name').that.is.equal('Image');
        });
    });
    // TEST 13: Variable Declaration Imports and React.lazy Imports
    (0, mocha_1.describe)('It should parse VariableDeclaration imports including React.lazy imports', () => {
        (0, mocha_1.before)(() => {
            file = path.join(__dirname, '../../../src/test/test_apps/test_13/index.js');
            parser = new parser_1.Parser(file);
            tree = parser.parse();
        });
        (0, mocha_1.test)('Root should be named index, it should have one child named App', () => {
            (0, chai_1.expect)(tree).to.have.own.property('name').that.is.equal('index');
            (0, chai_1.expect)(tree.children).to.have.lengthOf(1);
            (0, chai_1.expect)(tree.children[0]).to.have.own.property('name').that.is.equal('App');
        });
        (0, mocha_1.test)('App should have three children, Page1, Page2 and Page3, all found successfully', () => {
            (0, chai_1.expect)(tree.children[0].children[0]).to.have.own.property('name').that.is.equal('Page1');
            (0, chai_1.expect)(tree.children[0].children[0]).to.have.own.property('thirdParty').that.is.false;
            (0, chai_1.expect)(tree.children[0].children[1]).to.have.own.property('name').that.is.equal('Page2');
            (0, chai_1.expect)(tree.children[0].children[1]).to.have.own.property('thirdParty').that.is.false;
            (0, chai_1.expect)(tree.children[0].children[2]).to.have.own.property('name').that.is.equal('Page3');
            (0, chai_1.expect)(tree.children[0].children[2]).to.have.own.property('thirdParty').that.is.false;
        });
    });
});
//# sourceMappingURL=parser.test.js.map