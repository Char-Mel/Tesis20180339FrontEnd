import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';
import customAxios from 'src/utils/customAxios';

import PageHeader from './PageHeader';
import { Box } from '@mui/material';
import FormElement from 'src/components/FormView/FormElement';
import PageBotton from './PageBotton';

function FormUserView() {
  const [name, setName] = useState('');
  const accessToken = window.localStorage.getItem('accessToken');
  const [formElements, setFormElements] = useState([]);
  const navigate = useNavigate();
  const [acceso,setAcceso]= useState(true)
  

  const { formId } = useParams();
  const getAcceso = async () => {
    try {
      const response = await customAxios.get('/form/accesosFormulario', {
        params: {
          idLayout: formId
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const { status, data } = response;

      if (status === 200) {
        setAcceso(data.acceso);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const getForm = async () => {
    try {
      const response = await customAxios.get('/form/user', {
        params: {
          id: formId
        }
      });
      const { status, data } = response;

      if (status === 200) {
        setName(data.name);
        setFormElements(
          data.elements.map((element) => ({
            ...element,
            valid: false,
            value:
              element.type === 'checkbox'
                ? false
                : element.type === 'table'
                ? []
                : '',
            requiredAlert: false,
            required: false
          }))
        );
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

  const submitForm = async () => {
    let isValidationCompleted = true;

    setFormElements((oldElements) => {
      const newElements = [...oldElements];
      newElements.forEach((element) => {
        if (!element.valid) {
          element.requiredAlert = true;
          isValidationCompleted = false;
        }
      });
      return newElements;
    });

    if (isValidationCompleted) {
      
      await customAxios.post('/form/submitted', {
        idLayout: formId,
        answers: formElements.map((element) => {
          const { _id, type, value } = element;
          return {
            idElement: _id,
            typeElement: type,
            value
          };
        })
      },{
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });




      formElements.map((element) => {
        const { type, value, minValue, maxValue, mensaje, correo, label, idLayout, alerta} = element;
        
        if ((type === 'number' || type==='decimal') && alerta) {
          if (value < minValue || value > maxValue) {
              customAxios.post('/form/enviarcorreo', {
                correo: correo,
                nombreCampo: label,
                mensaje: mensaje,
                minValue: minValue,
                maxValue: maxValue,
                value: value,
                idLayout:idLayout
            },{
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
          }
        }

        return null;
      })


      navigate(`/extended-sidebar/management/forms/done`);
    }
  };

  useEffect(() => {
    getForm();
    getAcceso();
  }, []);


  if (!name) {
    return null;
  }
  

  return (
    <>
      <Helmet>
        <title>Enviar formulario {name}</title>
      </Helmet>
      <PageHeader name={name} submitForm={submitForm} acceso={acceso} />
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
              acceso={acceso}
            />
          );
        })}
      </Box>
      <PageBotton/>
    </>
  );
}

export default FormUserView;
