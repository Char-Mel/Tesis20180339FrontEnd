
import React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Autocomplete, Dialog, DialogTitle, Card, Table, TableHead, TableRow, TableBody, Checkbox, Button,
  //  Zoom, 
  Divider, TableCell, TableContainer, Tooltip, TablePagination, DialogActions

} from '@mui/material';
import { useTranslation } from 'react-i18next';
// import { useSnackbar } from 'notistack';
import customAxios from 'src/utils/customAxios';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const PageHeader = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [selectedItems, setSelectedUser] = useState('');
  const [open, setOpen] = useState(false);


  const getFrecuency = (valor) => {
    if (valor === 'noRestriccion')
      return "Sin límite de tiempo"
    if (valor === 'restriccion')
      return "Restringido por horas"
    return ""
  }



  const getUsers = async () => {
    try {
      const response = await customAxios.get('/flow/list');
      const { status, data } = response;
      if (status === 200) {
        setUsers(data.flows);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, getUsers);

  if (!users) {
    // console.log('no hay nada')
    return null;
  }
  const [rango, setRango] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(value)
  };

  const handleSelectOneUser = (_event, userId) => {
    if (selectedItems !== userId) {
      setSelectedUser(userId);
    } else {
      setSelectedUser('');
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
  const handleAddUserSuccess = () => {

    setFormData({
      ...formData,
      flujo: {
        name: selectedItems.nombre,
        _id: selectedItems._id
      }
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
        const properties = ['nombre', 'tipo'];
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

  const handleChangeValue = (name,value) => {
    console.log(name,value)
    if (value !== null) {
      setFormData({...formData, [name]: value});
    }
  };

  return (

    <>
      <Box display="flex" mb={3} flexDirection={"column"} >
        <Box >
          <Typography variant="h1" mb={3}>
            {t('Creación de un nuevo formulario')}
          </Typography>
        </Box>
        <Box >
          <Typography variant='h4' mb={2}>
            {t('Detallar configuración')}
          </Typography>
        </Box>
        <Box display="flex" mb={3} flexDirection={"row"} >
          <Box display="flex" mb={3} flexDirection={"column"} mr={10}>
            <Box>
              <Typography variant='h4'>
                {t('Nombre del formulario')}
              </Typography>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                style={{ width: '350px' }}
              />
            </Box>
            <Box>
              <Typography variant='h4' mt={6}>
                {t('Flujo que sigará el formulario')}
              </Typography>
              <TextField
                value={formData.flujo.name}
                name="flujoFormulario"
                variant="outlined"
                style={{ width: '350px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment >
                      <IconButton >
                        <SearchTwoToneIcon onClick={handleAddUserOpen} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <Typography variant="h4" mt={7}>
                {t('Frecuencia de completado')}
              </Typography>
              <Autocomplete
                disablePortal
                value={getFrecuency(formData.frecuency)}
                options={[
                  { label: "Restringido por horas", value: "restriccion" },
                  { label: "Sin límite de tiempo", value: "noRestriccion" }
                ]}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, frecuency: newValue.value });
                  if(newValue.value === "restriccion")
                  setRango(true)
                  else
                  setRango(false)
                  
                }}

                renderInput={(params) => (
                  <TextField
                    fullWidth
                    style={{ width: '300px' }}
                    {...params}
                  />
                )}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection={"column"}>
            <Box mb={3} mr={3}>
              <Typography variant='h4'>
                {t('Descripción del formulario')}
              </Typography>
              <TextField
                name="description"
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={9}
                style={{
                  width: '600px',
                  marginBottom: '10px'
                }}
              />
            </Box>

            <Box display="flex" flexDirection={"row"}>
              <Box mb={3} mr={3}>
                <Typography variant='h4'>
                  {t('Habilitar a las')}
                </Typography>
                {/* <TextField
                value={formData.limiteInferior}
                onChange={handleChange}
                  name="limiteInferior"
                  variant="outlined"
                  style={{ width: '200px' }}
                /> */}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ mt: -1, overflowY: 'hidden' }}
                    components={['TimePicker']}
                  >
                    <TimePicker
                    disabled={!rango}
                      sx={{ width: 100 }}
                      onChange={(value) => handleChangeValue("limiteInferior",value)}
                      placeholder={'Hora inicio'}
                      value= ''
                      slots={{
                        textField: (params) => (
                          <TextField
                            size="small"
                            placeholder={'Hora inicio'}
                            {...params}
                          />
                        )
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>

              </Box>

              <Box mb={3} mr={3}>
                <Typography variant='h4'>
                  {t('Deshabilitar a las ')}
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ mt: -1, overflowY: 'hidden' }}
                    components={['TimePicker']}
                  >
                    <TimePicker
                    disabled={!rango}
                      sx={{ width: 100 }}
                      onChange={(value) => handleChangeValue("limiteSuperior",value)}
                      placeholder={'Hora final'}
                      value= ''
                      slots={{
                        textField: (params) => (
                          <TextField
                            size="small"
                            placeholder={'Hora final'}
                            {...params}
                          />
                        )
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>

                {/* <TextField
                  value={formData.limiteSuperior}
                  onChange={handleChange}
                  name="limiteSuperior"
                  variant="outlined"
                  style={{ width: '200px' }}
                /> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant='h4'>
          {t('Asignaciones')}
        </Typography>
      </Box>
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
            {t('Seleccionar flujo')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Elija el flujo que deseas asignar'
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
                placeholder={t('Buscar por nombre o tipo de flujo')}
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
                  {t("No pudimos encontrar el flujo que quieres")}
                </Typography>
              </>
            ) : (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{t('Nombre del flujo')}</TableCell>
                        <TableCell>{t('Tipo')}</TableCell>
                        <TableCell align="center">{t('Seleccionar')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedUsers.map((user) => {
                        const isUserSelected = selectedItems._id === user._id;

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
                              <Typography>{user.tipo}</Typography>
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
            {t('Seleccionar flujo')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default PageHeader;
