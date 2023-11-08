import { Helmet } from 'react-helmet-async';
 import ControlView from './ControlView';
import SoporteView from './SoporteView';
import SolicitudView from './SolicitudView';
import Header from './Header';
import { useParams } from 'react-router-dom';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useState, useEffect } from 'react';

import customAxios from 'src/utils/customAxios';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Zoom } from '@mui/material';

function ManagementSingle() {

  const [flow, setFlow] = useState(null);
  const { _id } = useParams();
  const [editable, setEditable] = useState(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const getFlow = async () => {
    
    try {
  
      const response = await customAxios.get('/flow/find',
      {
        params:{
          _id:_id
        }
      });
      const { status, data } = response;

      if (status === 200) {
        setFlow(data.flow);
      }
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    getFlow();
  }, getFlow);

if(!flow){
  return null;
}

const handleUpdate = async () => {
  try {      
      
    const response = await customAxios.post('/flow/update',
      {
        _id: flow._id,
        nombre: flow.nombre,
        descripcion: flow.descripcion
      }
    );
    if(response.status === 200){
    enqueueSnackbar(t('Se han guardado los cambios existosamente'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });
    setEditable(false);
  }

  } catch (error) {
    console.error('Error updating user:', error);
    enqueueSnackbar(t('Ha ocurrido un error al guardar los cambios'), {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });
    
  }
}

const updateFlowType = (campo, newValue) => {
  setFlow(prevState => ({
      ...prevState,
      [campo]: newValue
  }));
}



const renderComponent = () => {
        
  switch (flow.tipo) {
      case 'control':
          return <ControlView flow={flow} editable={editable} handleUpdate={handleUpdate}/>;
      case 'solicitud':
          return <SolicitudView flow={flow} editable={editable} handleUpdate={handleUpdate} />;
      case 'soporte':
          return <SoporteView flow={flow} editable={editable} handleUpdate={handleUpdate}/>;
      default:
          return null;
  }
}


  return (
    <>
      <Helmet>
        <title>Flujo - {flow.nombre} </title>
      </Helmet>


       <PageTitleWrapper>
        <Header flow={flow} updateFlowType={updateFlowType} editable={editable} setEditable={setEditable} />
        {renderComponent()}
       </PageTitleWrapper>


    </>
  );
}

export default ManagementSingle;
