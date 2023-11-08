import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import defaultImage from '../../assets/default-header.png';
import SettingsIcon from '@mui/icons-material/Settings';
import FileUploader from '../FileUploader';

import customAxios from 'src/utils/customAxios';
import { backendUrl } from 'src/config';

const HeaderElement = ({ element, index, updateElement }) => {
  const { image, label } = element;
  const [newElement, setNewElement] = useState({ ...element });
  const [open, setOpen] = useState(false);

  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone({
    maxFiles: 1
  });

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSaveElement = async () => {
    let { filename, originalname } = newElement.image;

    if (acceptedFiles.length) {
      const imageFile = new FormData();
      imageFile.append('file', acceptedFiles[0]);

      const responseFile = await customAxios.post(`/file/upload`, imageFile);

      const { data } = responseFile;

      filename = data.filename;
      originalname = data.originalname;
    }

    setNewElement((oldElement) => {
      const newElement = {
        ...oldElement,
        image: {
          filename,
          originalname
        }
      };
      updateElement(newElement, index);
      return newElement;
    });

    handleCloseModal();
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        {image.filename.length ? (
          <img
            src={`${backendUrl}/files/${image.filename}`}
            alt="Default"
            height={80}
          />
        ) : (
          <img src={defaultImage} alt="Default" height={80} />
        )}
        <Box sx={{ fontSize: '30px', fontWeight: '700' }}>{label}</Box>
        <Box sx={{ marginLeft: 'auto' }} onClick={handleOpenModal}>
          <IconButton size="medium">
            <SettingsIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleCloseModal}>
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            Propiedades
          </Typography>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            p: 2
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              justifyContent="flex-end"
              textAlign={{ sm: 'right' }}
            >
              <Box
                pr={3}
                sx={{
                  pt: 0,
                  pb: { xs: 1, md: 0 }
                }}
                alignSelf="center"
              >
                <b>Valor del texto</b>
              </Box>
            </Grid>
            <Grid
              sx={{
                mb: 1
              }}
              item
              xs={12}
              sm={8}
              md={9}
            >
              <TextField
                fullWidth
                name="name"
                placeholder="Título"
                onChange={(event) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    label: event.target.value
                  }));
                }}
                value={newElement.label}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box
                pr={3}
                sx={{
                  pb: { xs: 1, md: 0 }
                }}
              >
                <b>Subir imagen</b>
              </Box>
            </Grid>
            <Grid
              sx={{
                mb: 0
              }}
              item
              xs={12}
              sm={8}
              md={9}
            >
              <FileUploader
                acceptedFiles={acceptedFiles}
                isDragActive={isDragActive}
                isDragAccept={isDragAccept}
                isDragReject={isDragReject}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            py: 2
          }}
        >
          <Button color="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleSaveElement} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HeaderElement;
