import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const Date = ({ index, element, setValidElement, setValueElement, acceso }) => {
  const { label, placeholder, value, required, requiredAlert, disabled, dateFormat, minValue, maxValue } =
    element;
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  console.log("Disable Date " + disabled)
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
    
    
    if (
      ((dayjs(value) >= dayjs(minValue)) && minValue !== '') 
    || ((dayjs(value) <= dayjs(maxValue)  )&& maxValue !== '') 
  || (maxValue === '' && minValue === '')) {
    
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
    }

    else {
      setError(true);
      setValidElement(index, false);
      
      const minValueFormatted = dayjs(minValue).format('YYYY-MM-DD');
      const maxValueFormatted = dayjs(maxValue).format('YYYY-MM-DD');

      if(minValue !== '' && maxValue === '')
      setHelperText(`Ingrese una fecha menor a ${minValueFormatted}`);
      if(maxValue !== '' && minValue ==='')
      setHelperText(`Ingrese una fecha mayor a ${maxValueFormatted}`);

      if(maxValue !== '' && minValue !=='')
      setHelperText(`Ingrese una fecha válida entre ${minValueFormatted} y ${maxValueFormatted}`);


    }
  }


  return (
    <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
      {label}
      <Box sx={{ mt: 1, width: 300 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            sx={{ mt: -1, overflowY: 'hidden' }}
            components={['DatePicker']}
          >
            <DatePicker
              value={value}
              inputFormat={dateFormat}
              onChange={(value) => handleChangeValue(value)}
              renderInput={(params) => (
                <TextField
                  size="small"
                  sx={{ width: 300 }}
                  placeholder={placeholder}
                  {...params}
                />
              )}
              error={error}
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

export default Date;
