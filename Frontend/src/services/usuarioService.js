import axios from "axios";

const API = "http://localhost:3000/api/users";

export const getUsuarios = async (token) => {
  const { data } = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createUsuario = async (usuario, token) => {
  const { data } = await axios.post(API, usuario, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateUsuario = async (id, usuario, token) => {
  const { data } = await axios.put(`${API}/${id}`, usuario, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteUsuario = async (id, token) => {
  const { data } = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
