import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductoContext } from './ProductoContext';

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos, setProductos, usuarioActivo, autenticado } = useContext(ProductoContext);

  const [producto, setProducto] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!autenticado || usuarioActivo?.rol !== 'admin') {
      setError('Acceso denegado: Solo los administradores pueden editar productos.');
      return;
    }

    const productoAEditar = productos.find(p => String(p.id) === id);
    if (!productoAEditar) {
      setError('Producto no encontrado.');
      return;
    }

    setProducto(productoAEditar);
  }, [id, productos, autenticado, usuarioActivo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = (e) => {
    e.preventDefault();

    // Actualizamos el array productos, reemplazando el producto editado (por ID string)
    const nuevosProductos = productos.map(p =>
      String(p.id) === id ? { ...p, ...producto } : p
    );
    setProductos(nuevosProductos);

    // Guardamos en localStorage solo productos que son locales (que no vienen de API)
    const locales = JSON.parse(localStorage.getItem('productos')) || [];
    const nuevosLocales = locales.map(p =>
      String(p.id) === id ? { ...p, ...producto } : p
    );
    localStorage.setItem('productos', JSON.stringify(nuevosLocales));

    navigate('/');
  };

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
        <div className="text-center">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  if (!producto) {
    return <div className="text-center mt-5">Cargando producto...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Editar Producto</h2>
      <form onSubmit={handleGuardar} className="w-75 mx-auto">
        <div className="mb-3">
          <label>Nombre del producto</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={producto.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={producto.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Categoría</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={producto.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={producto.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>URL de imagen</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={producto.image}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning me-3">
            Guardar cambios
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarProducto;
