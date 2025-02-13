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
  // const controller = new AbortController();
  // // Recuperamos la señal del controlador
  // const { signal } = controller;

  // const { data } = await axios.get(`${URI}/mantenimientos`, { signal });

  const data = {
    statusResponse: {
      status: 200,
    },
    mantenimientoDTO: [
      {
        cliente: {
          id: 2,
          tipoDocumento: 1,
          numeroDocumento: 5971105,
          nombres: 'Pedro Perez',
          telefono: 30014785445,
          email: 'pedro@1515gmail.com',
        },
        moto: {
          id: 2,
          marca: 'TVS',
          modelo: 2014,
          año: 2014,
          numeroSerie: '1551220244545',
        },
        mantenimiento: {
          id: 2,
          motoId: 2,
          catalogoMantenimientoId: 1,
          clienteId: 2,
          fecha: 41551585415,
          descripcion: 'Falla de cadenilla',
          estado: 1,
        },
      },
    ],
  };

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
