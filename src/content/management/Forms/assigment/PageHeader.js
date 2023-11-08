// import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';


function PageHeader() {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('Formularios asignados')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Se listan los formularios para que se puedan completar')}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
