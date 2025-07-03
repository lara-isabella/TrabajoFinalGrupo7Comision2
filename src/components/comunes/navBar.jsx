import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductoContext } from "../../context/ProductoContext";

function Navbar() {
  const { autenticado, setAutenticado, userEmail } = useContext(ProductoContext); // Agregado userEmail
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setAutenticado(false);
    localStorage.removeItem("isAutenticated");
    localStorage.removeItem("sessionUser"); //Elimina sessionUser también al cerrar sesión
    navigate("/");
  };

  return (
    <nav className="navbar bg-dark px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Marca de la página */}
        <span className="navbar-brand text-light fs-4 mb-0">
          ☀️🐰 Sunny Bunny
        </span>

        {/* Botones y mensaje de bienvenida */}
        <div className="d-flex gap-2 align-items-center">

          {/* ✅ Mensaje de bienvenida */}
          {autenticado && (
            <span className="text-light">¡Bienvenido/a, {userEmail}!</span>
          )}

          {/* Inicio visible siempre */}
          <Link to="/" className="btn btn-outline-light">
            🏠 Inicio
          </Link>

          {/* Favoritos solo si está autenticado */}
          {autenticado && (
            <Link to="/favoritos" className="btn btn-warning">
              ⭐ Favoritos
            </Link>
          )}

          {/* Acerca de siempre visible */}
          <Link to="/acercade" className="btn btn-outline-light">
            ℹ️ Acerca de
          </Link>

          {/* Iniciar sesión y Registrarse si NO está autenticado */}
          {!autenticado && (
            <>
              <Link to="/login" className="btn btn-success">
                🔓 Iniciar sesión
              </Link>
              <Link to="/registro" className="btn btn-primary">
                📝 Registrarse
              </Link>
            </>
          )}

          {/* Cerrar sesión si está autenticado */}
          {autenticado && (
            <button onClick={cerrarSesion} className="btn btn-danger">
              🔒 Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
