// src/components/productos/Inicio.jsx
import React, { useEffect, useContext, useMemo, useCallback } from 'react';
import { ProductoContext } from '../../context/ProductoContext';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Inicio() {
  const { productos, setProductos, favoritos, setFavoritos } = useContext(ProductoContext);
  const { userData, autenticado } = useContext(AuthContext);

  useEffect(() => {
  const productosLocales = JSON.parse(localStorage.getItem("productos")) || [];

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((apiData) => {
      const tienda = apiData.map((p) => ({ ...p, eliminado: false }));

      // Unificar por ID: si el local ya tiene un producto con ese ID, se prioriza
      const unificados = [...tienda];

      productosLocales.forEach(local => {
        const index = unificados.findIndex(p => p.id === local.id);
        if (index >= 0) {
          unificados[index] = local;
        } else {
          unificados.push(local);
        }
      });

      setProductos(unificados);
      localStorage.setItem("productos", JSON.stringify(unificados));
    });
}, [setProductos]);


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
    <div className="container py-5">
      <h2 className="mb-4 text-center text-success fw-bold">Productos disponibles</h2>

      <div className="mb-4 d-flex flex-wrap gap-3 justify-content-start">
        {userData?.rol === "admin" && (
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
