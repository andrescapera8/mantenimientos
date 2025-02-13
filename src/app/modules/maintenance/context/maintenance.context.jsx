/* eslint-disable react/prop-types */
import { createContext, useCallback, useMemo, useState } from 'react';
import { SnackBarUtlities } from '../../../core/utils/snackbar-manager.util';
import {
  ADAPTER_MAINTENANCES,
  MAINTENACES_ADAPTER,
} from '../adapters/maintenance.adapter';
import {
  createMaintenance,
  deleteMaintenance,
  getAllMaintenances,
  updateMaintenance,
} from '../services/maintenance.service';

export const MaintenanceContext = createContext();

// maintenance.context.jsx

export const MaintenanceProvider = ({ children }) => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(false);

  const maintenancesAll = useCallback(async () => {
    setLoading(true);
    setMaintenances([]);

    try {
      const { mantenimientoDTO, statusResponse } = await getAllMaintenances();

      if (statusResponse.status != 200) {
        return SnackBarUtlities.error('Error al obtener mantenimientos.');
      }

      const maintenances_adapter = ADAPTER_MAINTENANCES(mantenimientoDTO);

      SnackBarUtlities.success('Consulta completada.');
      return setMaintenances((prev) => prev.concat(maintenances_adapter));
    } catch (error) {
      SnackBarUtlities.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleMaintenance = useCallback(
    async ({ values, action }) => {
      setLoading(true);

      const dataMaintenance = MAINTENACES_ADAPTER(values);

      try {
        const maintenanceAction =
          action === 1 ? createMaintenance : updateMaintenance;

        const { status } = await maintenanceAction({
          maintenance: dataMaintenance,
        });

        if (status !== '200') {
          return SnackBarUtlities.error('Error al crear mantenimiento.');
        }

        SnackBarUtlities.success('registro actualizado.');
        maintenancesAll();
      } catch (error) {
        SnackBarUtlities.error(error);
      } finally {
        setLoading(false);
      }
    },
    [maintenancesAll]
  );

  const removeMaintenance = useCallback(async (maintenance) => {
    try {
      setLoading(true);

      const { data, statusResponse } = await deleteMaintenance({ maintenance });

      if (statusResponse.status != 200) {
        return SnackBarUtlities.error('Error al eliminar mantenimiento.');
      }

      SnackBarUtlities.success('Mantenimiento eliminado');
      return setMaintenances((prev) => prev.concat(data));
    } catch (error) {
      SnackBarUtlities.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const MaintenanceContextWrapper = useMemo(
    () => ({
      maintenancesAll,
      handleMaintenance,
      removeMaintenance,
      maintenances,
      loading,
    }),
    [
      maintenances,
      handleMaintenance,
      removeMaintenance,
      maintenancesAll,
      loading,
    ]
  );

  return (
    <MaintenanceContext.Provider value={MaintenanceContextWrapper}>
      {children}
    </MaintenanceContext.Provider>
  );
};
