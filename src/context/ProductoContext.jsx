import { createContext, useState, useEffect } from "react";

export const ProductoContext = createContext();

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  //leer sessionUser al iniciar para rehidratar
  const [userEmail, setUserEmail] = useState(() => {
    try {
      const storedSession = localStorage.getItem("sessionUser");
      return storedSession ? JSON.parse(storedSession).email : "";
    } catch {
      return "";
    }
  });

  //Determinar si está autenticado en base a sessionUser
  const [autenticado, setAutenticado] = useState(() => {
    try {
      const storedSession = localStorage.getItem("sessionUser");
      return storedSession ? true : false;
    } catch {
      return false;
    }
  });

  //si userEmail cambia, actualizar sessionUser en localStorage
  useEffect(() => {
    if (autenticado && userEmail) {
      localStorage.setItem("sessionUser", JSON.stringify({ email: userEmail }));
    } else {
      localStorage.removeItem("sessionUser");
    }
  }, [autenticado, userEmail]);

  return (
    <ProductoContext.Provider
      value={{
        productos,
        setProductos,
        favoritos,
        setFavoritos,
        autenticado,
        setAutenticado,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}

export default ProductoProvider;
