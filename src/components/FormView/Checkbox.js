import { useEffect } from 'react';
import { Box, FormControlLabel, Checkbox } from '@mui/material';

const CheckboxElement = ({
  index,
  element,
  setValidElement,
  setValueElement,
  acceso
}) => {
  const { label, value, disabled } = element;

  console.log("Disabled Checkbox" + disabled)

  useEffect(() => {
    setValidElement(index, true);
  }, []);

  const handleChangeValue = (value) => {
    setValueElement(index, value);
  };

  return (
    <Box sx={{ fontSize: '16px', fontWeight: '500' }}>
      {label}
      <Box sx={{ mt: 1, width: 300 }}>
        <FormControlLabel
          checked={value}
          onChange={(event) => handleChangeValue(event.target.checked)}
          control={<Checkbox defaultChecked />}
          disabled={!acceso}
        />
      </Box>
    </Box>
  );
};

export default CheckboxElement;
