import { useEffect, useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { validateEmail } from './utils/validations';

const Email = ({ index, element, setValidElement, setValueElement,acceso}) => {
  const { label, placeholder, value, required, requiredAlert, disabled } =
    element;
    console.log("Disabled Email" + disabled)

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

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

  const handleChangeValue = (value) => {
    setValueElement(index, value);
    if (!validateEmail(value)) {
      setError(true);
      setValidElement(index, false);
      setHelperText('Correo electrónico inválido');
    } else {
      setError(false);
      setHelperText('');
      setValidElement(index, true);
    }
  };

  return (
    <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
      {label}
      <Box sx={{ mt: 1, width: 300 }}>
        <TextField
          fullWidth
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleChangeValue(event.target.value)}
          error={error}
          helperText={helperText}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            )
          }}
          disabled={!acceso}
        />
      </Box>
    </Box>
  );
};

export default Email;
