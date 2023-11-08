import { useState } from 'react';

import {
  Grid,
  Typography,
  Button,
  Box,
  Autocomplete,
  TextField
} from '@mui/material';
import types from './types.json';

function PageHeader({ insertElement, createForm }) {
  const [inputSelected, setInputSelected] = useState('');
  
  const handleInsertElement = () => {
    console.log(inputSelected)
    const input = types.find((type) => type.label === inputSelected);
    if (input) {
      insertElement(input);
      setInputSelected('');
    }
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Creación de nuevo formulario
          </Typography>
          <Typography variant="subtitle2">
            Elija e inserte un elemento
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Box width={300}>
                <Autocomplete
                  size="small"
                  options={types}
                  sx={{ width: 300 }}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => {
                    setInputSelected(params.inputProps.value);
                    return <TextField {...params} label="Elemento" />;
                  }}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  sx={{
                    mt: 0,
                    py: 1,
                    px: 2
                  }}
                  onClick={handleInsertElement}
                  variant="contained"
                  size="small"
                  color="info"
                >
                  Insertar
                </Button>
                <Button
                  sx={{
                    mt: 0,
                    py: 1,
                    px: 2
                  }}
                  variant="contained"
                  size="small"
                  onClick={createForm}
                >
                  Publicar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
