import { createContext, useState, useEffect } from 'react';

export const ProductoContext = createContext();

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const productosLocales = JSON.parse(localStorage.getItem('productos')) || [];
        const productosCombinados = [...data, ...productosLocales];
        const conBorrado = productosCombinados.map(p => ({ ...p, eliminado: p.eliminado || false }));
        setProductos(conBorrado);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <ProductoContext.Provider value={{ productos, setProductos, favoritos, setFavoritos }}>
      {children}
    </ProductoContext.Provider>
  );
}
