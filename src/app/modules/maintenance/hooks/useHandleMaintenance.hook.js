import { useContext } from 'react';
import { MaintenanceContext } from '../context/maintenance.context';

export const useMaintenanceContext = () => {
  const context = useContext(MaintenanceContext);

  if (!context) {
    throw new Error(
      'useMaintenanceContext must be used within an MaintenanceProvider'
    );
  }

  return context;
};
