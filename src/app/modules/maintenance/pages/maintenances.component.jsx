import Button from '@mui/material/Button';
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleButtonMaintenances = () => {
    maintenancesAll();
  };

  return (
    <section className='container__maintenance'>
      <article className='buttons__space'>
        <ButtonAction
          handleButton={handleButtonMaintenances}
          variant='contained'
          color='primary'
          label='Obtener mantenimeintos'
          loading={loading}
        />
      </article>

      <br />

      {loading && <Loading />}
      {!loading && maintenances.length > 0 && (
        <p>No se encontraron más mantenimeintos...</p>
      )}

      <br />

      <article>
        <TableMaintenances maintenances={maintenances} />
      </article>

      <br />

      <article>
        <Button onClick={handleOpen}>Open modal</Button>
      </article>

      <FormMaintenance
        open={open}
        handleClose={handleClose}
      />
    </section>
  );
}
