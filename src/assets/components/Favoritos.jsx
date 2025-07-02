// Los productos pueden ser marcados/desmarcados como favoritos. El estado de los productos favoritos se almacenara en un estado global. 
// Mostrar unicamente los productos que el usuario ha marcado como favoritos.

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductoContext } from "./ProductoContext";

function Favoritos() {
  const { favoritos, setFavoritos, productos, autenticado, usuarioActivo } = useContext(ProductoContext);
  const [favoritosFiltrados, setFavoritosFiltrados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!autenticado || !usuarioActivo) return;

    const favoritosStr = favoritos.map(f => String(f));
    const favs = productos.filter(p =>
      favoritosStr.includes(String(p.id)) && !p.eliminado
    );

    // Eliminar duplicados si hubiera
    const sinDuplicados = favs.filter((prod, index, self) =>
      index === self.findIndex(p => String(p.id) === String(prod.id))
    );

    setFavoritosFiltrados(sinDuplicados);
  }, [favoritos, productos, autenticado, usuarioActivo]);

  if (!autenticado || !usuarioActivo) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          Debes iniciar sesión para ver tus productos favoritos.
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Ir a iniciar sesión
        </button>
      </div>
    );
  }

  // Función para sacar producto de favoritos
  const quitarFavorito = (id) => {
    const idStr = String(id);
    setFavoritos(favoritos.filter(favId => favId !== idStr));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Mis Productos Favoritos</h2>

      {favoritosFiltrados.length === 0 ? (
        <p className="text-center text-muted">No hay productos favoritos aún.</p>
      ) : (
        <div className="row">
          {favoritosFiltrados.map((prod) => (
            <div className="col-md-4 mb-4" key={prod.id}>
              <div className="card h-100">
                <img
                  src={prod.image}
                  className="card-img-top"
                  alt={prod.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{prod.title}</h5>
                  <p className="card-text text-muted">${prod.price}</p>
                  <p className="card-text">{prod.category}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <Link to={`/detalle/${prod.id}`} className="btn btn-sm btn-outline-primary">
                      Ver detalle
                    </Link>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => quitarFavorito(prod.id)}
                      title="Quitar de favoritos"
                    >
                      ✖ Quitar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;
