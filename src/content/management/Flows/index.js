import { useState, useEffect, useCallback } from 'react';
import customAxios from 'src/utils/customAxios';

import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
// import Footer from 'src/components/Footer';

import { Grid } from '@mui/material';
import useRefMounted from 'src/hooks/useRefMounted';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import Results from './Results';


function ManagementGroups() {
  const isMountedRef = useRefMounted();
  const [flows, setFlows] = useState([]);
  const accessToken = window.localStorage.getItem('accessToken');

  const getFlows = useCallback(async () => {
    try {
      const response = await customAxios.get('/flow/listToken',{
        headers: {
          'Authorization': `Bearer ${accessToken}`
      }
      });

      if (isMountedRef.current) {
        setFlows(response.data.flows);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);


  useEffect(() => {
    getFlows();
  }, [getFlows]);



  const removeFlow = (flowId) => {
    setFlows(prevFlows => prevFlows.filter(flow => flow._id !== flowId));
  };

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
          <Results flows={flows} removeFlow={removeFlow} />
        </Grid>
      </Grid>
      
    </>
  );
}

export default ManagementGroups;
