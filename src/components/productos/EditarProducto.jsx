import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductoContext } from '../../context/ProductoContext';

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos, setProductos } = useContext(ProductoContext);

  // Memoizamos la búsqueda del producto para evitar recalcular en cada render
  const producto = useMemo(() => {
    return productos.find(p => p.id == id);
  }, [productos, id]);

  // Estados locales para el formulario
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');

  // Inicializamos los estados al cargar el producto
  useEffect(() => {
    if (producto) {
      setNombre(producto.title);
      setPrecio(producto.price);
      setCategoria(producto.category);
      setDescripcion(producto.description);
      setImagen(producto.image);
    }
  }, [producto]);

  // Handlers con useCallback para evitar recrearlos en cada render
  const handleNombreChange = useCallback(e => setNombre(e.target.value), []);
  const handlePrecioChange = useCallback(e => setPrecio(e.target.value), []);
  const handleCategoriaChange = useCallback(e => setCategoria(e.target.value), []);
  const handleDescripcionChange = useCallback(e => setDescripcion(e.target.value), []);
  const handleImagenChange = useCallback(e => setImagen(e.target.value), []);

  // handleSubmit con useCallback y dependencias necesarias
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (nombre.trim().length < 3) return setError('El nombre debe tener al menos 3 caracteres.');
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) return setError('Ingrese un precio válido.');
    if (categoria.trim() === '') return setError('La categoría no puede estar vacía.');
    if (descripcion.trim().length < 10) return setError('La descripción debe tener al menos 10 caracteres.');
    if (!imagen.startsWith('http')) return setError('Debe ser una URL válida para la imagen.');

    const editado = {
      ...producto,
      title: nombre,
      price: parseFloat(precio),
      category: categoria,
      description: descripcion,
      image: imagen
    };

    const actualizados = productos.map(p => p.id == id ? editado : p);
    setProductos(actualizados);
    localStorage.setItem('productos', JSON.stringify(actualizados.filter(p => p.id > 20)));
    navigate('/inicio');
  }, [nombre, precio, categoria, descripcion, imagen, producto, productos, setProductos, id, navigate]);

  if (!producto) {
    return <div className="container mt-5"><p>Producto no encontrado</p></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Editar producto</h2>
      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <div className="mb-3">
          <label>Nombre del producto</label>
          <input type="text" className="form-control" value={nombre} onChange={handleNombreChange} />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input type="text" className="form-control" value={precio} onChange={handlePrecioChange} />
        </div>
        <div className="mb-3">
          <label>Categoría</label>
          <input type="text" className="form-control" value={categoria} onChange={handleCategoriaChange} />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea className="form-control" rows="3" value={descripcion} onChange={handleDescripcionChange} />
        </div>
        <div className="mb-3">
          <label>URL de imagen</label>
          <input type="text" className="form-control" value={imagen} onChange={handleImagenChange} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success">Guardar cambios</button>
      </form>
    </div>
  );
}

export default EditarProducto;

