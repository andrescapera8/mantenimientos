import { useState } from 'react';
import { SnackBarUtlities } from '../../../core/utils/snackbar-manager.util';
import {
  createMaintenance,
  getAllMaintenances,
} from '../services/maintenance.service';

export const useHandleMaintenance = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(false);

  const maintenancesAll = async () => {
    setMaintenances([]);

    try {
      setLoading(true);

      const { data, status } = await getAllMaintenances();

      if (status != 200) {
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

  const handleMaintenance = async ({ maintenance }) => {
    setMaintenances([]);

    try {
      setLoading(true);

      const { data, status } = await createMaintenance({ maintenance });

      if (status != 200) {
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

  return { handleMaintenance, maintenances, loading, maintenancesAll };
};
