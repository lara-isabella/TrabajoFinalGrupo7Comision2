import React, { useEffect, useContext } from 'react';
import { ProductoContext } from './ProductoContext';
import { Link, useNavigate } from 'react-router-dom';

function Inicio() {
  const { productos, setProductos, favoritos, setFavoritos, usuarioActivo, autenticado } = useContext(ProductoContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(apiData => {
        const productosLocales = JSON.parse(localStorage.getItem('productos')) || [];

        // Evitamos duplicados: solo agregamos locales que NO estén en API
        const localesFiltrados = productosLocales.filter(local =>
          !apiData.some(api => String(api.id) === String(local.id))
        );

        const combinados = [...apiData, ...localesFiltrados];
        const conBorrado = combinados.map(p => ({ ...p, eliminado: p.eliminado || false }));

        setProductos(conBorrado);
      });
  }, [setProductos]);

  const borrar = (id) => {
    if (!autenticado || usuarioActivo?.rol !== 'admin') {
      alert("Solo los administradores pueden borrar productos.");
      return;
    }
    setProductos(prev =>
      prev.map(p => String(p.id) === String(id) ? { ...p, eliminado: true } : p)
    );

    // Actualizar localStorage en productos locales
    const locales = JSON.parse(localStorage.getItem('productos')) || [];
    const nuevosLocales = locales.map(p =>
      String(p.id) === String(id) ? { ...p, eliminado: true } : p
    );
    localStorage.setItem('productos', JSON.stringify(nuevosLocales));
  };

  const toggleFavorito = (id) => {
    if (!autenticado) {
      alert('Debes iniciar sesión para marcar productos como favoritos.');
      return;
    }
    const idStr = String(id);
    if (favoritos.includes(idStr)) {
      setFavoritos(favoritos.filter(f => f !== idStr));
    } else {
      setFavoritos([...favoritos, idStr]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Listado de Productos</h2>
      {autenticado && usuarioActivo?.rol === 'admin' && (
        <Link className="btn btn-success mb-3" to="/agregar">Agregar Producto</Link>
      )}
      <div className="row">
        {productos.filter(p => !p.eliminado).map(p => (
          <div className="col-md-4 mb-3" key={`${p.id}-${p.title}`}>
            <div className="card h-100">
              <img src={p.image} className="card-img-top" alt={p.title} style={{ height: '200px', objectFit: 'contain' }} />
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
                    checked={favoritos.includes(String(p.id))}
                    onChange={() => toggleFavorito(p.id)}
                    id={`fav-${p.id}`}
                  />
                  <label className="form-check-label" htmlFor={`fav-${p.id}`}>
                    Favorito ⭐
                  </label>
                </div>

                <div className="d-flex justify-content-between">
                  <Link to={`/detalle/${p.id}`} className="btn btn-info">Ver más</Link>
                  {usuarioActivo?.rol === 'admin' && (
                    <>
                      <Link to={`/editar/${p.id}`} className="btn btn-warning">Editar</Link>
                      <button className="btn btn-danger" onClick={() => borrar(p.id)}>Borrar</button>
                    </>
                  )}
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
