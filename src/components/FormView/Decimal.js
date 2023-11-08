import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
// import CustomNumberInput from '../Number';

const Decimal = ({ index, element, setValidElement, setValueElement, acceso }) => {


  const {
    label,
    placeholder,
    value,
    required,
    requiredAlert,
    // minValue,
    // maxValue,
    numDecimals,
    step,
    disabled
  } = element;

  console.log("Disable numero" + disabled)
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

  const FormatedValue = (value, decimalPlaces = numDecimals ||  2) => {
    if (!Number.isNaN(value)) {
      const fixedValue = parseFloat(value).toFixed(decimalPlaces);
      return fixedValue;
    }
    return "0.00"; // Valor predeterminado si no se proporciona un número válido
  };


  const handleChangeValue = (value) => {

    console.log(parseFloat(value))
    if (value !== undefined) {
      setValueElement(index, parseFloat(value));
    }

    if (
      required &&
      (value === undefined || (value && value.toString().length === 0))
    ) {
      // setError(true);
      setValidElement(index, false);
      setHelperText('Campo obligatorio');
    } else {
      // setError(false);
      setValidElement(index, true);
      setHelperText('');
    }
  };

  return (
    <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
      {label}
      <Box sx={{ mt: 1, width: 300 }}>
        <input
          error={error}
          type='number'
          name='value'
          value={acceso ? value : FormatedValue(value)}
          placeholder={placeholder}
          step={step}

          disabled={!acceso}
          onChange={(event) => handleChangeValue(event.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            fontWeight: '500',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
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

export default Decimal;
