import React, { useEffect, useContext } from 'react';
import { ProductoContext } from '../../context/ProductoContext';
import { Link } from 'react-router-dom';

function Inicio() {
  const { productos, setProductos, favoritos, setFavoritos } = useContext(ProductoContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const productosLocales = JSON.parse(localStorage.getItem('productos')) || [];
        const productosCombinados = [...data, ...productosLocales];
        const conBorrado = productosCombinados.map(p => ({ ...p, eliminado: p.eliminado || false }));
        setProductos(conBorrado);
      });
  }, []);

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

  const estiloBoton = {
    width: "90px",
    height: "90px",
    backgroundColor: "#ffeb3b",
    border: "3px solid #fdd835",
    borderRadius: "50%",
    fontSize: "0.8rem",
    fontWeight: "bold",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#000",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Listado de Productos</h2>

      <div className="mb-3 d-flex justify-content-start gap-2">
        <Link to="/agregar" style={estiloBoton}>
          Agregar
        </Link>
        <Link to="/favoritos" style={{ ...estiloBoton, backgroundColor: "#ffe082", borderColor: "#fbc02d" }}>
          Favoritos
        </Link>
      </div>

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
                    checked={favoritos.includes(p.id)}
                    onChange={() => toggleFavorito(p.id)}
                    id={`fav-${p.id}`}
                  />
                  <label className="form-check-label" htmlFor={`fav-${p.id}`}>
                    Favorito ⭐
                  </label>
                </div>

                <div className="d-flex justify-content-between">
                  <Link to={`/detalle/${p.id}`} style={{ ...estiloBoton, width: "80px", height: "80px" }}>
                    Ver<br />más
                  </Link>
                  <button onClick={() => borrar(p.id)} style={{ ...estiloBoton, backgroundColor: "#ffcdd2", borderColor: "#ef5350", width: "80px", height: "80px" }}>
                    Borrar
                  </button>
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
