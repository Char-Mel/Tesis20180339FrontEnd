/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { forwardRef } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  IconButton,
  styled,
  TextField,
  Autocomplete,
  Button,
  Zoom,
  Dialog,
  Slide

} from '@mui/material';
import { useTranslation } from 'react-i18next';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import DynamicConfirmModal from 'src/components/ModalReu';
import { useSnackbar } from 'notistack';
import customAxios from 'src/utils/customAxios';
import { backendUrl } from 'src/config';

const ProfileCover = ({ user }) => {
  
  const getUserRoleLabel = (userRole) => {
    const map = {
      admin: {
        text: 'Administrador'
      },
      executer: {
        text: 'Ejecutador'
      },
      viewonly: {
        text: 'Visualizador'
      }
    };

    const { text } = map[userRole];

    return text;
  };

  const DialogWrapper = styled(Dialog)(
    () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
  );

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  const Input = styled('input')({
    display: 'none'
  });

  const { enqueueSnackbar } = useSnackbar();

  const AvatarWrapper = styled(Card)(
    ({ theme }) => `
      position: relative;
      overflow: visible;
      display: inline-block;
      margin-top: -${theme.spacing(0)};
      margin-left: ${theme.spacing(0)};
  
      .MuiAvatar-root {
        width: ${theme.spacing(20)};
        height: ${theme.spacing(20)};
      }
  `
  );

  const ButtonUploadWrapper = styled(Box)(
    ({ theme }) => `
      position: absolute;
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      bottom: -${theme.spacing(1)};
      right: -${theme.spacing(1)};
  
      .MuiIconButton-root {
        border-radius: 100%;
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        padding: 0;
    
        &:hover {
          background: ${theme.colors.primary.dark};
        }
      }
  `
  );

  const EditButton = styled(Button)`
  width : 40px 
  
  `;

  const { t } = useTranslation();
  const toggleEdit = () => {
    setEditable(!editable);
  };

  const [editable, setEditable] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.rol);
  

  const [formData, setFormData] = useState({
    _id: user._id,
    nombre: user.nombre,
    apellidoPaterno: user.apellidoPaterno,
    apellidoMaterno: user.apellidoMaterno,
    correo: user.correo,
    rol: selectedRole,
    imagen: user.imagen? user.imagen : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

  };


  const handleImageChange = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const responseFile = await customAxios.post(`/file/upload`, formData);
    
    const { data } = responseFile;
    const filename = data.filename;
    const originalname = data.originalname;

    setFormData(prevData => ({
      ...prevData,
      imagen: {filename,originalname}
    }));
  };




  const handleBack = () => {
    window.history.back();
  };

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const openConfirmDeleteModal = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);


  };

  const handleDeleteCompleted = async () => {
    setOpenConfirmDelete(false);
    
    try {      
      
      const response = await customAxios.post('/user/update',
        {
          _id: formData._id,
          nombre: formData.nombre,
          apellidoPaterno: formData.apellidoPaterno,
          apellidoMaterno: formData.apellidoMaterno,
          correo: formData.correo,
          rol: selectedRole,
          imagen: formData.imagen
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
  };

  return (
    <>
      <Box display="flex" mb={3} flexDirection={"column"} >
        <Box display={"flex"} flexDirection={"row"}>
          <Typography variant="h1" mb={2}>
            {t('Perfil del usuario')} {user.name}
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"row-reverse"}>
        <EditButton variant="contained" color="primary" onClick={toggleEdit} startIcon={<EditIcon style={{ fontSize: 15 }} />}>
            Editar
          </EditButton>
          </Box>
        <Box mb={3}>
          <Typography variant='h4'>
            {t('Foto de perfil')}
          </Typography>
          <AvatarWrapper >
            <Avatar variant="rounded" alt={formData.imagen ? formData.imagen.originalname : ' '} 
            src={`${backendUrl}/files/${formData.imagen? formData.imagen.filename:"GA" }`}
            />
            <ButtonUploadWrapper hidden={!editable}>
              <Input
                accept="image/*"
                id="icon-button-file"
                name="icon-button-file"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton component="span" color="primary">
                  <UploadTwoToneIcon />
                </IconButton>
              </label>
            </ButtonUploadWrapper>
            
          </AvatarWrapper>
          <Typography mt={3} variant="h2" >
            {t('Detalles del usuario')}
          </Typography>
        </Box>
        <Box display="flex" flexWrap={"wrap"} >
          <Box mb={3} mr={3}>
            <Typography variant='h4'>
              {t('Nombres')}
            </Typography>
            <TextField
              disabled={!editable}
              value={formData.nombre}
              onChange={handleChange}
              name="nombre"
              variant="outlined"
              style={{ width: '350px' }}
            />
          </Box>
          <Box mb={3} mr={3}>
            <Typography variant='h4'>
              {t('Apellido Paterno')}
            </Typography>
            <TextField
              disabled={!editable}
              value={formData.apellidoPaterno}
              onChange={handleChange}
              name="apellidoPaterno"
              variant="outlined"
              style={{ width: '300px' }}
            />
          </Box>
          <Box mb={3} mr={20}>
            <Typography variant='h4'>
              {t('Apellido Materno')}
            </Typography>
            <TextField
              disabled={!editable}
              value={formData.apellidoMaterno}
              onChange={handleChange}
              name="apellidoMaterno"
              variant="outlined"
              style={{ width: '300px' }}
            />
          </Box>
          <Box mb={3} mr={3}>
            <Typography variant='h4'>
              {t('Correo electrónico')}
            </Typography>
            <TextField
              disabled={!editable}
              value={formData.correo}
              onChange={handleChange}
              name="correo"
              variant="outlined"
              style={{ width: '350px' }}
            />
          </Box>
          <Box mb={3} mr={3}>
            <Typography variant="h4">
              {t('Rol')}
            </Typography>
            <Autocomplete
              disablePortal
              disabled={!editable}
              value={getUserRoleLabel(selectedRole)}
              options={[
                { label: "Administrador", value: "admin" },
                { label: "Ejecutador", value: "executer" },
                { label: "Visualizador", value: "viewonly" }
              ]}
              onChange={(event, newValue) => {
                setSelectedRole(newValue.value);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  style={{ width: '200px' }}
                  {...params}
                />
              )}
            />
          </Box>
        </Box>
        <Box mt={10}  display={"flex"} flexDirection={"row-reverse"}>
          <Box ml={2}>
            <Button variant="contained" color="primary" disabled={!editable} onClick={openConfirmDeleteModal}>
              Guardar cambios
            </Button>
          </Box>
          <Box>
            <Button variant="contained" color="secondary" onClick={handleBack} >
              Volver
            </Button>
          </Box>
        </Box>
      </Box>
      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={5}>
          <DynamicConfirmModal titulo={"¿Estás seguro que deseas guardar los cambios?"} icono={<EditIcon />} />

          <Box>
            <Button variant="text" size="large" sx={{ mx: 1 }} onClick={closeConfirmDelete}>
              Cancelar
            </Button>
            <Button onClick={handleDeleteCompleted} size="large" sx={{ mx: 1, px: 3 }} variant="contained">
              Aceptar
            </Button>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileCover;
