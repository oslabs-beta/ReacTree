const React = require('react');
const ReactDOM = require('react-dom');

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './style.css';
import './dagre.css';

// Component import
import Sidebar from './components/Sidebar';

ReactDOM.render(<Sidebar />, document.getElementById('root') as HTMLElement);
