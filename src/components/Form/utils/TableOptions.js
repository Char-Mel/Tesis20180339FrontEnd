import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, IconButton, TextField } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

export default function TableOptions({ options, setOptions }) {
  const [input, setInput] = useState('');
  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleAddOption = () => {
    if (input.length && !options.includes((option) => option.label === input)) {
      const length = options.length;
      setOptions([...options, { id: `${length + 1}`, label: input }]);
      setInput('');
    } else {
      setError(true);
      setHelperText('Ingrese una opción');
      setTimeout(() => {
        setError(false);
        setHelperText('');
      }, 2000);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '80%' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <TextField
          fullWidth
          name="option"
          placeholder="Opción"
          error={error}
          helperText={helperText}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          value={input}
          variant="outlined"
          size="small"
        />
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
                <TableCell style={{ width: '70%' }}>Opción</TableCell>
                <TableCell style={{ width: '30%' }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {options.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th">{row.label}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteOption(index)}
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
