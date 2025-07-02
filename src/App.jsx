import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registro from './assets/components/Registro';
import Login from './assets/components/Login';
import Inicio from './assets/components/Inicio';
import AcercaDe from './assets/components/acercaDe';
import AgregarProducto from './assets/components/agregarProducto';
import Favoritos from './assets/components/Favoritos';
import Navbar from './assets/components/navBar';
import DetalleProducto from './assets/components/detalleProducto';
import EditarProducto from './assets/components/editarProducto';

import { ProductoContext } from './assets/components/ProductoContext';

function App() {
  const { autenticado, usuarioActivo } = useContext(ProductoContext);

  const esAdmin = autenticado && usuarioActivo?.rol === 'admin';

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/agregar"
          element={esAdmin ? <AgregarProducto /> : <Navigate to="/" />}
        />
        <Route path="/acercade" element={<AcercaDe />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/detalle/:id" element={<DetalleProducto />} />
        <Route
          path="/editar/:id"
          element={esAdmin ? <EditarProducto /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
