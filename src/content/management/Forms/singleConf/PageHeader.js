import { Box, Typography, TextField, Autocomplete } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const getFrecuency = (valor) => {
  if (valor === 'noRestriccion')
    return "Sin límite de tiempo"
  if (valor === 'restriccion')
    return "Restringido por horas"
  return ""
}


function PageHeader({ formData, setFormData, editable }) {
  console.log(formData)
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(value)
  };
  return (
    <>
      <Box display="flex" mb={3} flexDirection={"column"} >
        <Box >
          <Typography variant="h1" mb={3}>
            {t('Formulario:')} {formData.name}
          </Typography>
        </Box>
        <Box >
          <Typography variant='h4' mb={2}>
            {t('Configuración')}
          </Typography>
        </Box>
        <Box display="flex" mb={3} flexDirection={"row"} >
          <Box display="flex" mb={3} flexDirection={"column"} mr={10}>
            <Box>
              <Typography variant='h4'>
                {t('Nombre del formulario')}
              </Typography>
              <TextField
                disabled={!editable}
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                style={{ width: '350px' }}
              />
            </Box>
            <Box>
              <Typography variant='h4' mt={6}>
                {t('Flujo que sigará el formulario')}
              </Typography>
              <TextField
                disabled={!editable}
                value={formData.idFlow.nombre}
                name="flujoFormulario"
                variant="outlined"
                style={{ width: '350px' }}
              />
            </Box>
            <Box>
              <Typography variant="h4" mt={7}>
                {t('Frecuencia de completado')}
              </Typography>
              <Autocomplete
                disablePortal
                disabled={!editable}
                value={getFrecuency(formData.frecuency)}
                options={[
                  { label: "Restringido por horas", value: "restriccion" },
                  { label: "Sin límite de tiempo", value: "noRestriccion" }
                ]}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, frecuency: newValue.value });
                  // console.log(formData)
                }}

                renderInput={(params) => (
                  <TextField
                    fullWidth
                    style={{ width: '300px' }}
                    {...params}
                  />
                )}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection={"column"}>
            <Box mb={3} mr={3}>
              <Typography variant='h4'>
                {t('Descripción del formulario')}
              </Typography>
              <TextField
                value={formData.description}
                disabled={!editable}
                name="description"
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={9}
                style={{
                  width: '600px',
                  marginBottom: '10px'
                }}
              />
            </Box>

            <Box display="flex" flexDirection={"row"}>
              <Box mb={3} mr={3}>
                <Typography variant='h4'>
                  {t('Habilitar a las')}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ mt: -1, overflowY: 'hidden' }}
                    components={['TimePicker']}
                  >
                    <TimePicker
                      sx={{ width: 100 }}
                      value={formData.limiteInferior}
                      slots={{
                        textField: (params) => (
                          <TextField
                            size="small"
                            {...params}
                          />
                        )
                      }}
                      disabled={!editable}
                    />
                  </DemoContainer>
                </LocalizationProvider>

              </Box>

              <Box mb={3} mr={3}>
                <Typography variant='h4'>
                  {t('Deshabilitar a las ')}
                </Typography>



                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ mt: -1, overflowY: 'hidden' }}
                    components={['TimePicker']}
                  >
                    <TimePicker
                      sx={{ width: 100 }}
                      value={formData.limiteSuperior}
                      slots={{
                        textField: (params) => (
                          <TextField
                            size="small"

                            {...params}
                          />
                        )
                      }}
                      disabled
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant='h4'>
          {t('Asignaciones')}
        </Typography>
      </Box>
    </>
  );
}

export default PageHeader;
