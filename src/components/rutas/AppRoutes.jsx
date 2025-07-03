import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import Registro from "../auth/registro";
import Inicio from "../productos/Inicio";
import AgregarProducto from "../productos/agregarProducto";
import DetalleProducto from "../productos/detalleProducto";
import EditarProducto from "../productos/EditarProducto";
import Favoritos from "../productos/Favoritos";
import Contacto from "../paginas/Contacto";
import PrivateRoute from "./privateroute";
import Layout from "../comunes/Layout";

function AppRoutes() {
  return (
    <Routes>
      {/* Ruta raíz con layout aplicado */}
      <Route path="/" element={<Layout />}>
        {/* Rutas públicas */}
        <Route index element={<Inicio />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="contacto" element={<Contacto />} />

        {/* Rutas privadas */}
        <Route
          path="inicio"
          element={
            <PrivateRoute>
              <Inicio />
            </PrivateRoute>
          }
        />
        <Route
          path="agregar"
          element={
            <PrivateRoute>
              <AgregarProducto />
            </PrivateRoute>
          }
        />
        <Route
          path="favoritos"
          element={
            <PrivateRoute>
              <Favoritos />
            </PrivateRoute>
          }
        />
        <Route
          path="detalle/:id"
          element={
            <PrivateRoute>
              <DetalleProducto />
            </PrivateRoute>
          }
        />
        <Route
          path="editar/:id"
          element={
            <PrivateRoute>
              <EditarProducto />
            </PrivateRoute>
          }
        />

        {/* Ruta desconocida */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
