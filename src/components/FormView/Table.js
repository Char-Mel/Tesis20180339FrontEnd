import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { COLUMN_TYPES } from '../Form/utils/TableColumnOptions';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { randomId } from '@mui/x-data-grid-generator';

const DEFAULT_ROWS = 6;

const Table = ({ index, element, setValidElement, setValueElement, acceso}) => {
  const { label, columns, value, disabled } = element;
  console.log("Disabled Table" + disabled)
  const [columnsDataGrid, setColumnsDataGrid] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setValueElement(index, rows);
  }, [rows]);

  const handleDeleteClick = (id) => () => {
    setRows((oldRows) => {
      return oldRows.filter((row) => row.id !== id);
    });
  };

  const mySaveOnServerFunction = (rowUpdated) => {
    setRows((oldRows) => {
      const index = oldRows.findIndex((row) => row.id === rowUpdated.id);
      const newRows = [...oldRows];
      newRows[index] = rowUpdated;
      return newRows;
    });
  };

  const handleInsertRow = () => {
    const row = {
      id: randomId()
    };
    columns.forEach((col) => {
      row[col.id] = '';
    });
    setRows((oldRows) => [...oldRows, row]);
  };

  useEffect(() => {
    const auxColumns = columns.map((column) => ({
      field: column.id,
      headerName: column.headerName,
      editable: true,
      width: 200,
      type: COLUMN_TYPES.find((col) => col.label === column.headerType).type,
      valueOptions: column.options.map((option) => option.label)
    }));

    auxColumns.push({
      field: 'actions',
      type: 'actions',
      headerName: 'Acción',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    });

    setColumnsDataGrid(auxColumns);

    if (disabled) {
      setRows(value);
    } else {
      const auxRows = [];

      for (let i = 0; i < DEFAULT_ROWS; i++) {
        const row = {
          id: randomId()
        };
        columns.forEach((col) => {
          row[col.id] = '';
        });
        auxRows.push(row);
      }
      setRows(auxRows);
    }
  }, [columns]);

  useEffect(() => {
    setValidElement(index, true);
  }, []);

  return (
    <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Box>{label}</Box>
        <Button
        disabled={!acceso}
          sx={{
            mt: 0,
            py: 1,
            px: 2
          }}
          onClick={handleInsertRow}
          variant="contained"
          size="small"
          color="info"
        >
          Añadir Fila
        </Button>
      </Box>
      <Box sx={{ height: 320, width: 1, pt: 1 }}>
        <DataGrid
        
          density="compact"
          rows={rows}
          columns={columnsDataGrid}
          isCellEditable={() => !disabled}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 }
            }
          }}
          processRowUpdate={(updatedRow) => mySaveOnServerFunction(updatedRow)}
        />
      </Box>
    </Box>
  );
};

export default Table;
