import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AgregarProducto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones personalizadas
    if (nombre.trim().length < 3) {
      return setError('El nombre debe tener al menos 3 caracteres.');
    }
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
      return setError('Ingrese un precio válido.');
    }
    if (categoria.trim() === '') {
      return setError('La categoría no puede estar vacía.');
    }
    if (descripcion.trim().length < 10) {
      return setError('La descripción debe tener al menos 10 caracteres.');
    }
    if (!imagen.startsWith('http')) {
      return setError('Debe ser una URL válida para la imagen.');
    }

    // Si pasa las validaciones, creamos un objeto producto
    const nuevoProducto = {
      id: Date.now(), // Generamos un ID ficticio
      title: nombre,
      price: parseFloat(precio),
      category: categoria,
      description: descripcion,
      image: imagen,
      eliminado: false
    };

    // Guardamos temporalmente en localStorage (pueden adaptarlo al contexto)
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));

    // Redirigimos al inicio
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Agregar nuevo producto</h2>
      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <div className="mb-3">
          <label>Nombre del producto</label>
          <input type="text" className="form-control" value={nombre}
            onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input type="text" className="form-control" value={precio}
            onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Categoría</label>
          <input type="text" className="form-control" value={categoria}
            onChange={(e) => setCategoria(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea className="form-control" rows="3" value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>URL de imagen</label>
          <input type="text" className="form-control" value={imagen}
            onChange={(e) => setImagen(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-flex justify-content-center mt-4">
          <button type="submit" className="btn btn-success me-3">Agregar producto</button>
          <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default AgregarProducto;
