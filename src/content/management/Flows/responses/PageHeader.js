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
            {t('Formularios asignados para la revisión')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Formularios pendientes a su revisión')}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
