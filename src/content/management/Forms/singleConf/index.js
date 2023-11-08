import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';

import { useParams } from 'react-router-dom';
import customAxios from 'src/utils/customAxios';
import { Grid } from '@mui/material';
import PageHeader from './PageHeader';
import Results from './Results';


function FormUserView() {
  const [data, setData] = useState(null);

  const { formId } = useParams();
  const [editable] = useState(false);
  const getForm = async () => {
    try {
      const response = await customAxios.get('/form/find', {
        params: {
          _id: formId
        }
      });
      const { status, data } = response;

      if (status === 200) {
        setData(data.form);
      }
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    getForm();
    
  }, []);


  if (!data) {
    return null;
  }
  
console.log(data)
  return (
    <>
      <Helmet>
        <title>Enviar formulario </title>
      </Helmet>
      <PageHeader formData={data} setFormData={setData} editable={editable}/>
      
      <Grid item xs={12}>
          <Results formData={data} setFormData={setData} editable={editable}/>
        </Grid>
    </>
  );
}

export default FormUserView;
