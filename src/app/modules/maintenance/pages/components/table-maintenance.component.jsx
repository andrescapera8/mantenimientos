/* eslint-disable react/prop-types */
import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DOCUMENT_TYPE } from '../../utils/utility';

const PAGE_SIZE = 10;

export default function TableMaintenances({ maintenances, handleOpen }) {
  const columns = [
    {
      field: 'marca',
      headerName: 'MARCA',
      flex: 1,
    },
    {
      field: 'modelo',
      headerName: 'MODELO',
      flex: 1,
    },
    {
      field: 'año',
      headerName: 'AÑO',
      flex: 1,
    },
    {
      field: 'nombres',
      headerName: 'NOMBRES',
      flex: 1,
    },
    {
      field: 'tipoDocumento',
      headerName: 'TIPO DOC.',
      flex: 1,
      valueGetter: (params) => {
        const found = DOCUMENT_TYPE.find((doc) => doc.id === params);
        return found ? found.name : 'N/A';
      },
    },
    {
      field: 'numeroDocumento',
      headerName: 'NÚMERO DOC.',
      flex: 1,
    },
    {
      field: 'telefono',
      headerName: 'TELÉFONO',
      flex: 1,
    },
    {
      field: 'edit',
      headerName: 'EDITAR',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Button
          color='primary'
          onClick={() => handleOpen(params.row)}
        >
          <Edit fontSize='small' />
        </Button>
      ),
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
        getRowId={(row) => row.idCliente}
        rows={Array.isArray(maintenances) ? maintenances : []} // Ensure it's always an array
        columns={columns}
        pageSizeOptions={[10, 50, 100]}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        initialState={{
          pagination: { paginationModel: { pageSize: PAGE_SIZE, page: 0 } },
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
