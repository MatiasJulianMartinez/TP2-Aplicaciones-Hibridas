import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RutaPrivada = ({ children }) => {
  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/ingresar" />;
};

export default RutaPrivada;
