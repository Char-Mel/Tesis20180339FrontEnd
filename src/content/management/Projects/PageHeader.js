import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import wait from 'src/utils/wait';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  styled,
  Grid,
  Dialog,
  DialogTitle,
  Divider,
  Alert,
  DialogContent,
  Box,
  Zoom,
  ListItem,
  List,
  ListItemText,
  Typography,
  TextField,
  Avatar,
  Autocomplete,
  Button,
  useTheme,
  CircularProgress
} from '@mui/material';

import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';

const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    padding: ${theme.spacing(3)};
    background: ${theme.colors.alpha.black[5]};
    border: 1px dashed ${theme.colors.alpha.black[30]};
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: ${theme.transitions.create(['border', 'background'])};

    &:hover {
      background: ${theme.colors.alpha.white[100]};
      border-color: ${theme.colors.primary.main};
    }
`
);


const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.primary.lighter};
    color: ${theme.colors.primary.main};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarDanger = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.error.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const projectTags = [
  { title: 'aprobar', value: true },
  { title: 'desaprobar', value: false }
];

function PageHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  // const [accion] = useState('');

  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg']
    }
  });

  const files = acceptedFiles.map((file, index) => (
    <ListItem disableGutters component="div" key={index}>
      <ListItemText primary={file.name} />
      <b>{file.size} bytes</b>
      <Divider />
    </ListItem>
  ));



  const handleCreateProjectOpen = () => {
    setOpen(true);
  };

  const handleCreateProjectClose = () => {
    setOpen(false);
  };

  const handleCreateProjectSuccess = () => {
    enqueueSnackbar(t('A new project has been created successfully'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

    setOpen(false);
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('Projects')}
          </Typography>
          <Typography variant="subtitle2">
            {t('These are your active projects')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            onClick={handleCreateProjectOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t('Create new project')}
          </Button>
        </Grid>
      </Grid>

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
          validationSchema={Yup.object().shape({
            aprobado: Yup.boolean()
              .required(t('Es necesario que se especifique')),
              firma: Yup.boolean()
              .required(t('Es necesario que se brinde la firma')),
              comentario: Yup.boolean()
              .required(t('Es necesario que se brinde el comentario'))
          })}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              // console.log(accion)
              await wait(1000);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handleCreateProjectSuccess();
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
                      name="title"
                      placeholder={t('Brindar comentarios')}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.comentario}
                      variant="outlined"
                    />
                  </Grid>
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
                      <b>{t('Resultado')}:</b>
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
                  <Grid
                    sx={{
                      mb: `${theme.spacing(3)}`
                    }}
                    item
                    xs={12}
                    sm={8}
                    md={9}
                  >
                    <BoxUploadWrapper {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isDragAccept && (
                        <>
                          <AvatarSuccess variant="rounded">
                            <CheckTwoToneIcon />
                          </AvatarSuccess>
                          <Typography
                            sx={{
                              mt: 2
                            }}
                          >
                            {t('Drop the files to start uploading')}
                          </Typography>
                        </>
                      )}
                      {isDragReject && (
                        <>
                          <AvatarDanger variant="rounded">
                            <CloseTwoToneIcon />
                          </AvatarDanger>
                          <Typography
                            sx={{
                              mt: 2
                            }}
                          >
                            {t('You cannot upload these file types')}
                          </Typography>
                        </>
                      )}
                      {!isDragActive && (
                        <>
                          <AvatarWrapper variant="rounded">
                            <CloudUploadTwoToneIcon />
                          </AvatarWrapper>
                          <Typography
                            sx={{
                              mt: 2
                            }}
                          >
                            {t('Drag & drop files here')}
                          </Typography>
                        </>
                      )}
                    </BoxUploadWrapper>
                    {files.length > 0 && (
                      <>
                        <Alert
                          sx={{
                            py: 0,
                            mt: 2
                          }}
                          severity="success"
                        >
                          {t('You have uploaded')} <b>{files.length}</b>{' '}
                          {t('files')}!
                        </Alert>
                        <Divider
                          sx={{
                            mt: 2
                          }}
                        />
                        <List disablePadding component="div">
                          {files}
                        </List>
                      </>
                    )}
                  </Grid>
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
