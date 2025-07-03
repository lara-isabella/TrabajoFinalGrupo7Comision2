import { createContext, useState, useEffect } from "react";
import { inicializarUsuarios } from "../components/auth/Users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    try {
      const session = localStorage.getItem("sessionUser");
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  const autenticado = !!userData;

  useEffect(() => {
    inicializarUsuarios(); // Cargar usuarios iniciales
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("sessionUser", JSON.stringify(userData));
    } else {
      localStorage.removeItem("sessionUser");
    }
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{
        autenticado,
        setAutenticado: (estado) => {
          if (!estado) setUserData(null);
        },
        userEmail: userData?.email || "",
        setUserEmail: (email) =>
          setUserData((prev) => ({ ...prev, email })),
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
