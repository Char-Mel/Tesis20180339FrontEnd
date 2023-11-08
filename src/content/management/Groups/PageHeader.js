/* eslint-disable jsx-a11y/label-has-for */
import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import customAxios from 'src/utils/customAxios';
// import useAuth from 'src/hooks/useAuth';

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Zoom,
  Typography,
  TextField,
  CircularProgress,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useSnackbar } from 'notistack';

function PageHeader({updateUserList}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const accessToken = window.localStorage.getItem('accessToken');
  const handleCreateUserOpen = () => {
    setOpen(true);
  };

  const handleCreateUserClose = () => {
    setOpen(false);
  };

  const handleCreateUserSuccess = () => {
    enqueueSnackbar(t('El grupo ha sido creado correctamente'), {
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
            descripcion: ''
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
              
              const response = await customAxios.post('/group/register',{
                nombre: _values.nombre,
                descripcion: _values.descripcion,
              },
              {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
              }
              });

              
              if(response.status === 200){
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handleCreateUserSuccess();
              updateUserList(response.data.group);
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
                  <Grid item xs={12} lg={12}>
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
