import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomNumberInput from '../Number';

const Number = ({ index, element, setValidElement, setValueElement, acceso }) => {
  console.log("GAAA")
  const {
    label,
    placeholder,
    value,
    required,
    requiredAlert,
    // minValue,
    numDigit,
    step,
    disabled
  } = element;
  
  console.log("Disable numero" +disabled)
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


  const FormatedValue=(value)=>{
    return String(value || 0).padStart(numDigit, '0') ;
  }

  const handleChangeValue = (value) => {
    console.log(value)
    
    if (value !== undefined) {
      setValueElement(index, value);
    }

    if (
      required &&
      (value === undefined || (value && value.toString().length === 0))
    ) {
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
        <CustomNumberInput
          error={error}
          helperText={helperText}
          
          value={acceso?value:FormatedValue(value)}
          placeholder={placeholder}
          step={step}
          disabled={!acceso}

          onChange={(event, value) => handleChangeValue(value)}


        />
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

export default Number;
