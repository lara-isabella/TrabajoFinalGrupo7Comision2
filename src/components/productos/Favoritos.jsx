import React, { useContext, useState, useMemo, useCallback } from 'react';
import { ProductoContext } from "../../context/ProductoContext";
import { Link } from 'react-router-dom';

function Favoritos() {
  const { productos, favoritos, setFavoritos } = useContext(ProductoContext);
  const [mensaje, setMensaje] = useState('');

  // Memorizar el filtrado de productos favoritos para no recalcular en cada render
  const productosFavoritos = useMemo(() => {
    return productos.filter(p => favoritos.includes(p.id) && !p.eliminado);
  }, [productos, favoritos]);

  const desmarcarFavorito = useCallback((id) => {
    setFavoritos(favoritos.filter(f => f !== id));
    setMensaje('Producto desmarcado como favorito!');
    setTimeout(() => setMensaje(''), 3000);
  }, [favoritos, setFavoritos]);

  return (
    <div className="container mt-4">
      <h2>Mis productos favoritos</h2>

      {/* Si hay mensaje, mostrarlo en una alerta */}
      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}

      {productosFavoritos.length === 0 ? (
        <p>No tienes productos favoritos.</p>
      ) : (
        // Si hay favoritos, los muestro en una grilla de cards
        <div className="row">
          {productosFavoritos.map(p => (
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
                  <p className="card-text"><strong>Precio:</strong> ${p.price}</p>
                  <p className="card-text"><strong>Categoría:</strong> {p.category}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <Link to={`/detalle/${p.id}`} className="btn btn-info">Ver más</Link>
                    <button
                      className="btn btn-warning"
                      onClick={() => desmarcarFavorito(p.id)}
                    >
                      Quitar ⭐
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <Link to="/inicio" className="btn btn-secondary">Volver a Inicio</Link>
      </div>
    </div>
  );
}

export default Favoritos;

