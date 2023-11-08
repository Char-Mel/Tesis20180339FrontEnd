import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';

import { useParams } from 'react-router-dom';
import customAxios from 'src/utils/customAxios';
import dayjs from 'dayjs';

// import PageHeaderRegistrar from './PageHeaderRegistrar';
import PageHeaderVer from './PageHeaderVer'
import PageHeaderRegistrar from './PageHeaderRegistrar'
import { Box } from '@mui/material';
import FormElement from 'src/components/FormView/FormElement';
import PageBotton from './PageBotton';

const TIMESTAMP_ELEMENTS = ['time', 'date', 'datetime'];

function FormUserView() {
  const [name, setName] = useState('');
  const [flow, setFlow] = useState('');
  const [estado, setEstado] = useState('');
  const [formElements, setFormElements] = useState([]);
  const [revisor,setRevisor] = useState(false);
  const { id } = useParams();

  const getForm = async () => {
    try {
      const response = await customAxios.get('/form/user/submitted', {
        params: {
          id
        }
      });

      const { status, data } = response;
      
      if (status === 200) {
        setName(data.name);
        setFlow(data.flow)
        setEstado(data.revisado)
        setFormElements(
          data.elements.map((element) => ({
            ...element,
            value: TIMESTAMP_ELEMENTS.includes(element.type)
              ? dayjs(new Date(element.value))
              : element.value,
            disabled: true
          }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
  const accessToken = window.localStorage.getItem('accessToken');

  const getRevisor = async () => {
    try {
      const response = await customAxios.get('/form/revisor', {
        params: {
          id
        },
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        
      });

      const { status, data } = response;
      
      if (status === 200) {
        setRevisor(data.revisor)
      }
    } catch (err) {
      console.error(err);
    }
  };


  const setValidElement = (index, valid) => {
    setFormElements((oldElements) => {
      const newElements = [...oldElements];
      newElements[index].valid = valid;
      return newElements;
    });
  };

  const setValueElement = (index, value) => {
    setFormElements((oldElements) => {
      const newElements = [...oldElements];
      newElements[index].value = value;
      return newElements;
    });
  };

  useEffect(() => {
    getForm();
    getRevisor();
  }, []);

  
  if (!name) {
    return null;
  }
  if (!flow) {
    return null;
  }

  
  return (
    <>
      <Helmet>
        <title>Enviar  {name}</title>
      </Helmet>

      {(estado === true ) && (
        <PageHeaderVer name={name} flowInfo={flow} _idForm={id} />
      )
      }

      {(estado === false && revisor === true) && (
        <PageHeaderRegistrar name={name} flowInfo={flow} _idForm={id} />
      )}

      <Box
        sx={{
          px: 3,
          py: 2,
          backgroundColor: '#fff',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5
        }}
      >
        {formElements.map((element, index) => {
          return (
            <FormElement
              key={index}
              index={index}
              element={element}
              setValidElement={setValidElement}
              setValueElement={setValueElement}
            />
          );
        })}
      </Box>


      <PageBotton/>
      
    </>
  );
}

export default FormUserView;
