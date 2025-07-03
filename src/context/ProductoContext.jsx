import { createContext, useState } from "react";

export const ProductoContext = createContext();

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  return (
    <ProductoContext.Provider
      value={{
        productos,
        setProductos,
        favoritos,
        setFavoritos,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}

export default ProductoProvider;

