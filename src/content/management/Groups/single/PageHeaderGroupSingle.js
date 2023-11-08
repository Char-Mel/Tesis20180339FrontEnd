import { useState,useEffect,useCallback} from 'react';
import { useTranslation } from 'react-i18next';
import useRefMounted from 'src/hooks/useRefMounted';
import PropTypes from 'prop-types';
import customAxios from 'src/utils/customAxios';

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Zoom,
  Typography,
  Button,
  Card,
  Box,
  TextField,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  InputAdornment,
  Divider,
  Table,
  TableBody,
  Tooltip,
  Checkbox
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import { useSnackbar } from 'notistack';


const PageHeaderGroupSingle = ({group,updateUserList })  =>  {


  const isMountedRef = useRefMounted();
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await customAxios.get('/user/listnotInGroup',{
        params:{
          _idGroup: group._id
        }
      });

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

  const paginatedUsers= applyPagination(filteredUsers, page, limit);


  const handleSelectOneGroup = (_event, groupId) => {
    if (!selectedItems.includes(groupId)) {
      setSelectedGroup((prevSelected) => [...prevSelected, groupId]);
      
    } else {
      setSelectedGroup((prevSelected) =>
        prevSelected.filter((id) => id !== groupId)
      );
    }
    
  };

  const handleAddGroupOpen = () => {
    
    setOpen(true);

  };

  const handleAddGroupClose = () => {
    setSelectedGroup([]);
    setOpen(false);
  };

  const handleAddGroupSuccess = async () => {

    try {
      
      const response = await customAxios.post('/group/addUser',
        {
          _idGroup: group._id,
          _idArray: selectedItems
        }
      );
      
      
      if(response.status === 200){
        
      updateUserList(response.data.group.participants);  
      getUsers();
      enqueueSnackbar(t('El usuario ha sido agregado al grupo exitósamente'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

      }
    }
    catch (error) {
      console.error('Error updating user:', error);
      enqueueSnackbar(t('Ha ocurrido un error al agregar los usuarios'), {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        TransitionComponent: Zoom
      });
      
    }
    setOpen(false);
    
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('Grupo -' )} {group.nombre}
          </Typography>
          <Typography variant="subtitle2">
            {group.descripcion}
          </Typography>
        </Grid>
        
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            onClick={handleAddGroupOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t('Agregar usuario existente a grupo')}
          </Button>
        </Grid>
      </Grid>
      
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
            {t('Agregar usuario a grupo')} {group.nombre}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Elija al usuario que desea agregar'
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
                      const isUserelected = selectedItems.includes(user._id);
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
                                handleSelectOneGroup(event, user._id)
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
    </>
  );
}

PageHeaderGroupSingle.propTypes = {
  group: PropTypes.object.isRequired
};

export default PageHeaderGroupSingle;
