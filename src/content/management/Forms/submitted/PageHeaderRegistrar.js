import {   
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Zoom,
  Typography,
  TextField,
  Autocomplete,
  Button,
  useTheme,
  CircularProgress
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useLocation,useNavigate} from 'react-router';
import customAxios from 'src/utils/customAxios';
import SignatureCanvas from 'react-signature-canvas';

const projectTags = [
  { title: 'Aprobar', value: true },
  { title: 'Rechazar', value: false }
];


function PageHeader({ name, flowInfo, _idForm}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [sign,setSign] = useState()
  const [url,setUrl] = useState()
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClear= () =>{
    sign.clear()
    setUrl('')
}
const handleGenerate= () =>{
    setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))
}

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState('');

  // const [accion] = useState('');
  const accessToken = window.localStorage.getItem('accessToken');

 
  const handleCreateProjectOpen = () => {
    setOpen(true);
  };

  const handleCreateProjectClose = () => {
    setOpen(false);
  };

  const handleCreateProjectSuccess = () => {
    enqueueSnackbar(t('Se ha registrado la respuesta correctamente'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

    setOpen(false);
    navigate(`/${location.pathname.split('/')[1]}/management/flows/assigments`);
  };


  const validationSchema = (flowInfo) => {
    let schema = Yup.object();
  
    if (flowInfo === 'firma' ) {
      schema = schema.shape({
        // aprobado: Yup.boolean().required('Es necesario que se especifique'),
        // firma: Yup.string().required('Es necesario que se brinde la firma'),
      });
    } else if (flowInfo === 'comentario') {
      schema = schema.shape({
      comentario: Yup.string().required('Es necesario que se especifique'),
        // aprobado: Yup.string().required('Es necesario que se brinde la firma'),
      });
      
    }
    else 
    schema = schema.shape({
      comentario: Yup.string().required('Es necesario que se especifique'),
      // aprobado: Yup.string().required('Es necesario que se especifique'),
      // firma: Yup.string().required('Es necesario que se brinde la firma'),
    });

    return schema;
  };

  const schema = validationSchema(flowInfo.accion);


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
            {t('Brinde su aprobación o desaprobación al formulario')}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{

            aprobado: true,
            firma: '',
            comentario: ''

          }}
          validationSchema={schema}

          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            
            try {
            
              const response = await customAxios.post('/flow/enviarRevision', {
                idFlow: flowInfo._id,
                idForm: _idForm,
                firma: url,
                comentario: _values.comentario,
                esAprobado: selectedValue.value
              }, {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                }
              });
              // console.log(response)
              if(response.status === 200){
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handleCreateProjectSuccess();
            }
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);

            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
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
                        error={Boolean(touched.title && errors.title)}
                        fullWidth
                        helperText={touched.title && errors.title}
                        name="comentario"
                        placeholder={t('Brindar comentarios')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.comentario}
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
                    <Autocomplete
                      getOptionLabel={(option) => option.title}
                      options={projectTags}
                      onChange={

                        (_,newValue) => setSelectedValue(newValue)
                        
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          placeholder={t('Aprobar o desaprobar')}
                        />
                      )}
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
                      <div style={{ border: '2px solid #000', borderRadius: '5px', display: 'inline-block' }}>
                        <SignatureCanvas
                          canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                          ref={data => setSign(data)}
                        />
                      </div>

                      <br/>
                      <Button style={{ height: "30px", width: "60px" }} onClick={handleClear}>Limpiar</Button>
                      <Button style={{ height: "30px", width: "60px" }} onClick={handleGenerate}>Guardar</Button>
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
                      sx={{
                        mr: 2
                      }}
                      type="submit"
                      startIcon={
                        isSubmitting ? <CircularProgress size="1rem" /> : null
                      }
                      disabled={Boolean(errors.submit) || isSubmitting}
                      variant="contained"
                      size="large"
                    >
                      {t('Enviar')}
                    </Button>
                    <Button
                      color="secondary"
                      size="large"
                      variant="outlined"
                      onClick={handleCreateProjectClose}
                    >
                      {t('Cancelar')}
                    </Button>
                  </Grid>
                </Grid>
          
              </DialogContent>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default PageHeader;
