import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


import {
  Grid,
  Typography,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';


function PageHeader() {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('Flujos creados')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Se listan los flujos de control, solicitud y soporte dentro de la plataforma'
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            component={Link}
            to="/extended-sidebar/management/flows/register"
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t('Crear nuevo flujo')}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
