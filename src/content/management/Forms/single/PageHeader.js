import { Box, Button, Typography } from '@mui/material';

function PageHeader({ name, submitForm,acceso }) {
  return (
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
      
      {acceso === true ? (
        <Button
          sx={{
            mt: 0,
            py: 1,
            px: 2
          }}
          variant="contained"
          size="small"
          onClick={submitForm}
        >
          Enviar
        </Button>
      ) : null}


    </Box>
  );
}

export default PageHeader;
