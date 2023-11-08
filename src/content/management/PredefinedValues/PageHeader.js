/* eslint-disable jsx-a11y/label-has-for */
import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import wait from 'src/utils/wait';
// import useAuth from 'src/hooks/useAuth';

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
  // Divider,
  TextField,
  CircularProgress,
  // Switch,
  Avatar,
  // Autocomplete,
  IconButton,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useSnackbar } from 'notistack';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';

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

// const roles = [
//   { label: 'Administrator', value: 'admin' },
//   { label: 'Subscriber', value: 'subscriber' },
//   { label: 'Customer', value: 'customer' }
// ];


function PageHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // const { user } = useAuth();

  // const [publicProfile, setPublicProfile] = useState({
  //   public: true
  // });

  // const handlePublicProfile = (event) => {
  //   setPublicProfile({
  //     ...publicProfile,
  //     [event.target.name]: event.target.checked
  //   });
  // };

  const handleCreateUserOpen = () => {
    setOpen(true);
  };

  const handleCreateUserClose = () => {
    setOpen(false);
  };

  const handleCreateUserSuccess = () => {
    enqueueSnackbar(t('The user account was created successfully'), {
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
            {t('Grupos creados')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Se listan los grupos creados dentro de la plataforma'
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
            {t('Crear nuevo grupo')}
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
            {t('Agregar nuevo grupo')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Información necesaria'
            )}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            nombre: '',
            descripcion: '',
            imagen: ''
          }}
          validationSchema={Yup.object().shape({
            nombre: Yup.string()
              .max(255)
              .required(t('El nombre del grupo es un campo obligatorio')),
            descripcion: Yup.string()
              .max(255)
              .required(t('La descripción del grupo es un campo necesario'))
          })}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              await wait(1000);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handleCreateUserSuccess();
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
                  <Grid item xs={12} lg={6}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.nombre && errors.nombre)}
                          fullWidth
                          helperText={touched.nombre && errors.nombre}
                          label={t('Nombre de grupo')}
                          name="nombre"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.nombre}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          inputProps={{style:{ height: "150px" } }} // Set the height to 50 pixels
                          error={Boolean(touched.descripcion && errors.descripcion)}
                          fullWidth
                          multiline
                          helperText={touched.descripcion && errors.descripcion}
                          label={t('Descripción del grupo')}
                          name="descripcion"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.descripcion}
                          variant="outlined"
                          
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
                          // alt={user.name}
                          // src={user.avatar}
                        />
                        <ButtonUploadWrapper>
                          <Input
                            accept="image/*"
                            id="icon-button-file"
                            name="icon-button-file"
                            type="file"
                          />
                          <label htmlFor="icon-button-file">
                            <IconButton component="span" color="primary">
                              <CloudUploadTwoToneIcon />
                            </IconButton>
                          </label>
                        </ButtonUploadWrapper>
                      </AvatarWrapper>
                      {/* <Divider
                        flexItem
                        sx={{
                          m: 4
                        }}
                      /> */}
                      {/* <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            pb: 1
                          }}
                        >
                          {t('Public Profile')}
                        </Typography>
                        <Switch
                          checked={publicProfile.public}
                          onChange={handlePublicProfile}
                          name="public"
                          color="primary"
                        />
                      </Box> */}
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
                  {t('Agregar nuevo grupo')}
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
