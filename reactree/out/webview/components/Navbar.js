"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
// imports for the icons
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const Navbar = ({ rootFile }) => {
    // onChange function that will send a message to the extension when the user selects a file
    const fileMessage = (e) => {
        const filePath = e.target.files[0].path;
        // Reset event target value to null so the same file selection causes onChange event to trigger
        e.target.value = null;
        if (filePath) {
            vscode.postMessage({
                type: "onFile",
                value: filePath
            });
        }
    };
    console.log('ROOT', rootFile);
    // Render section
    return (React.createElement("div", { className: "navbar" },
        React.createElement("input", { type: "file", name: "file", id: "file", className: "inputfile", onChange: (e) => { fileMessage(e); } }),
        React.createElement("label", { htmlFor: "file" },
            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faDownload }),
            React.createElement("strong", { id: "strong_file" }, rootFile ? ` ${rootFile}` : ' Choose a file...'))));
};
exports.default = Navbar;
//# sourceMappingURL=Navbar.js.map