import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './assets/components/Login';
import Registro from './assets/components/registro';
import Inicio from './assets/components/Inicio';
import AgregarProducto from './assets/components/agregarProducto';
import DetalleProducto from './assets/components/detalleProducto';
import EditarProducto from './assets/components/EditarProducto';
import Favoritos from './assets/components/Favoritos';
import AcercaDe from './assets/components/acercaDe';
import PrivateRoute from './assets/components/privateroute';
import { ProductoContext } from './assets/components/ProductoContext';

function App() {
  const { autenticado } = useContext(ProductoContext);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/acercade" element={<AcercaDe />} />

      {/* Rutas privadas */}
      <Route
        path="/inicio"
        element={
          <PrivateRoute>
            <Inicio />
          </PrivateRoute>
        }
      />
      <Route
        path="/agregar"
        element={
          <PrivateRoute>
            <AgregarProducto />
          </PrivateRoute>
        }
      />
      <Route
        path="/favoritos"
        element={
          <PrivateRoute>
            <Favoritos />
          </PrivateRoute>
        }
      />
      <Route
        path="/detalle/:id"
        element={
          <PrivateRoute>
            <DetalleProducto />
          </PrivateRoute>
        }
      />
      <Route
        path="/editar/:id"
        element={
          <PrivateRoute>
            <EditarProducto />
          </PrivateRoute>
        }
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
