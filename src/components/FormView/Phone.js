import { useEffect, useState } from 'react';
import { Box} from '@mui/material';

import { MuiTelInput,matchIsValidTel } from 'mui-tel-input'

const Phone = ({ index, element, setValidElement, setValueElement, acceso }) => {
  const { label, placeholder, value, required, requiredAlert, disabled, codPais } =
    element;
    console.log("TELEFONITO")
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  console.log("Disables Phone" + disabled)
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

  const handleChangeValue = (value,info) => {
    
    if (info.countryCode === codPais){
    setValueElement(index, value);
    console.log(value)
    if (!matchIsValidTel(value)) {
      setError(true);
      setValidElement(index, false);
      setHelperText('Número telefónico inválido');
    } else {

      setError(false);
      setHelperText('');
      setValidElement(index, true);
    }
  }
  else{
    setValueElement(index,'')
  }
  };

  return (
    <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
      {label}
      <Box sx={{ mt: 1, width: 300 }}>
        <MuiTelInput
          fullWidth
          error={error}
          placeholder={placeholder}
          onChange={(value,info) => handleChangeValue(value,info)}
          defaultCountry={codPais}
          value={value}
          variant="outlined"
          size="small"
          onlyCountries={[codPais]}
          disabled={!acceso}
          langOfCountryName={"es"}
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
    </Box>
  );
};

export default Phone;
