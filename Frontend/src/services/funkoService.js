import axios from 'axios';

const API_URL = 'http://localhost:3000/api/funkos';

export const getFunkos = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data; 
};

export const createFunko = async (funko, token) => {
  const { data } = await axios.post("http://localhost:3000/api/funkos", funko, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateFunko = async (id, data, token) => {
  const res = await axios.put(`http://localhost:3000/api/funkos/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteFunko = async (id, token) => {
  const res = await axios.delete(`http://localhost:3000/api/funkos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};