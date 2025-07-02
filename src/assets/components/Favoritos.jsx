import React, { useContext, useState } from 'react';
import { ProductoContext } from './ProductoContext';
import { Link } from 'react-router-dom';

function Favoritos() {
  // Obtengo del contexto el listado de productos, los favoritos y la función para actualizar favoritos
  const { productos, favoritos, setFavoritos } = useContext(ProductoContext);
  const [mensaje, setMensaje] = useState('');
  const productosFavoritos = productos.filter(p => favoritos.includes(p.id) && !p.eliminado);

  // Función que se ejecuta al desmarcar un producto como favorito
  const desmarcarFavorito = (id) => {
    // Actualizo el estado global quitando el id del producto de la lista de favoritos
    setFavoritos(favoritos.filter(f => f !== id));
    setMensaje('Producto desmarcado como favorito!');
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="container mt-4">
      <h2>Mis productos favoritos</h2>

      {/* Si hay mensaje, mostrarlo en una alerta */}
      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}

      {/* Si no hay productos favoritos, aviso al usuario */}
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
