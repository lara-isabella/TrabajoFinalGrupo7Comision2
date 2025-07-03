import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import { ProductoProvider } from './context/ProductoContext.jsx';
import AuthProvider from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductoProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ProductoProvider>
  </React.StrictMode>
);
