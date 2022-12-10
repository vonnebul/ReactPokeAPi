import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Déclaration du renderer du DOM.
ReactDOM.render(
    // Injection d'un Web router.
    <BrowserRouter>
        {/* Injection de l'app. */}
        <App />
    </BrowserRouter>,
    // Selection de l'élément du DOM où sera injecter l'app.
    document.getElementById('root')
);


