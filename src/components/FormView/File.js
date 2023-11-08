import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import FileUploader from '../FileUploader';
import customAxios from 'src/utils/customAxios';
import { saveAs } from 'file-saver';
import { backendUrl } from 'src/config';

const File = ({ index, element, setValidElement, setValueElement,acceso }) => {
  const { label, required, requiredAlert, value, disabled } = element;
  console.log("Disabled File" + disabled)
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

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

  useEffect(() => {
    setValidElement(index, !required);
  }, []);

  useEffect(() => {
    if (requiredAlert) {
      setError(true);
      setHelperText('Campo obligatorio');
    } else {
      setError(false);
      setHelperText('');
    }
  }, [requiredAlert]);

  const downloadFile = async () => {
    const { filename, originalname } = value;
    saveAs(`${backendUrl}/files/${filename}`, originalname);
  };

  const updateAcceptedFiles = async () => {
    const imageFile = new FormData();
    imageFile.append('file', acceptedFiles[0]);

    const responseFile = await customAxios.post(`/file/upload`, imageFile);

    const {
      data: { filename, originalname }
    } = responseFile;
    setValueElement(index, {
      filename,
      originalname
    });
  };

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setValidElement(index, true);
      updateAcceptedFiles();
      setError(false);
      setHelperText('');
    } else {
      setValidElement(index, false);
      setError(true);
      setHelperText('Campo obligatorio');
    }
  }, [acceptedFiles]);

  return (
    <Box
      sx={{
        fontSize: '16px',
        fontWeight: '500',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {label}
      {!acceso ? (
        <Button
          sx={{
            mt: 1,
            py: 1,
            px: 2,
            width: '180px'
          }}
          variant="contained"
          size="small"
          onClick={downloadFile}
          disabled={acceso}
        >
          Descargar archivo
        </Button>
      ) : (
        <>
          <Box sx={{ mt: 1, width: 1 }}>
            <FileUploader
              acceptedFiles={acceptedFiles}
              isDragActive={isDragActive}
              isDragAccept={isDragAccept}
              isDragReject={isDragReject}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              error={error}
            />
          </Box>
          <Box
            sx={{
              color: '#FF1943',
              fontSize: '13px',
              fontWeight: 'bold',
              marginLeft: '8px',
              marginTop: '4px',
              lineHeight: '1.66'
            }}
          >
            {helperText}
          </Box>
        </>
      )}
    </Box>
  );
};

export default File;
