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
  TextField,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import FileUploader from '../FileUploader';

const FileElement = ({ element, index, updateElement }) => {
  const { label } = element;
  const [newElement, setNewElement] = useState({ ...element });
  const [open, setOpen] = useState(false);

  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone();

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSaveElement = async () => {
    setNewElement((oldElement) => {
      const newElement = { ...oldElement };
      updateElement(newElement, index);
      return newElement;
    });

    handleCloseModal();
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: 1 }}>
        <Box sx={{ fontSize: '16px', fontWeight: '500', width: 1 }}>
          {label}
          <Box sx={{ mt: 1, width: 1 }}>
            <FileUploader
              acceptedFiles={acceptedFiles}
              isDragActive={isDragActive}
              isDragAccept={isDragAccept}
              isDragReject={isDragReject}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
            />
          </Box>
        </Box>
        <Box sx={{ marginLeft: 'auto' }} onClick={handleOpenModal}>
          <IconButton aria-label="edit" size="medium">
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
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              justifyContent="flex-end"
              textAlign={{ sm: 'right' }}
            />
            <Grid item xs={12} sm={8} md={9}>
              <FormControlLabel
                required
                control={<Checkbox defaultChecked />}
                label="Obligatorio"
                value={newElement.required}
                onChange={(event) => {
                  setNewElement((oldElement) => ({
                    ...oldElement,
                    required: event.target.checked
                  }));
                }}
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

export default FileElement;
