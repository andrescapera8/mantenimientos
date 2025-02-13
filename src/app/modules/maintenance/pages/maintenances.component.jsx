import { useState } from 'react';
import Loading from '../../../shared/components/loading.component';
import { useHandleMaintenance } from '../hooks/useHandleMaintenance.hook';
import ButtonAction from './components/button.component';
import FormMaintenance from './components/form-maintenance.component';
import TableMaintenances from './components/table-maintenance.component';
import './styles/index.css';

export default function MaintenanceCrud() {
  const { maintenancesAll, maintenances, loading } = useHandleMaintenance();

  const [open, setOpen] = useState(false);
  const [maintenance, setMaintenance] = useState({});

  const handleOpen = (maintenanceData) => {
    setOpen(true);
    setMaintenance(maintenanceData);
  };
  const handleClose = () => setOpen(false);

  return (
    <section className='container__maintenance'>
      <article className='buttons__space'>
        <ButtonAction
          handleButton={maintenancesAll}
          variant='contained'
          color='primary'
          label='Obtener mantenimientos'
          loading={loading}
        />

        <ButtonAction
          handleButton={handleOpen}
          color='primary'
          label='Crear mantenimiento'
          loading={loading}
        />
      </article>

      <br />

      {loading && <Loading />}

      <br />

      <article>
        <TableMaintenances
          maintenances={maintenances}
          handleOpen={handleOpen}
        />
      </article>

      <FormMaintenance
        open={open}
        handleClose={handleClose}
        maintenance={maintenance}
      />
    </section>
  );
}
