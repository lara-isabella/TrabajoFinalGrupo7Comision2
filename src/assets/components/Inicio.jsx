import React, { useEffect, useContext } from 'react';
import { ProductoContext } from './ProductoContext';
import { Link } from 'react-router-dom';

function Inicio() {
  const { productos, setProductos, favoritos, setFavoritos } = useContext(ProductoContext);

  useEffect(() => {
    // Solo hace fetch si no hay productos
    if (productos.length === 0) {
      // Intenta cargar productos de localStorage
      const productosLocales = JSON.parse(localStorage.getItem('productos')) || [];
      if (productosLocales.length > 0) {
        setProductos(productosLocales);
      } else {
        // Si no hay nada en localStorage, carga de la API
        fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(data => {
            // Marca todos como no eliminados
            const conBorrado = data.map(p => ({ ...p, eliminado: false }));
            setProductos(conBorrado);
            localStorage.setItem('productos', JSON.stringify(conBorrado));
          });
      }
    }
  }, [productos, setProductos]);

  const borrar = (id) => {
    setProductos(prev =>
      prev.map(p => p.id === id ? { ...p, eliminado: true } : p)
    );
  };

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(f => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Productos</h2>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            localStorage.removeItem('isAutenticated');
            localStorage.removeItem('sessionUser');
            window.location.href = '/';
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <div className="mb-3 d-flex justify-content-start gap-2">
        <Link className="btn btn-success" to="/agregar">Agregar Producto</Link>
        <Link className="btn btn-warning" to="/favoritos">Ver Favoritos ⭐</Link>
      </div>

      <div className="row">
        {productos.filter(p => !p.eliminado).map(p => (
          <div className="col-md-4 mb-3" key={`${p.id}-${p.title}`}>
            <div className="card h-100">
              <img
                src={p.image}
                className="card-img-top"
                alt={p.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text"><strong>ID:</strong> {p.id}</p>
                <p className="card-text"><strong>Precio:</strong> ${p.price}</p>
                <p className="card-text"><strong>Categoría:</strong> {p.category}</p>
                <p className="card-text">
                  <strong>Descripción:</strong> {p.description ? p.description.slice(0, 60) + '...' : 'Sin descripción'}
                </p>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={favoritos.includes(p.id)}
                    onChange={() => toggleFavorito(p.id)}
                    id={`fav-${p.id}`}
                  />
                  <label className="form-check-label" htmlFor={`fav-${p.id}`}>
                    Favorito ⭐
                  </label>
                </div>

                <div className="d-flex justify-content-between flex-wrap gap-2">
                  <Link to={`/detalle/${p.id}`} className="btn btn-info">Ver más</Link>
                  <Link to={`/editar/${p.id}`} className="btn btn-secondary">Editar</Link>
                  <button className="btn btn-danger" onClick={() => borrar(p.id)}>Borrar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inicio;
