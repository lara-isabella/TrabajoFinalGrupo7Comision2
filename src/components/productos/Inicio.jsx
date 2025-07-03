import React, { useEffect, useContext, useMemo, useCallback } from 'react';
import { ProductoContext } from '../../context/ProductoContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Inicio() {
  const { productos, setProductos, favoritos, setFavoritos } = useContext(ProductoContext);
  const { userData, autenticado } = useContext(AuthContext);

  useEffect(() => {
    async function cargarProductos() {
      const productosLocales = obtenerProductosLocales();
      if (productosLocales.length > 0) {
        setProductos(productosLocales);
      } else {
        const productosDesdeAPI = await obtenerProductosDesdeAPI();
        setProductos(productosDesdeAPI);
        guardarProductosEnLocalStorage(productosDesdeAPI);
      }
    }

    if (productos.length === 0) {
      cargarProductos();
    }
  }, [productos, setProductos]);

  const productosVisibles = useMemo(() => {
    return productos.filter(p => !p.eliminado);
  }, [productos]);

  const borrar = useCallback((id) => {
    const nuevosProductos = productos.map(p =>
      p.id === id ? { ...p, eliminado: true } : p
    );
    setProductos(nuevosProductos);
    guardarProductosEnLocalStorage(nuevosProductos);
  }, [productos, setProductos]);

  const toggleFavorito = useCallback((id) => {
    if (!autenticado) {
      alert('Debes iniciar sesión para marcar favoritos');
      return;
    }
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(f => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  }, [autenticado, favoritos, setFavoritos]);

  const estiloBotonSunny = {
    width: "110px",
    height: "110px",
    backgroundColor: "#ffeb3b",
    border: "4px solid #fdd835",
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
    <div style={{ minHeight: "100vh", paddingTop: "3rem", paddingBottom: "3rem" }}>
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h2 className="text-dark" style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#2e4c4c"
          }}>
            Productos disponibles
          </h2>
        </div>

        <div className="mb-4 d-flex gap-4 flex-wrap justify-content-start align-items-center">
          {userData?.rol === 'admin' && (
            <Link to="/agregar" style={{ ...estiloBotonSunny, backgroundColor: "#c5e1a5", border: "3px solid #8bc34a" }}>
              Agregar<br />Producto
            </Link>
          )}
          <Link to="/favoritos" style={{ ...estiloBotonSunny, backgroundColor: "#fff59d", border: "3px solid #fbc02d" }}>
            Ver<br />Favoritos
          </Link>
        </div>

        <div className="row">
          {productosVisibles.map((p, i) => (
            <div className="col-md-4 mb-4" key={`${p.id}-${i}`}>
              <div className="card h-100 shadow-sm">
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
                  <p>
                    <strong>Descripción:</strong>{" "}
                    {p.description ? p.description.slice(0, 60) + "..." : "Sin descripción"}
                  </p>

                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={favoritos.includes(p.id)}
                      onChange={() => toggleFavorito(p.id)}
                      id={`fav-${p.id}`}
                    />
                    <label className="form-check-label" htmlFor={`fav-${p.id}`}>
                      ⭐ Favorito
                    </label>
                  </div>


                  <div className="d-flex justify-content-between flex-wrap gap-2">
                    <Link to={`/detalle/${p.id}`} className="btn btn-info btn-sm">Ver más</Link>
                    {userData?.rol === 'admin' && (
                      <>
                        <Link to={`/editar/${p.id}`} className="btn btn-secondary btn-sm">Editar</Link>
                        <button className="btn btn-danger btn-sm" onClick={() => borrar(p.id)}>Borrar</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Inicio;
