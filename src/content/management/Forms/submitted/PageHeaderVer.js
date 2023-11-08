import {   
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  useTheme
} from '@mui/material';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import customAxios from 'src/utils/customAxios';


function PageHeader({ name, flowInfo, _idForm}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [firma,setFirma] = useState()
  const [comentario,setComentario] = useState()
  const [aprobado,setAprobado] = useState()
  const [user,setUser] = useState()  


  const getRevision = async () => {
    try {
      const response = await customAxios.get('/flow/findSubmitted', {
        params: {
          _idForm
        }
      });

      const { status, data } = response;
      if (status === 200) {
        setComentario(data.flow.comentario);
        setFirma(data.flow.firma);
        setAprobado(data.flow.esAprobado)
        setUser(data.flow.iduserEnviado)
      }
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    getRevision();
  }, []);

  if (!aprobado) {
    // console.log("no hay aprobado")
    return null;
  }
  if (!user) {
    // console.log("no hay user")
    return null;
  }

  const theme = useTheme();
  const handleCreateProjectOpen = () => {
    setOpen(true);
  };

  const handleCreateProjectClose = () => {
    setOpen(false);
  };


  return (
    <>
    <Box
      sx={{
        px: 3,
        py: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="h3" component="h3">
        Formulario {name}
      </Typography>
      
      <Button
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            onClick={handleCreateProjectOpen}
            variant="contained"
          >
            {t('Revisar formulario')}
          </Button>

    </Box>
    <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleCreateProjectClose}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('Revisión final')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Vista de revisión brindada por')} {user.nombre} {user.apellidoPaterno}
          </Typography>
        </DialogTitle>
        <Formik
        >
            <form >
              <DialogContent
                dividers
                sx={{
                  p: 3
                }}
              >
                <Grid container spacing={0}>
                {(flowInfo.accion === 'comentario' || flowInfo.accion ==='firmaComentario' ) && (
                  <Grid
                  >
                    <Box
                      pr={3}
                      sx={{
                        pt: `${theme.spacing(2)}`,
                        pb: { xs: 1, md: 0 }
                      }}
                      alignSelf="center"
                    >
                      <b>{t('Comentarios')}:</b>
                    </Box>
                  </Grid>
                )}
                  {(flowInfo.accion === 'comentario' || flowInfo.accion === 'firmaComentario' ) && (
                    <Grid
                      sx={{
                        mb: `${theme.spacing(3)}`
                      }}
                      item
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      <TextField
                        fullWidth
                        name="comentario"
                        placeholder={t('Brindar comentarios')}                        
                        value={comentario}
                        variant="outlined"
                      />
                    </Grid>
                  )}
                  <Grid
                  >
                    <Box
                      pr={3}
                      sx={{
                        pt: `${theme.spacing(2)}`,
                        pb: { xs: 1, md: 1 }
                      }}
                      alignSelf="center"
                    >
                      <b>{t('Revisión')}:</b>
                    </Box>
                  </Grid>
                  <Grid
                    sx={{
                      mb: `${theme.spacing(3)}`
                    }}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                  >
                  <TextField
                    fullWidth
                    disabled
                    name="aprobado"
                    value={aprobado? "Aprobado" : "Rechazado"}
                    variant="outlined"
                  />
                </Grid>
                  {(flowInfo.accion === 'firma' || flowInfo.accion ==='firmaComentario' ) && (
                  <Grid item xs={12} sm={12} md={12} textAlign={{ sm: 'left' }}>
                    <Box
                      pr={3}
                      sx={{
                        pb: { xs: 1, md: 1 }
                      }}
                    >
                      <b>{t('Firma')}:</b>
                    </Box>
                  </Grid>
                  )}

                  {(flowInfo.accion === 'firma' || flowInfo.accion === 'firmaComentario' ) && (
                    <Grid
                      sx={{
                        mb: `${theme.spacing(3)}`
                      }}
                      item
                      xs={12}
                      sm={8}
                      md={9}
                    >
                      <img src={firma} alt='ga'/>
                    </Grid>
                  )}

                  <Grid
                    sx={{
                      mb: `${theme.spacing(3)}`
                    }}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="flex-end"
                    container
                  >
                    <Button
                      color="secondary"
                      size="large"
                      variant="outlined"
                      onClick={handleCreateProjectClose}
                    >
                      {t('Cerrar')}
                    </Button>
                  </Grid>
                </Grid>
          
              </DialogContent>
            </form>
        </Formik>
      </Dialog>
    </>
  );
}

export default PageHeader;
