import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHandleMaintenance } from '../../hooks/useHandleMaintenance.hook';
import { DOCUMENT_TYPE, MARKS, STATES, YEARS } from '../../utils/utility';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

export default function FormMaintenance({ open, handleClose, maintenance }) {
  const { loading, handleMaintenance } = useHandleMaintenance();

  const [action, setAction] = useState(1); // Crear = 1, Editar = 2

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    const mergeValues = action === 1 ? values : { ...maintenance, ...values };

    handleMaintenance({ values: mergeValues, action });
    handleClose();
  });

  useEffect(() => {
    if (!maintenance.idMoto) setAction(1);
    else setAction(2);

    reset({
      fecha: maintenance.fecha ? dayjs(maintenance.fecha) : null,
      nombres: maintenance.nombres || '',
      tipoDocumento: maintenance.tipoDocumento || '',
      numeroDocumento: maintenance.numeroDocumento || '',
      telefono: maintenance.telefono || '',
      email: maintenance.email || '',
      marca: maintenance.marca || '',
      modelo: maintenance.modelo || '',
      año: maintenance.año || '',
      numeroSerie: maintenance.numeroSerie || '',
      descripcion: maintenance.descripcion || '',
      estado: maintenance.estado || '',
    });
  }, [maintenance, reset]);

  return (
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <h2>Registro!</h2>

        <form onSubmit={onSubmit}>
          <Divider sx={{ my: 2 }}>Datos del cliente</Divider>

          <div>
            <TextField
              fullWidth
              margin='dense'
              type='text'
              label='Nombre Completo'
              variant='outlined'
              {...register('nombres', { required: 'Nombre requerido' })}
            />
            {errors.nombres && (
              <p className='text-red-500'>{errors.nombres.message}</p>
            )}
          </div>

          <FormControl
            fullWidth
            margin='dense'
          >
            <InputLabel>Tipo de documento</InputLabel>
            <Controller
              name='tipoDocumento'
              control={control}
              rules={{ required: 'Tipo de documento requerido' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label='Tipo de documento'
                >
                  {DOCUMENT_TYPE.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.tipoDocumento && (
              <p className='text-red-500'>{errors.tipoDocumento.message}</p>
            )}
          </FormControl>

          <div>
            <TextField
              fullWidth
              margin='dense'
              type='number'
              label='Documento'
              variant='outlined'
              {...register('numeroDocumento', {
                required: 'Documento requerido',
              })}
            />
            {errors.numeroDocumento && (
              <p className='text-red-500'>{errors.numeroDocumento.message}</p>
            )}
          </div>

          <div>
            <TextField
              fullWidth
              margin='dense'
              type='number'
              label='Teléfono'
              variant='outlined'
              {...register('telefono', { required: 'Teléfono requerido' })}
            />
            {errors.telefono && (
              <p className='text-red-500'>{errors.telefono.message}</p>
            )}
          </div>

          <div>
            <TextField
              fullWidth
              margin='dense'
              type='text'
              label='Email'
              variant='outlined'
              {...register('email', { required: 'Email requerido' })}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <Divider sx={{ my: 2 }}>Datos de la moto</Divider>

          <FormControl
            fullWidth
            margin='dense'
          >
            <InputLabel>Marca</InputLabel>
            <Controller
              name='marca'
              control={control}
              rules={{ required: 'Marca requerida' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label='Marca'
                >
                  {MARKS.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.marca && (
              <p className='text-red-500'>{errors.marca.message}</p>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin='dense'
          >
            <InputLabel>Modelo</InputLabel>
            <Controller
              name='modelo'
              control={control}
              rules={{ required: 'Modelo requerido' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label='Modelo'
                >
                  {YEARS.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.modelo && (
              <p className='text-red-500'>{errors.modelo.message}</p>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin='dense'
          >
            <InputLabel>Año</InputLabel>
            <Controller
              name='año'
              control={control}
              rules={{ required: 'Año requerido' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label='Año'
                >
                  {YEARS.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.año && <p className='text-red-500'>{errors.año.message}</p>}
          </FormControl>

          <div>
            <TextField
              fullWidth
              margin='dense'
              type='text'
              label='Num. Serie'
              variant='outlined'
              {...register('numeroSerie', {
                required: 'Número de serie requerido',
              })}
            />
            {errors.numeroSerie && (
              <p className='text-red-500'>{errors.numeroSerie.message}</p>
            )}
          </div>

          <Divider sx={{ my: 2 }}>Mantenimiento</Divider>

          <Controller
            name='fecha'
            control={control}
            rules={{ required: 'Fecha requerida' }}
            render={({ field }) => (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale='en-gb'
              >
                <DatePicker
                  {...field}
                  label='Fecha'
                  sx={{ minWidth: '100%' }}
                  format='DD/MM/YYYY'
                  onChange={(newValue) => field.onChange(newValue)}
                />
              </LocalizationProvider>
            )}
          />
          {errors.fecha && (
            <p className='text-red-500'>{errors.fecha.message}</p>
          )}

          <div>
            <TextField
              fullWidth
              margin='dense'
              type='text'
              label='Descripción'
              variant='outlined'
              {...register('descripcion', {
                required: 'Descripción requerida',
              })}
            />
            {errors.descripcion && (
              <p className='text-red-500'>{errors.descripcion.message}</p>
            )}
          </div>

          <FormControl
            fullWidth
            margin='dense'
          >
            <InputLabel>Estado</InputLabel>
            <Controller
              name='estado'
              control={control}
              rules={{ required: 'Estado requerido' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label='Estado'
                >
                  {STATES.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.estado && (
              <p className='text-red-500'>{errors.estado.message}</p>
            )}
          </FormControl>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '20px 0px',
              width: '100%',
            }}
          >
            <LoadingButton
              sx={{ width: '60%' }}
              size='large'
              loading={loading}
              variant='contained'
              type='submit'
              color='primary'
            >
              Enviar
            </LoadingButton>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
