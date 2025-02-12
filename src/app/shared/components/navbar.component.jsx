import {
  AppBar,
  Box,
  Container,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material';
import { Fragment, useId } from 'react';
import { MdInventory } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../modules/auth/hooks/use-auth-context.hook';
import './styles/index.css';

export default function NavBar() {
  const { isAuthenticated, logout } = useAuthContext();
  const pages = [
    { id: useId(), title: 'MANTENIMIENTO', link: '/mantenimiento' },
    { id: useId(), title: 'CATALOGO', link: '/catalogo' },
  ];

  return (
    <AppBar
      position='static'
      sx={{ bgcolor: 'var(--primary-color)' }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <MdInventory />
          <Typography
            variant='h5'
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {isAuthenticated && (
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Fragment key={page.id}>
                    <Divider
                      sx={{ background: 'black', mx: 3 }}
                      orientation='vertical'
                      flexItem
                    />

                    <Link
                      className='link__redirect'
                      to={page.link}
                    >
                      {page.title}
                    </Link>
                  </Fragment>
                ))}
              </Box>
            )}
          </Typography>

          {isAuthenticated && (
            <Link
              className='link__redirect'
              to='/'
              onClick={() => logout()}
            >
              Cerrar sesión
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
