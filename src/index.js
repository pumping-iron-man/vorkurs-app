import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'


// app component consists the routes the BrowserRouter needs
const routing = (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )

ReactDOM.render(routing, document.getElementById('root'));
