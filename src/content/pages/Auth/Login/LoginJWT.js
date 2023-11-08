import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Link,
  CircularProgress
} from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import useRefMounted from 'src/hooks/useRefMounted';
import { useTranslation } from 'react-i18next';

const LoginJWT = () => {
  const { login } = useAuth();
  const isMountedRef = useRefMounted();
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        correo: 'melgarejo.c@pucp.edu.pe',
        contrasena: 'melgarejo.c@pucp.edu.pe',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        correo: Yup.string()
          .email(t('El correo debe ser valido'))
          .max(255)
          .required(t('El correo es necesario')),
        contrasena: Yup.string()
          .max(255)
          .required(t('La contraseña es necesria'))
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        
        try {
          await login(values.correo, values.contrasena);

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
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
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.correo && errors.correo)}
            fullWidth
            margin="normal"
            autoFocus
            helperText={touched.correo && errors.correo}
            label={t('Correo')}
            name="correo"
            onBlur={handleBlur}
            onChange={handleChange}
            type="correo"
            value={values.correo}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.contrasena && errors.contrasena)}
            fullWidth
            margin="normal"
            helperText={touched.contrasena && errors.contrasena}
            label={t('Contraseña')}
            name="contrasena"
            onBlur={handleBlur}
            onChange={handleChange}
            type="contrasena"
            value={values.contrasena}
            variant="outlined"
          />
          <Box
            alignItems="center"
            display={{ xs: 'block', md: 'flex' }}
            justifyContent="space-between"
          >
            <Link component={RouterLink} to="/account/recover-password">
              <b>{t('Cambiar contraseña')}</b>
            </Link>
          </Box>

          {Boolean(touched.terms && errors.terms) && (
            <FormHelperText error>{errors.terms}</FormHelperText>
          )}

          <Button
            sx={{
              mt: 3
            }}
            color="primary"
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            disabled={isSubmitting}
            type="submit"
            fullWidth
            size="large"
            variant="contained"
          >
            {t('Iniciar sesión')}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginJWT;
