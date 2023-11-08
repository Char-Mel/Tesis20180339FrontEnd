/* eslint-disable jsx-a11y/label-has-for */
// import React, { useState, useEffect, useCallback } from 'react';
import React, { useState } from 'react';
// import useRefMounted from 'src/hooks/useRefMounted';
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
    Card,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,

    TableBody
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import CheckTwoTone from '@mui/icons-material/CheckTwoTone';

import DynamicConfirmModal from 'src/components/ModalReu';


const SolicitudRegister = ({flow,editable,handleUpdate}) => {

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
        // console.log(action0)

        setOpenConfirmDelete(true);
    };

    const closeConfirmDelete = () => {
        setOpenConfirmDelete(false);


    };

    const handleDeleteCompleted = () => {
        setOpenConfirmDelete(false);
        handleUpdate();
        
    };

    return (
        <>
            <Box display="flex" ml={3} flexDirection={"column"} >
                <Box display={"flex"} flexDirection={"row"} mb={4}>
                    <Box display={"flex"} flexDirection={"column"} mr={8}>

                        <Typography variant='h4'>
                            {t('Niveles de validación')}
                        </Typography>
                        <Autocomplete
                        disabled
                            disablePortal
                            value={flow.niveles}
                            options={[
                                { label: '1', value: 1 },
                                { label: '2', value: 2 },
                                { label: '3', value: 3 },
                                { label: '4', value: 4 }
                            ]}
                            // onChange={(event, newValue) => {
                            //     setNiveles(newValue.value);
                            //     tableSize(newValue.value);

                            // }}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    style={{ width: '200px' }}
                                    {...params}
                                />
                            )}
                        />

                    </Box>
                    <Box display={"flex"} flexDirection={"column"} >
                        <Typography variant='h4' >
                            {t('Accion de revisión')}
                        </Typography>
                        <Autocomplete
                            disablePortal
                            disabled
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
                <Card >
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                    <TableCell>{t('Nivel')}</TableCell>
                                    <TableCell>{t('Nombre usuario')}</TableCell>
                                    <TableCell>{t('Correo')}</TableCell>
                                    <TableCell>
                                        {/* <Button variant="contained" color="primary" onClick={handleAddGroupOpen} style={{ marginRight: '12px' }}>
                                            Cargar usuarios
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleAddGroupOpen}>
                                            Cargar de grupo
                                        </Button> */}
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {flow.userNivel.map((tableValuelevel) => {

                                            return (
                                                <TableRow hover key={tableValuelevel.nivel}>
                                                    <TableCell>
                                                        <Box display="flex" alignItems="center">
                                                            <Box>
                                                                <Typography>
                                                                    {tableValuelevel.nivel}
                                                                </Typography>
                                                            </Box>
                                                        </Box>

                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography>{tableValuelevel._id.apellidoPaterno} {tableValuelevel._id.nombre}</Typography>
                                                    </TableCell>                                            <TableCell>
                                                        <Typography>{tableValuelevel._id.correo}</Typography>
                                                    </TableCell>

                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
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
                        <Button onClick={handleDeleteCompleted} size="large" sx={{ mx: 1, px: 3 }} variant="contained">
                            Aceptar
                        </Button>
                    </Box>
                </Box>
            </DialogWrapper>
        </>
    );
};


export default SolicitudRegister;
