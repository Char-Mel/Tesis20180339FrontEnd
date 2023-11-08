import { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
// import Footer from 'src/components/Footer';

import { Grid } from '@mui/material';
import customAxios from 'src/utils/customAxios';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import Results from './Results';

function ManagementGroups() {
  const [forms, setForms] = useState([]);
  const accessToken = window.localStorage.getItem('accessToken');

  const getForms = async () => {
    try {
      const response = await customAxios.get('/form/formulariosHabilitados',{
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const { data, status } = response;
      if (status === 200) {
        setForms(data.forms);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getForms();
    return () => {
      setForms([]);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Formularios asignados</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
          <Results users={forms} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementGroups;
