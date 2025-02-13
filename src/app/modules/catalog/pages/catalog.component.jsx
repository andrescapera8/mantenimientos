import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SnackBarUtlities } from '../../../core/utils/snackbar-manager.util';
import { getAllCatalogs } from '../services/catalog.service';

export default function CatalogComponent() {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const allCatalogs = async () => {
    setLoading(false);

    try {
      const { catalogoRtEntities, statusResponse } = await getAllCatalogs();

      if (statusResponse.status !== '204') {
        return SnackBarUtlities.error('Error al obtener mantenimientos.');
      }

      SnackBarUtlities.success('Consulta completada.');
      return setCatalogs((prev) => prev.concat(catalogoRtEntities));
    } catch (error) {
      SnackBarUtlities.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allCatalogs();
  }, []);

  return (
    <>
      <h1>Lista de Catalogo</h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        {!loading
          ? catalogs.length > 0 &&
            catalogs.map((catalog) => (
              <Card
                sx={{ width: '30%' }}
                key={catalog.id + catalog.nombre}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={catalog.imagen}
                  title={catalog.nombre}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                  >
                    {catalog.nombre}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ color: 'text.secondary' }}
                  >
                    {catalog.descripcion}
                  </Typography>

                  <br />

                  <Typography
                    variant='h6'
                    color='secondary'
                  >
                    Precio: ${catalog.precio}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small'>Comprar</Button>
                  <Button size='small'>Añadir al carrito</Button>
                </CardActions>
              </Card>
            ))
          : 'No se encontraron catalogos'}
      </div>
    </>
  );
}
