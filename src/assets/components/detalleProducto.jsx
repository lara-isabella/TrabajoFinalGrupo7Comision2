import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductoContext } from './ProductoContext';

function DetalleProducto() {
  const { id } = useParams();
  const { productos } = useContext(ProductoContext);
  const navigate = useNavigate();

  // Buscar producto por id (recordá que id puede ser string, conviene convertir)
  const producto = productos.find(p => String(p.id) === id);

  if (!producto || producto.eliminado) {
    return (
      <div className="container mt-5">
        <h3>Producto no encontrado.</h3>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Volver</button>
      <div className="card mb-4">
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              src={producto.image}
              alt={producto.title}
              style={{ maxHeight: '300px', objectFit: 'contain' }}
              className="img-fluid p-3"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{producto.title}</h3>
              <p><strong>Precio:</strong> ${producto.price}</p>
              <p><strong>Categoría:</strong> {producto.category}</p>
              <p><strong>Descripción:</strong> {producto.description || 'Sin descripción'}</p>
            </div>
          </div>
        </div>
      </div>

      <Link to={`/editar/${producto.id}`} className="btn btn-primary">
        Editar Producto
      </Link>
    </div>
  );
}

export default DetalleProducto;
