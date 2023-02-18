"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_live_1 = require("react-live");
const Modal = (props) => {
    const { modalActive, handleModal, fileContent } = props;
    if (!modalActive) {
        return null;
    }
    const lines = fileContent.split('\n');
    let startLine = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('return')) {
            startLine = i + 1;
            break;
        }
    }
    const result = lines
        .slice(startLine, startLine + 1)
        .join('')
        .trim();
    console.log('COMP', result);
    // let component = eval(fileContent);
    return (React.createElement("div", { className: 'modal' },
        React.createElement("div", { className: "closeModal" },
            React.createElement("p", { onClick: handleModal }, "X")),
        React.createElement(react_live_1.LiveProvider, { code: result },
            React.createElement(react_live_1.LiveEditor, null),
            React.createElement(react_live_1.LiveError, null),
            React.createElement(react_live_1.LivePreview, null))));
};
exports.default = Modal;
//# sourceMappingURL=Modal.js.map