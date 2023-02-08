const React = require('react');
const ReactDOM = require('react-dom');

import './style.css';
import './dagre.css';

// Component import
import Sidebar from './components/Sidebar';

ReactDOM.render(<Sidebar />, document.getElementById('root') as HTMLElement);
