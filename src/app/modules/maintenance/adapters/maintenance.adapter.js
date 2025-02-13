export const ADAPTER_MAINTENANCES = (maintenances) => {
  return maintenances.map((item) => ({
    idCliente: item.cliente.id,
    tipoDocumento: item.cliente.tipoDocumento,
    numeroDocumento: item.cliente.numeroDocumento,
    nombres: item.cliente.nombres,
    telefono: item.cliente.telefono,
    email: item.cliente.email,
    idMoto: item.moto.id,
    marca: item.moto.marca,
    modelo: item.moto.modelo,
    año: item.moto.año,
    numeroSerie: item.moto.numeroSerie,
    idMantenimiento: item.mantenimiento.id,
    catalogoMantenimientoId: item.mantenimiento.catalogoMantenimientoId,
    fecha: new Date(item.mantenimiento.fecha).toISOString().split('T')[0],
    descripcion: item.mantenimiento.descripcion,
    estado: item.mantenimiento.estado,
  }));
};
