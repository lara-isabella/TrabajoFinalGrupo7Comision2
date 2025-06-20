import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ProductoProvider } from './assets/components/ProductoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductoProvider>
  </React.StrictMode>
);
