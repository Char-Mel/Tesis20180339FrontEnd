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
import { useSnackbar } from 'notistack';

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

const applyFilters = (users, query, filters) => {
  return users.filter((user) => {
    let matches = true;

    if (query) {
      const properties = ['nombreForm'];
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

const applyPagination = (users, page, limit) => {
  return users.slice(page * limit, page * limit + limit);
};

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

const Results = ({ users }) => {
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

  const filteredUsers = applyFilters(users, query, filters);
  const paginatedUsers = applyPagination(filteredUsers, page, limit);

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);



  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    setOpenConfirmDelete(false);

    enqueueSnackbar(t('The user account has been removed'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });
  };

  return (
    <>
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
            placeholder={t('Buscar por nombre de formulario')}
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
              {t('No se encontraron resultados para este formulario')}
            </Typography>
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre formulario</TableCell>
                    <TableCell>Fecha de envio</TableCell>
                    <TableCell>Estado de revisión</TableCell>
                    <TableCell >Fecha revision</TableCell>
                    <TableCell  align="center" >Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Box>
                              <Typography>{user.nombreForm}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography>{convertDate(user.fechaCreacion)}</Typography>
                        </TableCell>
                        <TableCell >
                          <Typography>{user.fechaRevision?convertDate(user.fechaRevision):'Sin revisar'}</Typography>
                        </TableCell>
                        <TableCell >
                          <Typography>{user.revisado === true? 'Revisado': 'Sin Revisar'}</Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip title="Responder formulario" arrow>
                              <IconButton
                                component={RouterLink}
                                to={
                                  `/${
                                    location.pathname.split('/')[1]
                                  }/management/forms/submitted/` + user._id
                                }
                                color="primary"
                              >
                                <LaunchTwoToneIcon fontSize="small" />
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
            {t('¿Estás seguro que deseas eliminar este formulario?')}?
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
              onClick={handleDeleteCompleted}
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
  users: PropTypes.array.isRequired
};

Results.defaultProps = {
  users: []
};

export default Results;
