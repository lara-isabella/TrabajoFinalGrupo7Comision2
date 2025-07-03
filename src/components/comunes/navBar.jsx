import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import logo from "../../images/logo.PNG";
import fondoNavbar from "../../images/fondo-navbar.jpg";

function Navbar() {
  const { autenticado, setAutenticado, userEmail, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setAutenticado(false);
    localStorage.removeItem("isAutenticated");
    localStorage.removeItem("sessionUser");
    navigate("/");
  };

  const estiloBotonCirculo = (
    bgColor = "#ffeb3b",
    borderColor = "#fdd835",
    color = "#000"
  ) => ({
    width: "90px",
    height: "90px",
    backgroundColor: bgColor,
    border: `3px solid ${borderColor}`,
    borderRadius: "50%",
    fontSize: "0.8rem",
    fontWeight: "bold",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: color,
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  });

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm px-4 py-2"
      style={{
        backgroundImage: `url(${fondoNavbar})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">

        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={logo}
            alt="Sunny Bunny"
            style={{ height: "70px", objectFit: "contain" }}
          />
        </Link>

        {/* Botones */}
        <div className="d-flex gap-3 align-items-center flex-wrap justify-content-center">

          {/* Bienvenida */}
          {autenticado && (
            <span style={{
              fontSize: "0.9rem",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              color: "#2e4c4c"
            }}>
              ¡Bienvenido/a, {userEmail}!
            </span>
          )}

          {/* Botón Inicio */}
          <Link to="/" style={estiloBotonCirculo()}>
            Inicio
          </Link>

          {/* Solo si está autenticado */}
          {autenticado && (
            <>
              {/* Solo si es admin */}
              {userData?.rol === "admin" && (
                <Link to="/agregar" style={estiloBotonCirculo("#c5e1a5", "#8bc34a")}>
                  Agregar<br />Producto
                </Link>
              )}

              {/* Favoritos */}
              <Link to="/favoritos" style={estiloBotonCirculo("#fff59d", "#fbc02d")}>
                Ver<br />Favoritos
              </Link>

              {/* Contacto */}
              <Link to="/contacto" style={estiloBotonCirculo("#b2dfdb", "#4db6ac")}>
                Contacto
              </Link>

              {/* Cerrar sesión */}
              <button
                onClick={cerrarSesion}
                style={estiloBotonCirculo("#ffcdd2", "#ec407a")}
              >
                Cerrar<br />sesión
              </button>
            </>
          )}

          {/* Si NO está autenticado */}
          {!autenticado && (
            <>
              <Link to="/login" style={estiloBotonCirculo("#fff176", "#fbc02d")}>
                Iniciar<br />sesión
              </Link>
              <Link to="/registro" style={estiloBotonCirculo("#fce4ec", "#f8bbd0")}>
                Registro
              </Link>
              <Link to="/contacto" style={estiloBotonCirculo("#b2dfdb", "#4db6ac")}>
                Contacto
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
