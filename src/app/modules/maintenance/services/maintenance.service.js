import axios from 'axios';

const URI = 'http://localhost:8084/mantenimiento/v1';

export const getMaintenance = async (maintenance) => {
  // Creamos el controlador para abortar la petición
  const controller = new AbortController();
  // Recuperamos la señal del controlador
  const { signal } = controller;

  const { data } = await axios.get(`${URI}/${maintenance}`, { signal });

  return data;
};

export const getAllMaintenances = async () => {
  // Creamos el controlador para abortar la petición
  const controller = new AbortController();
  // Recuperamos la señal del controlador
  const { signal } = controller;

  const { data } = await axios.get(`${URI}/mantenimientos`, { signal });

  return data;
};

export const createMaintenance = async (maintenance) => {
  // Creamos el controlador para abortar la petición
  const controller = new AbortController();
  // Recuperamos la señal del controlador
  const { signal } = controller;

  const { data } = await axios.post(URI, maintenance, { signal });

  return data;
};

export const updateMaintenance = async (maintenance) => {
  // Creamos el controlador para abortar la petición
  const controller = new AbortController();
  // Recuperamos la señal del controlador
  const { signal } = controller;

  const { data } = await axios.put(URI, maintenance, { signal });

  return data;
};

export const deleteMaintenance = async (maintenance) => {
  // Creamos el controlador para abortar la petición
  const controller = new AbortController();
  // Recuperamos la señal del controlador
  const { signal } = controller;

  const { data } = await axios.delete(`${URI}/${maintenance}`, { signal });

  return data;
};
