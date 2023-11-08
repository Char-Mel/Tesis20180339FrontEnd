import { useState, forwardRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Avatar,
  Box,
  Card,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Button,
  Typography,
  Dialog,
  Zoom,
  styled
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useSnackbar } from 'notistack';
import customAxios from 'src/utils/customAxios';

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);


const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const convertDate = (dateNoFormat) => {
  const dateObject = new Date(dateNoFormat);
  const day = String(dateObject.getDate()).padStart(2, '0'); // Asegura que el día tenga dos cifras
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Asegura que el mes tenga dos cifras
  const year = dateObject.getFullYear();
  const hours = String(dateObject.getHours()).padStart(2, '0'); // Asegura que las horas tengan dos cifras
  const minutes = String(dateObject.getMinutes()).padStart(2, '0'); // Asegura que los minutos tengan dos cifras
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;
  return formattedDate + ' ' + formattedTime;
};



const applyFilters = (groups, query, filters) => {
  
  return groups.filter((group) => {
    
    let matches = true;
    
    if (query) {
      const properties = ['nombre', 'apellidoPaterno', 'apellidoMaterno','correo'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (group[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (filters.role && group.role !== filters.role) {
        matches = false;
      }

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

const applyPagination = (groups, page, limit) => {
  return groups.slice(page * limit, page * limit + limit);
};

const EditButton = styled(Button)`
width : 20px 
height :10px
`;

const Results = ({ groups,groupsID,removeParticipant}) => {

  const handleBack = () => {
    window.history.back();
  };
  
  const [selectedItems] = useState([]);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

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



  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredGroups = applyFilters(groups, query, filters);
  const paginatedGroups = applyPagination(filteredGroups, page, limit);
  


  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [userDeleted, setuserDeleted] = useState(null);

  const handleConfirmDelete = (value) => {
    setuserDeleted(value)
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
    setuserDeleted(null)
  };

  const handleDeleteCompleted = async(value) => {
    setOpenConfirmDelete(false);
    try{
      const response = await customAxios.post('/group/deleteUser',
      {
        _idGroup:groupsID,
        _idUserDelete:value
      })

      if (response.status === 200) {
      enqueueSnackbar(t('El grupo ha sido eliminado correctamente'), {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        TransitionComponent: Zoom
      
      });
      removeParticipant(value);
    }

  }
    catch(err){
      console.error(err);
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        pb={3}
      />
      
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

          {paginatedGroups.length === 0 ? (
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
                {t("No hemos podido encontrar usuarios dentro de este grupo")}
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
                      <TableCell align="center">{t('Fecha agregado')}</TableCell>
                      <TableCell align="center">{t('Acciones')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedGroups.map((group) => {
                      const isGroupSelected = selectedItems.includes(group._id);
                      return (
                        <TableRow hover key={group._id} selected={isGroupSelected}>
                          
                          <TableCell>

                            <Box display="flex" alignItems="center">
                              <Avatar
                                sx={{
                                  mr: 1
                                }}
                                src={group.avatar}
                              />
                              <Box>
                                <Typography>
                                {group._id.apellidoPaterno} {group._id.apellidoMaterno} {group._id.nombre}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>{group._id.correo}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography fontWeight="bold">
                            {convertDate(group.fechaCreacion)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography noWrap>
                              <Tooltip title={t('Ver')} arrow>
                                <IconButton
                                  component={RouterLink}
                                  to={
                                    `/${
                                      location.pathname.split('/')[1]
                                    }/management/users/single/` + group._id._id
                                  }
                                  color="primary"
                                >
                                  <LaunchTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={t('Borrar')} arrow>
                                <IconButton
                                  onClick={
                                    ()=> handleConfirmDelete(group._id._id)
                                  }
                                  color="primary"
                                >
                                  <DeleteTwoToneIcon fontSize="small" />
                                </IconButton>
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
                count={filteredGroups.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
              <Box mt={10} ml={10} display={"flex"} flexDirection={"row-reverse"}>
                <Box>
                  <EditButton variant="contained" color="primary" onClick={handleBack} >
                    Volver
                  </EditButton>
                </Box>
              </Box>
            </Box>

          </>
        )}

        </Card>
      
      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 6
            }}
            variant="h3"
          >
            {t('¿Estás seguro que deseas eliminar este grupo?')}
            ?
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1
              }}
              onClick={closeConfirmDelete}
            >
              {t('Cancelar')}
            </Button>
            <ButtonError
              onClick={
               ()=> handleDeleteCompleted(userDeleted)
              }
              size="large"
              sx={{
                mx: 1,
                px: 3
              }}
              variant="contained"
            >
              {t('Borrar')}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

Results.propTypes = {
  groups: PropTypes.array.isRequired
};

Results.defaultProps = {
  groups: []
};

export default Results;
