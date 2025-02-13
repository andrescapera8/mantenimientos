import axios from 'axios';

const URI = 'http://localhost:8084/mantenimiento/v1';

export const getAllCatalogs = async () => {
  const controller = new AbortController();

  const { signal } = controller;

  const { data } = await axios.get(
    `${URI}/catalogo-repuestos`,
    { headers: { 'Content-Type': 'application/json' } },
    {
      signal,
    }
  );

  return data;
};
