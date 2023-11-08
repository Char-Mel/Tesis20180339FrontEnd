import {
  Alert,
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';

const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    width: 300px;
    padding: ${theme.spacing(2)};
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

const BoxUploadWrapperError = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    width: 300px;
    padding: ${theme.spacing(2)};
    background: ${theme.colors.alpha.black[5]};
    border: 1px dashed #FF1943;
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

const FileUploader = ({
  acceptedFiles,
  isDragActive,
  isDragAccept,
  isDragReject,
  getRootProps,
  getInputProps,
  error
}) => {
  const files = acceptedFiles.map((file, index) => (
    <ListItem disableGutters component="div" key={index}>
      <ListItemText primary={file.name} />
      <b>{file.size} bytes</b>
      <Divider />
    </ListItem>
  ));

  return (
    <Box sx={{ width: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
      {error ? (
        <BoxUploadWrapperError {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragAccept && (
            <>
              <AvatarSuccess variant="rounded">
                <CheckTwoToneIcon />
              </AvatarSuccess>
              <Typography
                sx={{
                  mt: 0
                }}
              >
                Suelte el archivo para comenzar a cargar
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
                  mt: 0
                }}
              >
                No puede cargar este tipo de archivo
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
                  mt: 0
                }}
              >
                Arrastra y suelte el archivo aquí
              </Typography>
            </>
          )}
        </BoxUploadWrapperError>
      ) : (
        <BoxUploadWrapper {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragAccept && (
            <>
              <AvatarSuccess variant="rounded">
                <CheckTwoToneIcon />
              </AvatarSuccess>
              <Typography
                sx={{
                  mt: 0
                }}
              >
                Suelte el archivo para comenzar a cargar
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
                  mt: 0
                }}
              >
                No puede cargar este tipo de archivo
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
                  mt: 0
                }}
              >
                Arrastra y suelte el archivo aquí
              </Typography>
            </>
          )}
        </BoxUploadWrapper>
      )}

      <Box>
        {files.length > 0 && (
          <>
            <Alert
              sx={{
                py: 0,
                mt: 1
              }}
              severity="success"
            >
              Has cargado <b>{files.length}</b> archivo!
            </Alert>
            <Divider
              sx={{
                mt: 1
              }}
            />
            <List disablePadding component="div">
              {files}
            </List>
          </>
        )}
      </Box>
    </Box>
  );
};

export default FileUploader;
