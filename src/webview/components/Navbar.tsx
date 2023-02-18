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
  // onChange function that will send a message to the extension when the user selects a file
  const fileMessage = (e: any) => {
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

  console.log('ROOT', rootFile)

  // Render section
  return (
    <div className="navbar">
      <input type="file" name="file" id="file" className="inputfile" onChange={(e) => {fileMessage(e);}}/>
      <div className='navbarContents'>
        <label id='inputLabel' htmlFor="file">
          {/* <FontAwesomeIcon icon={faDownload}/> */}
          <strong id="strong_file">{rootFile ? ` ${rootFile}` : ' Select File'}</strong>
          <FileUploadRoundedIcon htmlColor='var(--vscode-settings-focusedRowBorder)' style={{fontSize:20, position: 'relative', top: '4px'}}/>
        </label>
        {/* <ClearIcon style={{fontSize:15, marginTop: 2}}/>   */}
      </div>
    </div>
  );
};

export default Navbar;