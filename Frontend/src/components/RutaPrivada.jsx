import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Función que prohibe el acceso a rutas protegidas según si hay un token válido
const RutaPrivada = ({ children }) => {
  const { token } = useContext(AuthContext); // Obtiene el token desde el contexto

  // Si hay token, muestra el contenido protegido, sino, redirige al login
  return token ? children : <Navigate to="/ingresar" />;
};

export default RutaPrivada;
