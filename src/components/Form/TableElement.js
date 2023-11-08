import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import TableColumnOptions, { COLUMN_TYPES } from './utils/TableColumnOptions';

const TableElement = ({ element, index, updateElement }) => {
  const { label, columns } = element;
  const [newElement, setNewElement] = useState({ ...element });
  const [open, setOpen] = useState(false);
  const [columnsDataGrid, setColumnsDataGrid] = useState(columns);

  const rows = [
    {
      id: 1
    }
  ];

  useEffect(() => {
    setColumnsDataGrid(
      columns.map((column) => ({
        field: column.id,
        headerName: column.headerName,
        editable: true,
        width: 200,
        type: COLUMN_TYPES.find((col) => col.label === column.headerType).type,
        valueOptions: column.options.map((option) => option.label)
      }))
    );
  }, [columns]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSaveElement = async () => {
    setNewElement((oldElement) => {
      const newElement = { ...oldElement };
      updateElement(newElement, index);
      return newElement;
    });

    handleCloseModal();
  };

  const setColumns = (columns) => {
    setNewElement((oldElement) => ({
      ...oldElement,
      columns
    }));
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box sx={{ fontSize: '16px', fontWeight: '500', width: '90%' }}>
          {label}
          <Box sx={{ height: 200, width: 1, pt: 1 }}>
            <DataGrid
              density="compact"
              rows={rows}
              columns={columnsDataGrid}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 25, page: 0 }
                }
              }}
            />
          </Box>
        </Box>
        <Box sx={{ marginLeft: 'auto' }} onClick={handleOpenModal}>
          <IconButton aria-label="edit" size="medium">
            <SettingsIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleCloseModal}>
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            Propiedades
          </Typography>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            p: 2
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              justifyContent="flex-end"
              textAlign={{ sm: 'right' }}
            >
              <Box
                pr={3}
                sx={{
                  pt: 0,
                  pb: { xs: 1, md: 0 }
                }}
                alignSelf="center"
              >
                <b>Valor del texto</b>
              </Box>
            </Grid>
            <Grid
              sx={{
                mb: 1
              }}
              item
              xs={12}
              sm={8}
              md={10}
            >
              <TextField
                fullWidth
                name="name"
                placeholder="Título"
                onChange={(event) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    label: event.target.value
                  }));
                }}
                value={newElement.label}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              justifyContent="flex-end"
              textAlign={{ sm: 'right' }}
            >
              <Box
                pr={3}
                sx={{
                  pt: 0,
                  pb: { xs: 1, md: 0 }
                }}
                alignSelf="center"
              >
                <b>Columnas:</b>
              </Box>
            </Grid>
            <Grid
              sx={{
                mb: 0
              }}
              item
              xs={12}
              sm={8}
              md={10}
            >
              <TableColumnOptions
                columns={newElement.columns}
                setColumns={setColumns}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            py: 2
          }}
        >
          <Button color="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleSaveElement} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableElement;
