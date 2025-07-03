import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductoContext } from "../../context/ProductoContext";
import logo from "../../../src/images/logo.PNG";

function Navbar() {
  const { autenticado, setAutenticado, userEmail } = useContext(ProductoContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setAutenticado(false);
    localStorage.removeItem("isAutenticated");
    localStorage.removeItem("sessionUser");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Marca de la página */}
        <Link to="/" className="navbar-brand navbar-brand-custom">
          <img
            src={logo}
            alt="Sunny Bunny"
            className="logo me-2"
          />
          Sunny Bunny
        </Link>

        {/* Botones y mensaje de bienvenida */}
        <div className="d-flex gap-2 align-items-center">

          {/*Mensaje de bienvenida */}
          {autenticado && (
            <span className="bienvenida">
              ¡Bienvenido/a, {userEmail}!
            </span>
          )}

          {/* Inicio visible siempre */}
          <Link to="/" className="btn btn-custom btn-inicio">
            🏠 Inicio
          </Link>

          {/* Favoritos solo si está autenticado */}
          {autenticado && (
            <Link to="/favoritos" className="btn btn-custom btn-favoritos">
              ⭐ Favoritos
            </Link>
          )}

          <Link to="/acercade" className="btn btn-custom btn-acercade">
            ℹ️ Acerca de
          </Link>

          {/* Iniciar sesión y Registrarse si NO está autenticado */}
          {!autenticado && (
            <>
              <Link to="/login" className="btn btn-custom btn-login">
                🔓 Iniciar sesión
              </Link>
              <Link to="/registro" className="btn btn-custom btn-registrarse">
                📝 Registrarse
              </Link>
            </>
          )}

          {/* Cerrar sesión si está autenticado */}
          {autenticado && (
            <button onClick={cerrarSesion} className="btn btn-custom btn-cerrar">
              🔒 Cerrar sesión
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
