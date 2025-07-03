import React, { useEffect, useContext, useMemo, useCallback } from 'react';
import { ProductoContext } from '../../context/ProductoContext';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Inicio() {
  const { productos, setProductos, favoritos, setFavoritos } = useContext(ProductoContext);
  const { userData, autenticado } = useContext(AuthContext);

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


  const productosVisibles = useMemo(
    () => productos.filter((p) => !p.eliminado),
    [productos]
  );

  const borrar = useCallback(
    (id) => {
      const actualizados = productos.map((p) =>
        p.id === id ? { ...p, eliminado: true } : p
      );
      setProductos(actualizados);
      localStorage.setItem("productos", JSON.stringify(actualizados));
    },
    [productos, setProductos]
  );

  const toggleFavorito = useCallback(
    (id) => {
      if (!autenticado) {
        alert("Debes iniciar sesión para marcar favoritos");
        return;
      }
      if (favoritos.includes(id)) {
        setFavoritos(favoritos.filter((f) => f !== id));
      } else {
        setFavoritos([...favoritos, id]);
      }
    },
    [autenticado, favoritos, setFavoritos]
  );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center mb-4">
        <h2
          className="text-center fw-bold"
          style={{
            backgroundColor: '#f8bbd0',
            border: '2px solid #f48fb1',
            color: '#FFFFFF',
            borderRadius: '30px',
            padding: '10px 25px',
            fontSize: '1.2rem',
            width: 'fit-content'
          }}
        >
          Productos disponibles
        </h2>
      </div>
      <div className="row">
        {productosVisibles.map((p, i) => (
          <div className="col-md-4 mb-4" key={`${p.id}-${i}`}>
            <div className="card h-100 shadow">
              <img
                src={p.image}
                className="card-img-top"
                alt={p.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-truncate">{p.title}</h5>
                <p><strong>Precio:</strong> ${p.price}</p>
                <p><strong>Categoría:</strong> {p.category}</p>
                <p><strong>Descripción:</strong> {p.description?.slice(0, 60)}...</p>

                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`fav-${p.id}`}
                    checked={favoritos.includes(p.id)}
                    onChange={() => toggleFavorito(p.id)}
                  />
                  <label className="form-check-label" htmlFor={`fav-${p.id}`}>
                    ⭐ Favorito
                  </label>
                </div>

                <div className="d-flex justify-content-between gap-2 flex-wrap">
                  <Link to={`/detalle/${p.id}`} className="btn btn-info btn-sm">Ver más</Link>
                  {userData?.rol === "admin" && (
                    <>
                      <Link to={`/editar/${p.id}`} className="btn btn-secondary btn-sm">Editar</Link>
                      <button onClick={() => borrar(p.id)} className="btn btn-danger btn-sm">Borrar</button>
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
