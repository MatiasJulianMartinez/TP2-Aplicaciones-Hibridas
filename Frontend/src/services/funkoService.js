import axios from 'axios';
const API_URL = 'http://localhost:3000/api/funkos';

// Obtiene todos los Funkos desde el backend 
export const getFunkos = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Envía los datos de un nuevo Funko al backend y devuelve el objeto creado
export const createFunko = async (funko, token) => {
  const { data } = await axios.post(API_URL, funko, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

// Actualiza el Funko identificado por id con los nuevos datos y devuelve la respuesta
export const updateFunko = async (id, funkoData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, funkoData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Elimina el Funko con el id proporcionado y devuelve la confirmación del backend
export const deleteFunko = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
