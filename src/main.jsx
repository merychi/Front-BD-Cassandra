import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles.css";
import App from './app';  // Importa tu App.js correctamente

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />  {/* Renderiza el componente App */}
  </React.StrictMode>
);
