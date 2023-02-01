import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

interface vscode {
  postMessage(message: any): void;
}
// declare function acquireVsCodeApi(): vscode;
declare const vscode: vscode;

const sendMessage = () => () => vscode.postMessage({ command: 'testing' });

ReactDOM.render(
  <App onClick={sendMessage} />,
  document.getElementById('root')
);
