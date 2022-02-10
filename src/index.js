import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './components/App';
import { GlobalStateProvider } from "../src/contexts/GlobalStateProvider";

ReactDOM.render(<GlobalStateProvider> <App /> </GlobalStateProvider>, document.getElementById('root'));
