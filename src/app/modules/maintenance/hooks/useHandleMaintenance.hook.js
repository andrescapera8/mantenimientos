import { useCallback, useState } from 'react';
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

export const useHandleMaintenance = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(false);

  const maintenancesAll = useCallback(async () => {
    setMaintenances([]);

    try {
      setLoading(true);

      const { mantenimientoDTO, statusResponse } = await getAllMaintenances();

      if (statusResponse.status != 200) {
        return SnackBarUtlities.error('Error al obtener mantenimientos.');
      }

      const maintenances_adapter = ADAPTER_MAINTENANCES(mantenimientoDTO);

      return setMaintenances((prev) => prev.concat(maintenances_adapter));
    } catch (error) {
      SnackBarUtlities.error(error);
    } finally {
      SnackBarUtlities.success('Consulta completada.');
      setLoading(false);
    }
  }, []);

  const handleMaintenance = async ({ values, action }) => {
    const dataMaintenance = MAINTENACES_ADAPTER(values);

    try {
      setLoading(true);

      const maintenanceAction =
        action === 2 ? createMaintenance : updateMaintenance;

      const { statusResponse } = await maintenanceAction({
        dataMaintenance,
      });

      if (statusResponse.status !== 200) {
        return SnackBarUtlities.error('Error al crear mantenimiento.');
      }

      maintenancesAll();
    } catch (error) {
      SnackBarUtlities.error(error);
    } finally {
      SnackBarUtlities.success('Consulta completada.');
      setLoading(false);
    }
  };

  const removeMaintenance = async (maintenance) => {
    try {
      setLoading(true);

      const { data, statusResponse } = await deleteMaintenance({ maintenance });

      if (statusResponse.status != 200) {
        return SnackBarUtlities.error('Error al obtener mantenimientos.');
      }

      return setMaintenances((prev) => prev.concat(data));
    } catch (error) {
      SnackBarUtlities.error(error);
    } finally {
      SnackBarUtlities.success('Consulta completada.');
      setLoading(false);
    }
  };

  return {
    handleMaintenance,
    maintenances,
    loading,
    maintenancesAll,
    removeMaintenance,
  };
};
