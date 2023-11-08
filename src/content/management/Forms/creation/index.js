import { useState } from 'react';
// import axios from 'src/utils/axios';

import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Box, Button, Grid, Zoom } from '@mui/material';
import './index.css';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import InputElement from './InputElement';
import UiElement from './UiElement';
import DraggableElement from 'src/components/Form/DraggableElement';
import customAxios from 'src/utils/customAxios';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';

const UiTypesElements = ['header', 'subheader', 'separator'];

function ManagementForm() {
  
  
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const formDataString = searchParams.get('formData');
  const formData = JSON.parse(decodeURIComponent(formDataString));
  const accessToken = window.localStorage.getItem('accessToken');

  const [elements, setElements] = useState([
    new UiElement({
      id: '1',
      type: 'header'
    })
  ]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    setElements((oldElements) => {
      const items = Array.from(oldElements);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      return items;
    });
  }

  const insertElement = (input) => {
    
    setElements((oldElements) => {
      let newElement;
      const { id: type } = input;
      if (UiTypesElements.includes(type)) {
        newElement = new UiElement({
          id: (oldElements.length + 1).toString(),
          type
        });
      } else {
        newElement = new InputElement({
          id: (oldElements.length + 1).toString(),
          type
        });
      }

      return [...oldElements, newElement];
    });
  };

  const updateElement = (newElement, index) => {
    setElements((oldElements) => {
      const newElements = [...oldElements];
      newElements[index] = newElement;
      setElements(newElements);
    });
  };

  const deleteElement = (index) => {
    setElements((oldElements) => {
      const newElements = [...oldElements];
      newElements.splice(index, 1);
      setElements(newElements);
    });
  };

  const createForm = async () => {
    // console.log(formData);
    const response = await customAxios.post('/form/layout', {
    name:formData.name,
    idFlow:formData.flujo,
    frecuency: formData.frecuency,
    asignaciones: formData.asignaciones,
    description: formData.description,
    limiteInferior: formData.limiteInferior,
    limiteSuperior: formData.limiteSuperior,
    elements
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.status === 200) {
      enqueueSnackbar('El formulario se ha creado satisfactoriamente', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        TransitionComponent: Zoom
      });
      navigate(`/${location.pathname.split('/')[1]}/management/forms/list`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Creación de formulario</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader insertElement={insertElement} createForm={createForm} />
      </PageTitleWrapper>

      <Grid
        sx={{
          pl: 4,
          pr: 0
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid
          item
          xs={12}
          sx={{ pr: 4, pt: 0, pb: 4, backgroundColor: '#fff', width: '100%' }}
        >
          <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
            <Droppable droppableId="elements">
              {(provided) => (
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {elements.map((element, index) => {
                    return (
                      <Draggable
                        key={element.id}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <DraggableElement
                              element={element}
                              index={index}
                              updateElement={updateElement}
                              deleteElement={deleteElement}
                            />
                          </Box>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>

      <Box sx={{ px: 4, py: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          sx={{
            mt: 0,
            py: 1,
            px: 2
          }}
          onClick={createForm}
          variant="contained"
          size="small"
        >
          Publicar
        </Button>
      </Box>
      {/* <Footer /> */}
    </>
  );
}

export default ManagementForm;
