import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Vista del perfil donde se muestra los datos del usuario autenticado
const Perfil = () => {
  const { usuario } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);


  useEffect(() => {
    // Función que obtiene el token, decodifica el ID de usuario y trae su perfil
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const response = await axios.get(
          `http://localhost:3000/api/users/${decoded.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPerfil(response.data);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };

    fetchPerfil();
  }, []);

  // Mientras no llega la respuesta, muestra un mensaje
  if (!perfil) return <p className="text-center mt-5">Cargando perfil...</p>;


  return (
    <div className="container mt-5">
      <h5 className="mb-3 text-muted">
        Bienvenido, {usuario?.email}
      </h5>
      <h2 className="mb-4">Mi Perfil</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Nombre:</strong> {perfil.name}
        </li>
        <li className="list-group-item">
          <strong>Email:</strong> {perfil.email}
        </li>
        <li className="list-group-item">
          <strong>Rol:</strong> {perfil.role}
        </li>
      </ul>
    </div>
  );
};

export default Perfil;
