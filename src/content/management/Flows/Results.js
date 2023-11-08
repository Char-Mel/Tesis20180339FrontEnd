import { useState, forwardRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import customAxios from 'src/utils/customAxios';
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

const convertBool = (estado) => {
  if (estado === true)
    return "Activo"

  return "Eliminado"
};

const nombreCompletoFlujo = (nombre) => {
  
  const map = {
    control: {
      text: 'Control operativo'
    },
    solicitud: {
      text: 'Emisión y aprobación de solicitudes administrativas'
    },
    soporte: {
      text: 'Soporte correctivo'
    }
  }
  const { text } = map[nombre] || { text: 'No identificado' }
  return text
}

const applyFilters = (flows, query, filters) => {
  return flows.filter((flow) => {
    let matches = true;

    if (query) {
      const properties = ['nombre', 'tipo'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (flow[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (filters.role && flow.role !== filters.role) {
        matches = false;
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && flow[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (flows, page, limit) => {
  return flows.slice(page * limit, page * limit + limit);
};

const Results = ({ flows, removeFlow}) => {
  const [selectedItems] = useState([]);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [flowDeleted,SetFlowDeleted]=useState(null);  


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

  const filteredFlows = applyFilters(flows, query, filters);
  const paginatedFlows = applyPagination(filteredFlows, page, limit);


  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleConfirmDelete =  (value) => {
    SetFlowDeleted(value);
    setOpenConfirmDelete(true);


  };

  const closeConfirmDelete = () => {
    SetFlowDeleted(null)
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = async (value) => {
    setOpenConfirmDelete(false);

    try {
      const response = await customAxios.post('/flow/delete',
        {
          _id: value
        }
      );
      if (response.status === 200){
        enqueueSnackbar(t('Se han eliminado correctamente el flujo'), {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          },
          TransitionComponent: Zoom
        });
        removeFlow(value);
      }


    }
    catch (e) {
      console.error('Error updating user:', e);
      enqueueSnackbar(t('Ha ocurrido un error al eliminar el flujo'), {
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
            placeholder={t('Buscar por nombre de flujo')}
            value={query}
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Box>

        <Divider />

        {paginatedFlows.length === 0 ? (
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
              {t("No pudimos encontrar ningún flujo")}
            </Typography>
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('Nombre del flujo')}</TableCell>
                    <TableCell>{t('Tipo de flujo')}</TableCell>
                    <TableCell align="center">{t('Fecha creación')}</TableCell>
                    <TableCell>{t('Estado')}</TableCell>
                    <TableCell align="center">{t('Acciones')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedFlows.map((flow) => {
                    const isFlowSelected = selectedItems.includes(flow._id);
                    return (
                      <TableRow hover key={flow._id} selected={isFlowSelected}>
                        <TableCell>
                          <Box>
                            <Typography>
                              {flow.nombre}
                            </Typography>
                          </Box>

                        </TableCell>
                        <TableCell>
                          <Typography>{nombreCompletoFlujo(flow.tipo)}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontWeight="bold">
                            {convertDate(flow.fechaCreacion)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{convertBool(flow.estado)}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip title={t('Ver')} arrow>
                              <IconButton
                                component={RouterLink}
                                to={
                                  `/${location.pathname.split('/')[1]
                                  }/management/flows/single/` + flow._id
                                }
                                color="primary"
                              >
                                <LaunchTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Borrar')} arrow>
                              <IconButton
                                onClick={
                                  () => handleConfirmDelete(flow._id)
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
                count={filteredFlows.length}
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
            {t('¿Estás seguro que deseas eliminar este flujo?')}
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
              {t('Cancel')}
            </Button>
            <ButtonError
              onClick={() => handleDeleteCompleted(flowDeleted)}
              size="large"
              sx={{
                mx: 1,
                px: 3
              }}
              variant="contained"
            >
              {t('Delete')}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

Results.propTypes = {
  flows: PropTypes.array.isRequired
};

Results.defaultProps = {
  flows: []
};

export default Results;
