import { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
// import Footer from 'src/components/Footer';

import { Grid } from '@mui/material';
import customAxios from 'src/utils/customAxios';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import Results from './Results';
import { useParams } from 'react-router-dom';

function ManagementGroups() {
  const { _id } = useParams();
  
  const [formAnswered, setFormAnswerede] = useState([]);
  
  const getformAnswered = async () => {
    try {
      const response = await customAxios.get('flow/listRespuestaFlujo',{
        params: {
          _idForm: _id
        }
      });
      const { data, status } = response;
      if (status === 200) {
        setFormAnswerede(data.FormEnviados);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getformAnswered();
  }, []);

  if(!formAnswered){
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Lista de Formulario por responder</title>
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
          <Results users={formAnswered} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementGroups;
