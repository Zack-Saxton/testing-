import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStateProvider } from "../src/contexts/GlobalStateProvider";
import './assets/styles/index.css';
import App from './components/App';

ReactDOM.render(<GlobalStateProvider> <App /> </GlobalStateProvider>, document.getElementById('root'));
