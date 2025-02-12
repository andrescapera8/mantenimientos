/* eslint-disable react/prop-types */
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const PAGE_SIZE = 10;

export default function TableMaintenances({ maintenances }) {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
    },
    {
      field: 'name',
      headerName: 'NOMBRE',
      width: 600,
    },
    {
      field: 'sale_price',
      headerName: 'PRECIO',
      width: 300,
      valueFormatter: (value) =>
        value
          ? parseInt(value).toLocaleString('es-CO', {
              currency: 'COP',
              style: 'currency',
              minimumFractionDigits: 0,
            })
          : 'Precio no existente',
    },
    {
      field: 'stock',
      headerName: 'EXISTENCIA',
      width: 200,
      valueFormatter: (value) =>
        value ? parseInt(value).toLocaleString('es-CO') : 0,
    },
  ];

  return (
    <div style={{ minHeight: 200, width: '100%' }}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            color: 'var(--primary-color)',
            fontWeight: 'bold',
          },
        }}
        rows={maintenances}
        columns={columns}
        pageSizeOptions={[10, 50, 100]}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        initialState={{
          ...maintenances,
          pagination: {
            paginationModel: { pageSize: PAGE_SIZE, page: 0 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
          },
        }}
        localeText={{
          noRowsLabel: 'No hay información cargada',
          columnMenuSortAsc: () => 'Ascendente',
          columnMenuSortDesc: () => 'Descendente',
          columnMenuUnsort: () => false,
        }}
      />
    </div>
  );
}
