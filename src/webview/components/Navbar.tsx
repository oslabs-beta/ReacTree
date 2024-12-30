import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import ClearIcon from '@mui/icons-material/Clear';

// imports for the icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

interface vscode {
  postMessage(message: any): void;
}
// declare function acquireVsCodeApi(): vscode;
declare const vscode: vscode;

const Navbar = ({ rootFile }: any) => {
 // Listen for messages from the extension
  React.useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data;
      if (message.type === 'currentFilePath') {
        sendFileMessage(message.value);
      } else if (message.type === 'parsed-data') {
        console.log('Restoring tree data:', message.value); // Add log
      }
    });
  }, []);

  // onChange function that will send a message to the extension when the user selects a file
function sendFileMessage(filePath: string) {
  vscode.postMessage({
    type: 'onFile',
    value: filePath,
  });
}
  console.log('ROOT', rootFile)

  // Render section
  return (
    <div className="navbar">
      <div className='navbarContents'>
        <label  className='navbarLabel' htmlFor="file-upload">
          </label>
      </div>
    </div>
  );
};

export default Navbar;