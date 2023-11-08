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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import dayjs from 'dayjs';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

const TextElement = ({ element, index, updateElement }) => {
  const { label, placeholder } = element;
  const [newElement, setNewElement] = useState({ ...element });
  const [open, setOpen] = useState(false);

  if (!newElement.caracter) {
    setNewElement((oldElement) => ({
      ...oldElement,
      caracter: ':'
    }));
  }

  if (!newElement.hourFormat) {
    setNewElement((oldElement) => ({
      ...oldElement,
      hourFormat: 'hh:mm:ss'
    }));
  }


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

  const getFormat = (valorFecha, caracter) => {
    return valorFecha.replace("hora", "hh").replace("minuto", "mm").replace("segundo", "ss").replace(" ", caracter).replace(" ", caracter)
  };

  const updateFormat = (valorFecha, caracterAnterior, caracterNuevo) => {

    return valorFecha.replace("hora", "hh").replace("minuto", "mm").replace("segundo", "ss").replace(caracterAnterior, caracterNuevo).replace(caracterAnterior, caracterNuevo)

  };



  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
          {label}
          <Box sx={{ mt: 0, width: 300 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker', 'TimePicker']}>
                <TimePicker
                  format={newElement.hourFormat}
                  renderInput={(params) => (
                    <TextField placeholder={placeholder} {...params} />
                  )}
                  disabled
                />
              </DemoContainer>
            </LocalizationProvider>
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
                <b>Caracter de separación</b>
              </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={9}>
              <Autocomplete
                disablePortal
                value={newElement.caracter ? newElement.caracter : ':'}
                options={[
                  { label: ':', value: ':' },
                  { label: '.', value: '.' }
                ]
                }
                onChange={(event, newValue) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    hourFormat: updateFormat(newElement.hourFormat, newElement.caracter, newValue.value),
                    caracter: newValue ? newValue.value : ':',

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
                <b>Formato de Hora</b>
              </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={9}>
              <Autocomplete
              
                disablePortal
                value={newElement.valueHourFormat ? newElement.valueHourFormat : 'hora minuto segundo'}
                options={[
                  { label: 'hora minutos segundos', value: 'hora minuto segundo' },
                  { label: 'hora minutos', value: 'hora minuto' }
                ]
                }
                onChange={(event, newValue) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    hourFormat: getFormat(newValue.value, newElement.caracter ? newElement.caracter : '/'),
                    valueHourFormat: newValue

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

            {/* <Grid
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
                <b>Hora máxima</b>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ mt: -1, overflowY: 'hidden' }}
                  components={['TimePicker']}
                >
                  <TimePicker
                    fullWidth
                    format={'hh:mm:ss'}
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
                <b>Hora mínima</b>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ mt: -1, overflowY: 'hidden' }}
                  components={['TimePicker']}
                >
                  <TimePicker
                    value={newElement.minValue}
                    format={'hh:mm:ss'}
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
            </Grid> */}
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
