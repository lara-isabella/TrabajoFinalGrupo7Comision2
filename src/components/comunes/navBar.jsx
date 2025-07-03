import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductoContext } from "../../context/ProductoContext";

function Navbar() {
  const { autenticado, setAutenticado, usuarioActivo, setUsuarioActivo } = useContext(ProductoContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('sessionUser');
    setAutenticado(false);
    setUsuarioActivo(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/inicio">
        🛒 ProductosApp
      </Link>

      <div className="ms-auto d-flex align-items-center">
        <Link to="/acercade" className="btn btn-outline-info btn-sm me-2">
          Acerca de
        </Link>

        {autenticado && (
          <Link to="/favoritos" className="btn btn-outline-primary btn-sm me-2">
            Mis favoritos
          </Link>
        )}

        {autenticado && usuarioActivo ? (
          <>
            <span className="me-3">Hola, <strong>{usuarioActivo.nombre}</strong> 👋</span>
            <button className="btn btn-outline-danger btn-sm" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/" className="btn btn-outline-success btn-sm">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
