import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.PNG";
import fondoNavbar from "../../images/fondo-navbar.jpg";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { autenticado, setAutenticado, userEmail } = useContext(AuthContext);
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

        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={logo}
            alt="Sunny Bunny"
            style={{ height: "70px", objectFit: "contain" }}
          />
        </Link>

        <div className="d-flex gap-3 align-items-center flex-wrap justify-content-center">

          {autenticado && (
            <span style={{
              fontSize: "0.9 rem",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              color: "#2e4c4c"
            }}>
              ¡Bienvenido/a, {userEmail}!
            </span>
          )}

          <Link to="/" style={estiloBotonCirculo()}>
            Inicio
          </Link>

          {autenticado && (
            <Link to="/favoritos" style={estiloBotonCirculo("#ffe082", "#ffc107")}>
              Favoritos
            </Link>
          )}

         <Link to="/acercade" style={estiloBotonCirculo("#b2dfdb", "#4db6ac")}>
  Contacto
</Link>


          {!autenticado && (
            <>
              <Link to="/login" style={estiloBotonCirculo("#fff176", "#fbc02d")}>
                Iniciar<br />sesión
              </Link>
              <Link to="/registro" style={estiloBotonCirculo("#fce4ec", "#f8bbd0")}>
                Registro
              </Link>
            </>
          )}

          {autenticado && (
            <button
              onClick={cerrarSesion}
              style={estiloBotonCirculo("#ffcdd2", "#ec407a")}
            >
              Cerrar<br />sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
