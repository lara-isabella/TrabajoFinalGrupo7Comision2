import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import Registro from "../auth/registro";
import Inicio from "../productos/Inicio";
import AgregarProducto from "../productos/agregarProducto";
import DetalleProducto from "../productos/detalleProducto";
import EditarProducto from "../productos/EditarProducto";
import Favoritos from "../productos/Favoritos";
import AcercaDe from "../paginas/acercaDe";
import PrivateRoute from "./privateroute";

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/acercade" element={<AcercaDe />} />

      {/* Rutas privadas */}
      <Route path="/inicio" element={<PrivateRoute><Inicio /></PrivateRoute>} />
      <Route path="/agregar" element={<PrivateRoute><AgregarProducto /></PrivateRoute>} />
      <Route path="/favoritos" element={<PrivateRoute><Favoritos /></PrivateRoute>} />
      <Route path="/detalle/:id" element={<PrivateRoute><DetalleProducto /></PrivateRoute>} />
      <Route path="/editar/:id" element={<PrivateRoute><EditarProducto /></PrivateRoute>} />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
