import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const DateTime = ({ index, element, setValidElement, setValueElement,acceso }) => {
  const { label, placeholder, value, required, requiredAlert, disabled,dateFormat,hourFormat } =
    element;
    console.log("Disabled Datetime" + disabled)
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


    if (value !== null) {
      setValueElement(index, value);
    }
    if (required && value === null) {
      setError(true);
      setValidElement(index, false);
      setHelperText('Campo obligatorio');
    } else {
      setError(false);
      setValidElement(index, true);
      setHelperText('');
    }


  };

  return (
    <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
      {label}
      <Box sx={{ mt: 1, width: 300 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            sx={{ mt: -1, overflowY: 'hidden' }}
            components={['DatePicker']}
          >
            <DateTimePicker
              
              value={value}
              sx={{ width: 300 }}
              onChange={(value) => handleChangeValue(value)}
              placeholder={placeholder}
              error={error}
              format={`${dateFormat} ${hourFormat} A`}
              slots={{
                textField: (params) => (
                  <TextField
                    disabled={!acceso}
                    size="small"
                    placeholder={placeholder}
                    {...params}
                  />
                )
              }}
              disabled={!acceso}
            />
          </DemoContainer>
        </LocalizationProvider>
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
      </Box>
    </Box>
  );
};

export default DateTime;
