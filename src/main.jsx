// Importación de React y ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Renderiza la aplicación en el elemento con el id 'root' utilizando React StrictMode
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
