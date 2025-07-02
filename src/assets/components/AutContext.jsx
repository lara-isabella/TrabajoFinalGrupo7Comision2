import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(() => !!localStorage.getItem('sessionUser'));
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    try {
      const user = localStorage.getItem('sessionUser');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (autenticado) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('sessionUser');
      setUsuarioActivo(null);
    }
  }, [autenticado]);

  return (
    <AuthContext.Provider value={{ autenticado, setAutenticado, usuarioActivo, setUsuarioActivo }}>
      {children}
    </AuthContext.Provider>
  );
}
