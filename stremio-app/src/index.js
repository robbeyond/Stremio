import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Stremio from './Stremio';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Stremio />, document.getElementById('root'));
registerServiceWorker();
