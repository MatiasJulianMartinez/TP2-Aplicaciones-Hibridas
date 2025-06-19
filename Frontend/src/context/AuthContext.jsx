import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado del token , se inicializa con lo que haya en localStorage
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Estado con los datos del usuario autenticado
  const [usuario, setUsuario] = useState(null);

  // Si hay token pero no usuario cargado, se decodifica el token
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

  // Iniciar sesión: guarda token y usuario
  const login = (nuevoToken, datosUsuario) => {
    setToken(nuevoToken);
    setUsuario(datosUsuario);
    localStorage.setItem('token', nuevoToken);
  };

  // Cerrar sesión: limpia token y usuario del estado y tambien del localStorage
  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('token');
  };

  // Provee el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
