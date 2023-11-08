import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';

const Money = ({ index, element, setValidElement, setValueElement,acceso }) => {
  const {
    label,
    placeholder,
    value,
    required,
    requiredAlert,
    minValue,
    maxValue,
    step,
    disabled
  } = element;
  console.log("Disabled Money" + disabled)
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [convertedMoney, setConvertedMoney] = useState(0);

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

  useEffect(() => {
    if (value) {
      const converted = +value * +step;
      setConvertedMoney(converted.toFixed(2));
    }
  }, [value]);

  return (
    <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
      {label}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        <Box sx={{ mt: 1, width: 148 }}>
          <TextField
            fullWidth
            label={minValue}
            placeholder={placeholder}
            value={value}
            onChange={(event) => handleChangeValue(event.target.value)}
            error={error}
            helperText={helperText}
            variant="outlined"
            size="small"
            disabled={!acceso}
          />
        </Box>
        <Box sx={{ mt: 1, width: 148 }}>
          <TextField
            fullWidth
            label={maxValue}
            value={convertedMoney}
            // onChange={(event) => handleChangeValue(event.target.value)}
            disabled
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Money;
