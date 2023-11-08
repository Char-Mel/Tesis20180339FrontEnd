import { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
// import Footer from 'src/components/Footer';

import { Grid } from '@mui/material';
import customAxios from 'src/utils/customAxios';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import Results from './Results';

function ManagementGroups() {
  
  const [flows, setFlows] = useState([]);
  const accessToken = window.localStorage.getItem('accessToken');
  const getFlows = async () => {
    try {
      const response = await customAxios.get('flow/listarFormulariosConFlujo',{
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const { data, status } = response;
      if (status === 200) {
        setFlows(data.formulariosAsignados);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFlows();
    return () => {
      setFlows([]);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Lista de Flujos</title>
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
          <Results users={flows} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementGroups;
