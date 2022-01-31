import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './components/App';

ReactDOM.render(<Provider> <App /> </Provider>, document.getElementById('root'));
