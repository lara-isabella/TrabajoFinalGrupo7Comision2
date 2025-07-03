import { createContext, useState, useEffect } from "react";

export const ProductoContext = createContext();

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const [autenticado, setAutenticado] = useState(() => {
    try {
      const storedAuth = localStorage.getItem("isAutenticated");
      return storedAuth ? JSON.parse(storedAuth) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("isAutenticated", JSON.stringify(autenticado));
  }, [autenticado]);

  return (
    <ProductoContext.Provider
      value={{
        productos,
        setProductos,
        favoritos,
        setFavoritos,
        autenticado,
        setAutenticado,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}

export default ProductoProvider;
