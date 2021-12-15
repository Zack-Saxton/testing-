import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './assets/styles/index.css';
import {Provider} from 'jotai';

ReactDOM.render(<Provider> <App /> </Provider>, document.getElementById('root'));
