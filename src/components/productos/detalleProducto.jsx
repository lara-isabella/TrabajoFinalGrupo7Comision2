import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductoContext } from '../../context/ProductoContext';

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos, favoritos, setFavoritos } = useContext(ProductoContext);

  const [mensaje, setMensaje] = useState('');

  const producto = productos.find(p => p.id == id);

  if (!producto) {
    return (
      <div className="container mt-4">
        <h2>Producto no encontrado</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/inicio')}>
          Volver
        </button>
      </div>
    );
  }

  const desmarcarFavorito = () => {
    if (favoritos.includes(producto.id)) {
      setFavoritos(favoritos.filter(f => f !== producto.id));
      setMensaje('Producto desmarcado como favorito!');
      setTimeout(() => setMensaje(''), 3000); 
    }
  };

  return (
    <div className="container mt-4">
      <h2>Detalle del producto</h2>

      {/* Mostrar mensaje de confirmación si existe */}
      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}

      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={producto.image} className="img-fluid rounded-start" alt={producto.title} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{producto.title}</h5>
              <p className="card-text"><strong>ID:</strong> {producto.id}</p>
              <p className="card-text"><strong>Precio:</strong> ${producto.price}</p>
              <p className="card-text"><strong>Categoría:</strong> {producto.category}</p>
              <p className="card-text"><strong>Descripción:</strong> {producto.description}</p>
              <div className="mt-3">
                <button className="btn btn-warning me-2" onClick={desmarcarFavorito}>
                  Desmarcar Favorito ⭐
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/inicio')}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
