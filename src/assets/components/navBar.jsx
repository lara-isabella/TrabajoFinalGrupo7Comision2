import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductoContext } from './ProductoContext';

function Navbar() {
  const { autenticado, setAutenticado, usuarioActivo, setUsuarioActivo } = useContext(ProductoContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('sessionUser');
    localStorage.removeItem('isAuthenticated');
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
        {autenticado && (
            <>
            <Link to="/favoritos" className="btn btn-outline-primary btn-sm me-2">
                Mis favoritos
            </Link>
            <Link to="/agregar" className="btn btn-outline-warning btn-sm me-2">
                Agregar producto
            </Link>
            <Link to="/acercade" className="btn btn-outline-primary btn-sm me-2">
                Acerca De
            </Link>
            </>
          
        )}

        {autenticado && usuarioActivo ? (
          <>
            <span className="me-3">Hola, <strong>{usuarioActivo.nombre}</strong> 👋</span>
            <button className="btn btn-outline-danger btn-sm" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/Login" className="btn btn-outline-success btn-sm">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
