export const ADAPTER_MAINTENANCES = (maintenances) => {
  return maintenances.map((item) => ({
    id: item.mantenimiento.id, // Unique ID for the row
    marca: item.moto.marca,
    modelo: item.moto.modelo,
    año: item.moto.año,
    nombres: item.cliente.nombres,
    descripcion: item.mantenimiento.descripcion,
  }));
};
