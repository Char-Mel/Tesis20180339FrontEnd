import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField
} from '@mui/material';

import { randomId } from '@mui/x-data-grid-generator';

import DeleteIcon from '@mui/icons-material/Delete';

export const COLUMN_TYPES = [
  {
    id: 'text',
    label: 'Texto',
    type: 'string'
  },
  {
    id: 'checkbox',
    label: 'Selección',
    type: 'boolean'
  },
  {
    id: 'select',
    label: 'Lista',
    type: 'singleSelect'
  }
];

export default function TableColumnOptions({ columns, setColumns }) {
  const [type, setType] = useState('');
  const [column, setColumn] = useState('');
  const [options, setOptions] = useState('');
  const [shouldOptionsShow, setShouldOptionsShow] = useState(false);

  const handleDeleteColumn = (index) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
  };
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    setShouldOptionsShow(type === 'Lista');
  }, [type]);

  const handleAddOption = () => {
    if (
      type.length &&
      column.length &&
      columns.findIndex(
        (col) => (col.headerName.toLowerCase() === column.toLowerCase()) === -1
      )
    ) {
      let optionsArray = [];
      if (type === 'Lista') {
        optionsArray = options
          .split(',')
          .map((option, index) => ({ id: `${index}`, label: option.trim() }));
      }

      setColumns([
        ...columns,
        {
          id: randomId(),
          headerName: column,
          headerType: type,
          options: optionsArray
        }
      ]);

      setColumn('');
      setOptions('');
    } else {
      setError(true);
      setHelperText('Nombre de columna inválido');
      setTimeout(() => {
        setError(false);
        setHelperText('');
      }, 2000);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box width={150}>
          <Autocomplete
            size="small"
            options={COLUMN_TYPES}
            sx={{ width: 150 }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => {
              setType(params.inputProps.value);
              return <TextField {...params} label="Tipo" />;
            }}
          />
        </Box>
        <TextField
          sx={{ width: 200 }}
          fullWidth
          name="column"
          label="Nombre de columna"
          placeholder="Columna"
          error={error}
          helperText={helperText}
          onChange={(event) => {
            setColumn(event.target.value);
          }}
          value={column}
          variant="outlined"
          size="small"
        />
        {shouldOptionsShow && (
          <TextField
            sx={{ width: 300 }}
            fullWidth
            name="options"
            label="Ingrese opciones separados por coma"
            placeholder="Ingrese opciones separados por coma"
            onChange={(event) => {
              setOptions(event.target.value);
            }}
            value={options}
            variant="outlined"
            size="small"
          />
        )}
        <Button
          sx={{
            mt: 0
          }}
          onClick={handleAddOption}
          variant="contained"
          size="small"
        >
          Agregar
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ fontSize: 12 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '30%' }}>
                  Nombre de Columna
                </TableCell>
                <TableCell style={{ width: '20%' }}>Tipo de Columna</TableCell>
                <TableCell style={{ width: '35%' }}>Opciones (Lista)</TableCell>
                <TableCell style={{ width: '15%' }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {columns.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th">{row.headerName}</TableCell>
                  <TableCell component="th">{row.headerType}</TableCell>
                  <TableCell component="th">
                    {row.options.map((option) => option.label).join(', ')}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteColumn(index)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
