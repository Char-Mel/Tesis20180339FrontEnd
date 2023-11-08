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
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const TextElement = ({ element, index, updateElement }) => {
  const { label, placeholder } = element;
  const [newElement, setNewElement] = useState({ ...element });
  const [open, setOpen] = useState(false);

  if (!newElement.caracter) {
    setNewElement((oldElement) => ({
      ...oldElement,
      caracter: '/'
    }));
  }
  if (!newElement.dateFormat) {
    setNewElement((oldElement) => ({
      ...oldElement,
      dateFormat: 'DD/MM/YYYY'
    }));
  }

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const getFormat = (valorFecha, caracter) => {
    console.log(valorFecha)
    return valorFecha.replace("dia", "DD").replace("mes", "MM").replace("año", "YYYY").replace(" ", caracter).replace(" ", caracter)

  };

  const updateFormat = (valorFecha, caracterAnterior, caracterNuevo) => {
    
    return valorFecha.replace("dia", "DD").replace("mes", "MM").replace("año", "YYYY").replace(caracterAnterior, caracterNuevo).replace(caracterAnterior, caracterNuevo)
    
  };

  const handleSaveElement = async () => {



    setNewElement((oldElement) => {
      const newElement = { ...oldElement };
      updateElement(newElement, index);
      return newElement;
    });
    console.log(newElement)
    handleCloseModal();
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
          {label}
          <Box sx={{ mt: 1, width: 300 }}>
            <DatePicker
              
              inputFormat={newElement.dateFormat}
              // onChange={(newValue) => {
              //   setNewElement((oldElement) => ({
              //     ...oldElement,
              //     minValue: newValue
              //   }));
              // }}
              renderInput={(params) => (
                <TextField placeholder={placeholder} {...params} />
              )}
              disabled
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
              md={3}
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
              md={9}
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
              md={3}
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
                <b>Etiqueta</b>
              </Box>
            </Grid>

            <Grid
              sx={{
                mb: 0
              }}
              item
              xs={12}
              sm={8}
              md={9}
            >
              <TextField
                fullWidth
                name="name"
                placeholder="Título"
                onChange={(event) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    placeholder: event.target.value
                  }));
                }}
                value={newElement.placeholder}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              justifyContent="flex-end"
              textAlign={{ sm: 'right' }}
            />
            <Grid item xs={12} sm={8} md={9}>
              <FormControlLabel
                required
                control={<Checkbox defaultChecked />}
                label="Obligatorio"
                value={newElement.required}
                onChange={(event) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    required: event.target.checked
                  }));
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
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
                <b>Caracter de separacion</b>
              </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={9}>
              <Autocomplete
                disablePortal
                value={newElement.caracter ? newElement.caracter : '/'}
                options={[
                  { label: '/', value: '/' },
                  { label: '.', value: '.' },
                  { label: '-', value: '-' }
                ]
                }
                onChange={(event, newValue) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    dateFormat: updateFormat(newElement.dateFormat,newElement.caracter,newValue.value),
                    caracter: newValue ? newValue.value : '/',
                    
                  }));



                }}

                renderInput={(params) => (
                  <TextField
                    disabled
                    fullWidth
                    style={{ width: '200px' }}
                    {...params}
                  />
                )}

              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={3}
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
                <b>Formato de fecha</b>
              </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={9}>
              <Autocomplete
                disablePortal
                value={newElement.valueDateFormat ? newElement.valueDateFormat : 'dia mes año'}
                options={[
                  { label: 'dia mes año', value: 'dia mes año' },
                  { label: 'mes dia año', value: 'mes dia año' },
                  { label: 'año mes dia', value: 'año mes dia' },
                  { label: 'año dia mes', value: 'año dia mes ' },
                ]
                }
                onChange={(event, newValue) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    dateFormat: getFormat(newValue.value, newElement.caracter ? newElement.caracter : '/'),
                    valueDateFormat: newValue

                  }));



                }}

                renderInput={(params) => (
                  <TextField
                    disabled
                    fullWidth
                    style={{ width: '200px' }}
                    {...params}
                  />
                )}

              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={3}
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
                <b>Fecha máxima</b>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ mt: -1, overflowY: 'hidden' }}
                  components={['DatePicker']}
                >
                  <DatePicker
                    fullWidth
                    inputFormat={'dd/MM/yyyy'}
                    value={newElement.maxValue}
                    onChange={(newValue) => {
                      setNewElement((oldElement) => ({
                        ...oldElement,
                        maxValue: newValue
                      }));
    
                    }}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        sx={{ width: 300 }}
                        placeholder={placeholder}
                        {...params}
                      />
                    )}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={3}
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
                <b>Fecha mínima</b>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ mt: -1, overflowY: 'hidden' }}
                  components={['DatePicker']}
                >
                  <DatePicker
                  value={newElement.minValue}
                    inputFormat={'dd/MM/yyyy'}
                    onChange={(newValue) => {
                      setNewElement((oldElement) => ({
                        ...oldElement,
                        minValue: newValue
                      }));
    
                    }}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        sx={{ width: 300 }}
                        placeholder={placeholder}
                        {...params}
                      />
                    )}
                  />
                </DemoContainer>
              </LocalizationProvider>
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

export default TextElement;
