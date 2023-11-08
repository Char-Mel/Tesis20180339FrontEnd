import { useState,useEffect,useCallback} from 'react';
import { useSnackbar } from 'notistack';
import useRefMounted from 'src/hooks/useRefMounted';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
  styled,Button,
  Dialog,
  DialogTitle,
  Card,
  Checkbox,
  Zoom,
  TablePagination,
  DialogActions,
  TextField,InputAdornment

  
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useNavigate, useLocation } from 'react-router-dom';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import customAxios from 'src/utils/customAxios';

const Results = ({formData,setFormData}) => {
  
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isMountedRef = useRefMounted();
  const [users, setUsers] = useState([]);
  const [selectedItems, setSelectedUser] = useState([]);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleBack = () => {
    return navigate(
      `/${location.pathname.split('/')[1]}/management/forms/list`
    );
  };

  const EditButton = styled(Button)`
  width : 20px 
  height :10px
  `;

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


  const [tableValues,setTableValues] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [filters] = useState({
    role: null
  });

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectOneUser = (_event, userId) => {
    if (!selectedItems.includes(userId)) {
      setSelectedUser((prevSelected) => [...prevSelected, userId]);
      
      setTableValues((prevSelected) => [...prevSelected, {
        tipo: 'Usuario',
        nombres: userId.nombre + ' ' +userId.apellidoPaterno,
        detalle: userId.correo,
        _idUsuario: userId._id,
        _idGroup: ''
      }]);

      setFormData((prevSelected) => ({
        ...prevSelected,
        asignaciones: [...prevSelected.asignaciones, {
          tipo: 'Usuario',
          nombres: userId.nombre + ' ' +userId.apellidoPaterno,
          detalle: userId.correo,
          _idUsuario: userId._id,
          _idGroup: ''
        }]
      }));
      

    } else {

      setSelectedUser(prevSelected =>
        prevSelected.filter( user => user._id !== userId._id)
      );
      setTableValues(prevSelected =>
        prevSelected.filter( user => user._id !== userId._id)
      );

      setFormData((prevData) => ({
        ...prevData,
        asignaciones: prevData.asignaciones.filter(item => item._id !== userId._id)
      }));
    }


    
  };



  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };
   
  const handleAddUserOpen = () => {
    setOpen(true);
  };

  const handleAddUserClose = () => {
    setOpen(false);
  };

  const  handdleUpdateFormData = () => {
    setFormData({ ...formData, asignaciones: [] });
    setFormData({...formData, 
      asignaciones: tableValues
    })
    setOpen(false);
  };


  const handleAddUserSuccess = () => {


    enqueueSnackbar(t('El usuario ha sido agregado al grupo exitósamente'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });


    setOpen(false);

  
  };

  const applyPagination = (users, page, limit) => {
    return users.slice(page * limit, page * limit + limit);
  };

  
  const applyFilters = (users, query, filters) => {
    return users.filter((user) => {
      let matches = true;
  
      if (query) {
        const properties = ['correo', 'nombre', 'apellidoPaterno','apellidoMaterno'];
        let containsQuery = false;
  
        properties.forEach((property) => {
          if (user[property].toLowerCase().includes(query.toLowerCase())) {
            containsQuery = true;
          }
        });
  
        if (filters.role && user.role !== filters.role) {
          matches = false;
        }
  
        if (!containsQuery) {
          matches = false;
        }
      }
  
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
  
        if (value && user[key] !== value) {
          matches = false;
        }
      });
  
      return matches;
    });
  };

  const filteredUsers = applyFilters(users, query, filters);

  const paginatedUsers = applyPagination(filteredUsers, page, limit);



  
  const handleConfirmDelete =  (value) => {
    setSelectedUser((prevSelected) => prevSelected.filter(user => user._id !== value._id))
    setTableValues((prevSelected) => prevSelected.filter(user => user._id !== value._id))
    
  };





  return (
    <>
      <Card>
        <Divider />
        <Box display="flex" flexDirection={"row"} >
        <Tooltip title={t('Agregar usuario')} arrow>
          <IconButton
            // onClick={handleConfirmDelete}
            color="primary"
          >
            <AddCircleOutlineTwoToneIcon onClick={handleAddUserOpen} />
            </IconButton>
          </Tooltip>
          <Typography mt={0.6}>
            {t('Asignar usuarios o grupos')}
          </Typography>
        </Box>
        <Divider />
        <TableContainer>
          <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('Tipo')}</TableCell>
                      <TableCell>{t('Nombres')}</TableCell>
                      <TableCell >{t('Detalle')}</TableCell>
                      <TableCell >{t('Acción')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableValues.map((user) => {
                      return (
                        <TableRow hover key={user._id} >
                          <TableCell>

                            <Box display="flex" alignItems="center">
                              <Box>
                                <Typography>
                                  {user.tipo}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>{user.nombres}</Typography>
                          </TableCell>
                          <TableCell >
                            <Typography fontWeight="bold">
                              {user.detalle}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Tooltip title={t('Borrar')} arrow>
                              <IconButton
                                onClick={() => handleConfirmDelete(user)}
                                color="error"
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" flexDirection={"row-reverse"} ml={2}>
          <Box>
            <EditButton variant="contained" color="primary"
            onClick={
              handdleUpdateFormData
            }
              component={RouterLink}
              to=
              {
                {
                  pathname: `/${location.pathname.split('/')[1]
                    }/management/forms/creation`,
                  search: `formData=${encodeURIComponent(JSON.stringify(formData))}`
                }
              }
              sx={{
                mt: { xs: 2, sm: 0 }
                        }}>
              Continuar
            </EditButton>
          </Box>

          <Box mr={2}>
            <EditButton variant="contained" color="secondary" onClick={handleBack} >
              Volver
            </EditButton>
          </Box>
        </Box>
      </Card>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleAddUserClose}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('Asignar formulario a usuario')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Elija los usuarios que desea asignar'
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
                      const isUserSelected = selectedItems.includes(user);
                      return (
                        <TableRow hover key={user._id} selected={isUserSelected}>
                          
                          <TableCell>

                            <Box display="flex" alignItems="center">
                              <Box>
                                <Typography>
                                  {user.nombre}
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
                              checked={isUserSelected}
                              onChange={(event) =>
                                handleSelectOneUser(event, user)
                              }
                              value={isUserSelected}
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
          <Button color="secondary" onClick={handleAddUserClose}>
            {t('Cancelar')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleAddUserSuccess}
          >
            {t('Continuar')}
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};


export default Results;
