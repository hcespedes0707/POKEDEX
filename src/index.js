import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Selecciona el elemento root en el DOM
const container = document.getElementById('root');

// Crea el root utilizando createRoot
const root = createRoot(container);

// Renderiza la aplicación con createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
