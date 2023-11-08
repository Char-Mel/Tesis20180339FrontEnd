import { useState  } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  styled,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Zoom,
  Typography,
  TextField,
  CircularProgress,
  Avatar,
  Autocomplete,
  IconButton,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useSnackbar } from 'notistack';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import customAxios from 'src/utils/customAxios';


const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Box)(
  ({ theme }) => `

    position: relative;

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
    bottom: -${theme.spacing(2)};
    right: -${theme.spacing(2)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const roles = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Ejecutador', value: 'executer' },
  { label: 'Visualizador', value: 'viewonly' }
];


function PageHeader({ updateUserList }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedRole, setSelectedRole] = useState(null);


  const handleCreateUserOpen = () => {
    setOpen(true);
  };

  const handleCreateUserClose = () => {
    setOpen(false);
  };

  const handleCreateUserSuccess = () => {
    
    enqueueSnackbar(t('El usuario ha sido registrado correctamente'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

    setOpen(false);
  };




  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('Usuarios registrados')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Se listan los usuarios activos y dado de baja dentro de la plataforma'
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            onClick={handleCreateUserOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t('Crear nuevo usuario')}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleCreateUserClose}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('Agregar nuevo usuario')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Agregar información acerca del nuevo usuario'
            )}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            correo: '',
            nombres: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            nombres: Yup.string()
              .max(255)
              .required(t('Los nombres del usuario son obligatorios')),
              apellidoPaterno: Yup.string()
              .max(255)
              .required(t('El apellido paterno es obligatorio')),
              apellidoMaterno: Yup.string()
              .max(255)
              .required(t('El apellido materno es obligatorio')),
              correo: Yup.string()
              .email(t('El correo debe ser una dirección válida'))
              .max(255)
              .required(t('El correo es obligatorio')),
          })}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              const formData = new FormData();

              if (selectedImage) {
                formData.append('file', selectedImage);
              }

              
              let filename = ''
              let originalname = ''

              if (formData.has('file')) {
                const responseFile = await customAxios.post(`/file/upload`, formData);
                const { data } = responseFile;
                filename = data.filename;
                originalname = data.originalname;
              }
                
              const response = await customAxios.post('/user/register',{
                nombre: _values.nombres,
                apellidoPaterno: _values.apellidoPaterno,
                apellidoMaterno: _values.apellidoMaterno,
                rol: selectedRole.value,
                correo: _values.correo,
                imagen: {filename,originalname}
              });
              // console.log('Ga');
              if(response.status === 200){
                resetForm();
                setStatus({ success: true });
                setSubmitting(false);
                handleCreateUserSuccess();
                updateUserList(response.data.user);
              }
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={7}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(
                            touched.nombres && errors.nombres
                          )}
                          fullWidth
                          helperText={touched.nombres && errors.nombres}
                          label={t('Nombres')}
                          name="nombres"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.nombres}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(
                            touched.apellidoPaterno && errors.apellidoPaterno
                          )}
                          fullWidth
                          helperText={touched.apellidoPaterno && errors.apellidoPaterno}
                          label={t('Apellido Paterno')}
                          name="apellidoPaterno"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.apellidoPaterno}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.apellidoMaterno && errors.apellidoMaterno)}
                          fullWidth
                          helperText={touched.apellidoMaterno && errors.apellidoMaterno}
                          label={t('Apellido Materno')}
                          name="apellidoMaterno"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.apellidoMaterno}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.correo && errors.correo)}
                          fullWidth
                          helperText={touched.correo && errors.correo}
                          label={t('Correo electrónico')}
                          name="correo"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          value={values.email}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          disablePortal
                          options={roles}
                          value={selectedRole}
                          onChange={(_, newValue) => setSelectedRole(newValue)}
                          renderInput={(params) => (
                            <TextField
                            
                              fullWidth
                              {...params}
                              label={t('Rol')}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={5} justifyContent="center">
                  <Typography variant="subtitle2" align='center'>
                    {t(
                      'Agregar imagen de usuario'
                    )}
                  </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      mt={3}
                    >
                      <AvatarWrapper>
                        <Avatar
                          variant="rounded"
                        />
                        <ButtonUploadWrapper>
                          <Input
                            accept="image/*"
                            id="icon-button-file"
                            name="icon-button-file"
                            type="file"
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                          />
                          <label htmlFor="icon-button-file">
                            <IconButton component="span" color="primary">
                              <CloudUploadTwoToneIcon />
                            </IconButton>
                          </label>
                        </ButtonUploadWrapper>
                      </AvatarWrapper>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3
                }}
              >
                <Button color="secondary" onClick={handleCreateUserClose}>
                  {t('Cancelar')}
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {t('Agregar usuario')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default PageHeader;
