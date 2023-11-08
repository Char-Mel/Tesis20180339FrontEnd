import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';

const Text = ({ index, element, setValidElement, setValueElement,acceso }) => {
  const {
    label,
    placeholder,
    value,
    required,
    minValue,
    maxValue,
    requiredAlert,
    disabled
  } = element;
  console.log("Disabled Text" + disabled)
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [minLength] = useState(minValue === '' ? 0 : +minValue);
  const [maxLength] = useState(maxValue === '' ? 1000 : +maxValue);

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
    if (required && value.length === 0) {
      setError(true);
      setValidElement(index, false);
      setHelperText('Campo obligatorio');
    } else if (value.length < minValue) {
      setError(true);
      setValidElement(index, false);
      setHelperText(`Longitud mínima del texto: ${minValue}`);
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
          InputProps={{
            inputProps: { minLength, maxLength }
          }}
          error={error}
          helperText={helperText}
          variant="outlined"
          size="small"
          disabled={!acceso}
        />
      </Box>
    </Box>
  );
};

export default Text;
