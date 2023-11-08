// import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Grid, Typography, Button } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Link } from 'react-router-dom';

function PageHeader() {
  const { t } = useTranslation();
  // const [setOpen] = useState(false);

  // const handleCreateUserOpen = () => {
  //   setOpen(true);
  // };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('Formularios creados')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Se listan los formularios creados dentro de la plataforma')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/extended-sidebar/management/forms/register"
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            // onClick={handleCreateUserOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Crear nuevo formulario
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
