import axios from "axios";

const API = "http://localhost:3000/api/users";


// Obtiene todos los usuarios desde el backend
export const getUsuarios = async (token) => {
  const { data } = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Crea un nuevo usuario con los datos proporcionados y devuelve el objeto creado
export const createUsuario = async (usuario, token) => {
  const { data } = await axios.post(API, usuario, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Actualiza el usuario indicado por id con los nuevos datos y devuelve la respuesta
export const updateUsuario = async (id, usuario, token) => {
  const { data } = await axios.put(`${API}/${id}`, usuario, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Elimina el usuario con el id proporcionado y devuelve la confirmación del backend
export const deleteUsuario = async (id, token) => {
  const { data } = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
