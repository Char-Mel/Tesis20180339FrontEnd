import { useEffect, useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';

const Address = ({ index, element, setValidElement, setValueElement,acceso }) => {
  const { label, placeholder, value, required, requiredAlert, disabled } =
    element;
    console.log("Disabled Address" + disabled)
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
    if (required && value === '') {
      setError(true);
      setValidElement(index, false);
      setHelperText('Campo obligatorio');
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
                <RoomIcon />
              </InputAdornment>
            )
          }}
          disabled={!acceso}
        />
      </Box>
    </Box>
  );
};

export default Address;
