import { createContext, useState, useEffect } from 'react';
import { inicializarUsuarios } from './Users';

export const ProductoContext = createContext();

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const [autenticado, setAutenticado] = useState(() => {
    return !!localStorage.getItem('sessionUser');
  });

  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    try {
      const storedUser = localStorage.getItem('sessionUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al leer sessionUser del localStorage", error);
      return null;
    }
  });

  // Inicializar usuarios al iniciar la app si no existen
  useEffect(() => {
    inicializarUsuarios();
  }, []);

  // Guardar estado de autenticación en localStorage y limpiar si es false
  useEffect(() => {
    if (autenticado) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('sessionUser');
      setUsuarioActivo(null);
    }
  }, [autenticado]);

  // Cargar productos al iniciar
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        // Obtener productos locales y combinarlos
        const productosLocales = JSON.parse(localStorage.getItem('productos')) || [];
        const productosCombinados = [...data, ...productosLocales];
        // Asegurar la propiedad eliminado
        const conBorrado = productosCombinados.map(p => ({ ...p, eliminado: p.eliminado || false }));
        setProductos(conBorrado);
      } catch (error) {
        console.error("Error al obtener productos desde FakeStore API:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <ProductoContext.Provider value={{
      productos,
      setProductos,
      favoritos,
      setFavoritos,
      autenticado,
      setAutenticado,
      usuarioActivo,
      setUsuarioActivo
    }}>
      {children}
    </ProductoContext.Provider>
  );
}

export default ProductoProvider;
