import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStateProvider } from "../src/contexts/GlobalStateProvider";
import './assets/styles/index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<GlobalStateProvider> <App /> </GlobalStateProvider>)