/* eslint-disable react/prop-types */
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const PAGE_SIZE = 10;

export default function TableMaintenances({ maintenances }) {
  const columns = [
    {
      field: 'moto',
      headerName: 'MARCA',
      flex: 1,
      valueGetter: (params) => params?.marca || '',
    },
    {
      field: 'moto',
      headerName: 'MODELO',
      flex: 1,
      valueGetter: (params) => params?.modelo || '',
    },
    {
      field: 'moto',
      headerName: 'AÑO',
      flex: 1,
      valueGetter: (params) => params?.año || '',
    },
    {
      field: 'cliente',
      headerName: 'NOMBRES',
      flex: 1,
      valueGetter: (params) => params?.nombres || '',
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
        getRowId={(row) => row.mantenimiento.id}
        rows={Array.isArray(maintenances) ? maintenances : []}
        rowCount={maintenances?.length || 0}
        paginationMode="client"
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
