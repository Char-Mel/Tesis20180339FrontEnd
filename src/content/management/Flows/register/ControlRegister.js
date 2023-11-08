/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect, useCallback } from 'react';
import useRefMounted from 'src/hooks/useRefMounted';
import { useLocation } from 'react-router-dom';
import { forwardRef } from 'react';
import {
    Box,
    Typography,
    styled,
    TextField,
    Button,
    Zoom,
    Dialog,
    Slide,
    Autocomplete,
    DialogTitle,
    Card,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Tooltip,
    Checkbox,
    TablePagination,
    DialogActions,
    TableBody
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import CheckTwoTone from '@mui/icons-material/CheckTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import IconButton from '@mui/material/IconButton';
import DynamicConfirmModal from 'src/components/ModalReu';
import { useSnackbar } from 'notistack';
import customAxios from 'src/utils/customAxios';
import InputAdornment from '@mui/material/InputAdornment';

const ControlRegister = (flowType) => {
    const [action, setAction] = useState(null);
    const [aprobar, setAprobar] = useState(null);
    const [rechazar, setRechazar] = useState(null);
    const location = useLocation();
    const isMountedRef = useRefMounted();
    const [users, setUsers] = useState([]);

    const getUsers = useCallback(async () => {
        try {
            const response = await customAxios.get('/user/list');

            if (isMountedRef.current) {
                setUsers(response.data.users);
            }
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const [selectedItems, setSelectedGroup] = useState([]);


    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();



    const [query, setQuery] = useState('');
    const [filters] = useState({
        role: null
    });

    const [page, setPage] = useState(0);

    const [limit, setLimit] = useState(10);

    const applyFilters = (groups, query, filters) => {

        return groups.filter((group) => {
            let matches = true;


            if (query) {
                const properties = ['nombre', 'correo'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (group[property].toLowerCase().includes(query.toLowerCase())) {
                        containsQuery = true;
                    }
                });


                if (!containsQuery) {
                    matches = false;
                }
            }

            Object.keys(filters).forEach((key) => {

                const value = filters[key];

                if (value && group[key] !== value) {
                    matches = false;
                }
            });

            return matches;
        });
    };

    const filteredUsers = applyFilters(users, query, filters);

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleQueryChange = (event) => {
        event.persist();
        setQuery(event.target.value);
    };

    const applyPagination = (users, page, limit) => {
        return users.slice(page * limit, page * limit + limit);
    };

    const paginatedUsers = applyPagination(filteredUsers, page, limit);


    const handleSelectOneGroup = (_event, groupId) => {
        if (selectedItems.includes(groupId)) {
            setSelectedGroup([]);
        } else {
            setSelectedGroup([groupId]);

        }

    };


    const handleAddGroupOpen = () => {

        setOpen(true);

    };

    const handleAddGroupClose = () => {
        // setSelectedGroup([]);
        setOpen(false);
    };

    const handleAddGroupSuccess = () => {
        setOpen(false);

        // setSelectedGroup([]);

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

    const accessToken = window.localStorage.getItem('accessToken');

    const handleDeleteCompleted = async () => {
        setOpenConfirmDelete(false);
        
        try {

            const response = await customAxios.post('/flow/register', {
                nombre: flowType.flowType.nombre,
                descripcion: flowType.flowType.descripcion,
                tipo: flowType.flowType.tipo,
                accion: action,
                niveles: 1,
                userNivel: { nivel: 1, _id: selectedItems[0]._id },
                accionAprobacion: aprobar,
                accionRechazo: rechazar,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            
            if(response.status === 200){
            enqueueSnackbar(t('Se han guardado los cambios existosamente'), {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            });
            const currentPath = location.pathname;
            const newPath = currentPath.replace('/register', '/list');
            window.location.href = newPath;
            
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
            <Box display="flex" ml={3} flexDirection={"column"} >
                <Box display={"flex"} flexDirection={"row"} >
                    <Box display={"flex"} flexDirection={"column"} mr={8}>
                        <Typography variant='h4'>
                            {t('Revisión por parte de un usuario')}
                        </Typography>
                        <TextField
                            value={selectedItems.length > 0 ? selectedItems[0].correo + '(' + selectedItems[0].apellidoPaterno + ' ' + selectedItems[0].nombre + ')' : ''}
                            name="revisor"
                            variant="outlined"
                            style={{ width: '350px' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchTwoToneIcon onClick={handleAddGroupOpen} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Typography variant='h4' mt={3}>
                            {t('Accion de revisión')}
                        </Typography>
                        <Autocomplete
                            disablePortal


                            options={[
                                { label: "Firma", value: "firma" },
                                { label: "Firma y Comentario", value: "firmaComentario" },
                                { label: "Comentario", value: "comentario" }
                            ]}
                            onChange={(event, newValue) => {
                                setAction(newValue.value);
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
                    <Box display={"flex"} flexDirection={"column"} >
                        <Typography variant='h4'>
                            {t('Acción de aprobación')}
                        </Typography>
                        <Autocomplete
                            disablePortal


                            options={[
                                { label: "Mensaje de confirmación - via correo", value: "mensaje" },
                                { label: "No enviar mensaje", value: "noMensaje" }
                            ]}
                            onChange={(event, newValue) => {
                                setAprobar(newValue.value);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    style={{ width: '400px' }}
                                    {...params}
                                />
                            )}
                        />
                        <Typography variant='h4' mt={3}>
                            {t('Acción de rechazo')}
                        </Typography>
                        <Autocomplete
                            disablePortal


                            options={[
                                { label: "Realizar nuevamente el formulario", value: "reenviar" },
                                { label: "Enviar mensaje de rechazo - via correo", value: "mensaje" },
                                { label: "No enviar mensaje", value: "noMensaje" }
                            ]}
                            onChange={(event, newValue) => {
                                setRechazar(newValue.value);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    style={{ width: '400px' }}
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
                        <Button variant="contained" color="primary" onClick={openConfirmDeleteModal}>
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
                onClose={handleAddGroupClose}
            >
                <DialogTitle
                    sx={{
                        p: 3
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        {t('Usuario revisor')}
                    </Typography>
                    <Typography variant="subtitle2">
                        {t(
                            'Elija al usuario que revisará el flujo'
                        )}
                    </Typography>

                    <Card>
                        <Box p={2}>
                            <TextField
                                sx={{
                                    m: 0
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchTwoToneIcon />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleQueryChange}
                                placeholder={t('Buscar por nombre o correo de usuario')}
                                value={query}
                                size="small"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        </Box>

                        <Divider />

                        {paginatedUsers.length === 0 ? (
                            <>
                                <Typography
                                    sx={{
                                        py: 10
                                    }}
                                    variant="h3"
                                    fontWeight="normal"
                                    color="text.secondary"
                                    align="center"
                                >
                                    {t("No pudimos encontrar al usuario que buscas")}
                                </Typography>
                            </>
                        ) : (
                            <>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>{t('Nombre del usuario')}</TableCell>
                                                <TableCell>{t('Correo')}</TableCell>
                                                <TableCell align="center">{t('Seleccionar')}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paginatedUsers.map((user) => {
                                                const isUserelected = selectedItems.includes(user);
                                                return (
                                                    <TableRow hover key={user._id} selected={isUserelected}>

                                                        <TableCell>

                                                            <Box display="flex" alignItems="center">
                                                                <Box>
                                                                    <Typography>
                                                                        {user.nombre} {user.apellidoPaterno}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>

                                                        </TableCell>

                                                        <TableCell>
                                                            <Typography>{user.correo}</Typography>
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <Typography noWrap>
                                                                <Tooltip title={t('Selecionar')} arrow>
                                                                    <Checkbox
                                                                        checked={isUserelected}
                                                                        onChange={(event) =>
                                                                            handleSelectOneGroup(event, user)
                                                                        }
                                                                        value={isUserelected}
                                                                    />

                                                                </Tooltip>
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box p={2}>
                                    <TablePagination
                                        component="div"
                                        count={filteredUsers.length}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleLimitChange}
                                        page={page}
                                        rowsPerPage={limit}
                                        rowsPerPageOptions={[5, 10, 15]}
                                    />
                                </Box>

                            </>
                        )}

                    </Card>

                </DialogTitle>

                <DialogActions
                    sx={{
                        p: 3
                    }}
                >
                    <Button color="secondary" onClick={handleAddGroupClose}>
                        {t('Cancelar')}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleAddGroupSuccess}
                    >
                        {t('Agregar usuario a grupo')}
                    </Button>
                </DialogActions>
            </Dialog>


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


export default ControlRegister;
