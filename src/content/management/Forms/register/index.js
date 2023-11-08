

import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import { useState } from 'react';
// import Footer from 'src/components/Footer';

import { Grid } from '@mui/material';


import PageTitleWrapper from 'src/components/PageTitleWrapper';

import Results from './Results';

function ManagementGroups() {

  const [formData, setFormData]=useState({
    name: '',
    flujo: '',
    description:'',
    frecuency: 'noRestriccion',
    asignaciones:[]
  })

  return (
    <>
      <Helmet>
        <title>Creación de formulario</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader formData={formData} setFormData={setFormData}/>
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Results formData={formData} setFormData={setFormData}/>
        </Grid>
      </Grid>
      
    </>
  );
}

export default ManagementGroups;
