import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock } from 'react-icons/fa6';
import { IoPerson } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth-context.hook';
import './styles/index.css';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/mantenimiento');
  }, [isAuthenticated, navigate]);

  return (
    <section className='container'>
      <div className='wrapper'>
        <form onSubmit={onSubmit}>
          <h1>¡Bienvenido!</h1>

          <div className='input-box'>
            <input
              type='text'
              placeholder='Correo...'
              {...register('email', { required: true })}
            />
            <IoPerson className='icon' />

            {errors.email && (
              <p className='text-red-500'>El correo es requerido</p>
            )}
          </div>

          <div className='input-box'>
            <input
              type='password'
              placeholder='Contraseña...'
              {...register('password', { required: true })}
            />
            <FaLock className='icon' />

            {errors.password && (
              <p className='text-red-500'>Contraseña requerida</p>
            )}
          </div>

          <div className='remember-forgot'>
            <label>
              <input type='checkbox' />
              Recordar contraseña
            </label>
            <a href='https://dropi.co/'>¿Olvidó la contraseña?</a>
          </div>

          {/* <button type="submit">Ingresar</button> */}

          <LoadingButton
            size='large'
            loading={loading}
            variant='contained'
            type='submit'
            color='primary'
          >
            <span>Ingresar</span>
          </LoadingButton>

          <div className='register-link'>
            <p>
              ¿No tienes cuenta aún? <a href='https://dropi.co/'>Registrarse</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
