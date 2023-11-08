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
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomNumberInput from '../Number';

const TextElement = ({ element, index, updateElement }) => {
  const { label, placeholder } = element;
  const [newElement, setNewElement] = useState({ ...element });
  const [open, setOpen] = useState(false);
  const [alertas, setAlertas] = useState(false)

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

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
          {label}
          <Box sx={{ mt: 1, width: 300 }}>
            <CustomNumberInput
              aria-label="Demo number input"
              placeholder={placeholder}
              step={element.step}
              min={element.minValue}
              max={element.maxValue}
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
                <b>Valor mínimo</b>
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
              <CustomNumberInput
                aria-label="Demo number input"
                placeholder="Ingrese un número"
                value={newElement.minValue}
                step={1}
                onChange={(event, val) =>
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    minValue: val
                  }))
                }
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
                <b>Valor máximo</b>
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
              <CustomNumberInput
                aria-label="Demo number input"
                placeholder="Ingrese un número"
                value={newElement.maxValue}
                step={1}
                onChange={(event, val) =>
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    maxValue: val
                  }))
                }
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
                <b>Incrementador</b>
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
              <CustomNumberInput
                aria-label="Demo number input"
                placeholder="Ingrese un número"
                value={newElement.step}
                step={1}
                min={1}
                onChange={(event, val) =>
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    step: val
                  }))
                }
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
            >
              <Box
                pr={3}
                sx={{
                  pt: 0,
                  pb: { xs: 1, md: 0 }
                }}
                alignSelf="center"
              >
                <b>Cantidad de dígitos</b>
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
                name="numDigits"
                placeholder="Ingrese la cantidad de dígitos que desea mostrar"
                onChange={(event) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    numDigits: event.target.value
                  }));
                }}
                value={newElement.numDigits}
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
                <b>¿Utilizar alertas?</b>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Autocomplete
              disablePortal
                value={newElement.alerta? newElement.alerta === true ? "Generar Alerta" : "Sin Alertas" : ''} 
                options={[
                  { label: 'Generar Alerta', value: true },
                  { label: 'Sin Alertas', value: false }                  
                ]
                }
                onChange={(event, newValue) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    alerta: newValue? newValue.value : ''
                  }));
                  setAlertas(newValue.value)

                }}

                renderInput={(params) => (
                  <TextField
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
                <b>Tipo de alerta</b>
              </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={9}>
              <Autocomplete
              disabled={!alertas}
              disablePortal

                value={newElement.tipoAlerta? newElement.tipoAlerta === 'range'? "Limites Excedidos" : "Completitud" : ''} 

                options={[
                  { label: 'Limites Excedidos', value: 'range' },
                  { label: 'Completitud', value: 'done' }                  
                ]
                }
                onChange={(event, newValue) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    tipoAlerta: newValue? newValue.value : ''
                  }));
                  
                }}
                renderInput={(params) => (
                  <TextField
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
                <b>Mensaje de alerta</b>
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
              disabled={!alertas}
                fullWidth
                rows={6}
                multiline
                name="mensaje"
                placeholder="Mensaje"
                onChange={(event) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    mensaje: event.target.value
                  }));
                }}
                value={newElement.mensaje}
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
                <b>Enviar alerta a</b>
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
              disabled={!alertas}
                fullWidth
                name="correo"
                placeholder="ejemplo@pucp.edu.pe"
                onChange={(event) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    correo: event.target.value
                  }));
                }}
                value={newElement.correo}
                variant="outlined"
                size="small"
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

export default TextElement;
