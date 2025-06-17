import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (token && !usuario) {
      try {
        const decoded = jwtDecode(token); 
        setUsuario(decoded);
      } catch (error) {
        console.error('Token inválido', error);
        logout();
      }
    }
  }, [token]);

  const login = (nuevoToken, datosUsuario) => {
    setToken(nuevoToken);
    setUsuario(datosUsuario);
    localStorage.setItem('token', nuevoToken);
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
