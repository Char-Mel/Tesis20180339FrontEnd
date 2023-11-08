import React, { useState } from 'react';
import { forwardRef } from 'react';
import {
    Box,
    Typography,
    styled,
    TextField,
    Button,

    Dialog,
    Slide,
    Autocomplete,

} from '@mui/material';
import { useTranslation } from 'react-i18next';

import CheckTwoTone from '@mui/icons-material/CheckTwoTone';
// import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import IconButton from '@mui/material/IconButton';
import DynamicConfirmModal from 'src/components/ModalReu';
// import { useSnackbar } from 'notistack';
// import customAxios from 'src/utils/customAxios';
import InputAdornment from '@mui/material/InputAdornment';

const SoporteRegister = ({flow,editable,handleUpdate}) => {
    const { t } = useTranslation();
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

    const handleDeleteCompleted = () => {
        setOpenConfirmDelete(false);
        handleUpdate();
        
    };

    const getAccion = (accion) => {
        const map = {
            firma: {
            text: 'Firma'
          },
          firmaComentario: {
            text: 'Firma y Comentario'
          },
          comentario: {
            text: 'Comentario'
          }
        };
    
        const { text } = map[accion];
    
        return text;
      };

    return (
        <>
            <Box display="flex" ml={3} flexDirection={"column"} >
                <Box display={"flex"} flexDirection={"row"} >
                    <Box display={"flex"} flexDirection={"column"} mr={8}>
                        <Typography variant='h4'>
                            {t('Validación de acciones necesarias')}
                        </Typography>
                        <TextField
                            disabled
                            value= { '( ' + flow.userNivel[0]._id.correo +' ) ' + flow.userNivel[0]._id.apellidoPaterno +' '+ flow.userNivel[0]._id.nombre}
                            name="revisor"
                            variant="outlined"
                            style={{ width: '350px' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            {/* <SearchTwoToneIcon onClick={handleAddGroupOpen} /> */}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} >
                            <Typography variant='h4' >
                                {t('Accion de revisión')}
                            </Typography>
                            <Autocomplete
                                disabled
                                disablePortal
                                options={[
                                    { label: "Firma", value: "firma" },
                                    { label: "Firma y Comentario", value: "firmaComentario" },
                                    { label: "Comentario", value: "comentario" }
                                ]}
                                // onChange={(event, newValue) => {
                                //     setAction(newValue.value);
                                // }}
                                value={getAccion(flow.accion)}
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
                <Box mt={10} display={"flex"} flexDirection={"row-reverse"}>
                    <Box ml={2}>
                        <Button variant="contained" color="secondary" onClick={handleBack} >
                            Volver
                        </Button>
                    </Box>
                    <Box>
                        <Button variant="contained" color="primary" onClick={openConfirmDeleteModal} disabled={!editable}>
                            Guardar
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
                    <DynamicConfirmModal titulo={"¿Estás seguro que deseas guardar?"} icono={<CheckTwoTone />} />

                    <Box>
                        <Button variant="text" size="large" sx={{ mx: 1 }} onClick={closeConfirmDelete}>
                            Cancelar
                        </Button>
                        <Button onClick={handleDeleteCompleted} size="large" sx={{ mx: 1, px: 3 }} variant="contained" >
                            Aceptar
                        </Button>
                    </Box>
                </Box>
            </DialogWrapper>
        </>
    );
};


export default SoporteRegister;
