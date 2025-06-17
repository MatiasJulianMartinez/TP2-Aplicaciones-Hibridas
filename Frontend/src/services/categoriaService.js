import axios from "axios";

const API = "http://localhost:3000/api/categorias";

export const getCategorias = async () => {
  const { data } = await axios.get(API);
  return data;
};

export const createCategoria = async (categoria, token) => {
  const { data } = await axios.post(API, categoria, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateCategoria = async (id, categoria, token) => {
  const { data } = await axios.put(`${API}/${id}`, categoria, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteCategoria = async (id, token) => {
  const { data } = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
