import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './assets/components/Login';
import Inicio from './assets/components/Inicio';
import AcercaDe from './assets/components/acercaDe';
import AgregarProducto from './assets/components/agregarProducto';
import DetalleProducto from './assets/components/detalleProducto';
import Favoritos from './assets/components/Favoritos';
import { ProductoContext } from './assets/components/ProductoContext';

function App() {
  const { autenticado } = useContext(ProductoContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inicio" element={autenticado ? <Inicio /> : <Navigate to="/" />} />
      <Route path="/agregar" element={autenticado ? <AgregarProducto /> : <Navigate to="/" />} />
      <Route path="/acercade" element={<AcercaDe />} />
      <Route path="/favoritos" element={autenticado ? <Favoritos /> : <Navigate to="/" />} />
      <Route path="/detalle/:id" element={autenticado ? <DetalleProducto /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

