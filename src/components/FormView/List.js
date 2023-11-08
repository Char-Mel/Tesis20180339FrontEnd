import { useEffect, useState } from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';

const List = ({ index, element, setValidElement, setValueElement,acceso }) => {
  const {
    label,
    placeholder,
    required,
    options,
    requiredAlert,
    disabled,
    value,
  } = element;
  console.log("Disabled list "+ disabled)
  const [inputSelected, setInputSelected] = useState('');
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

  useEffect(() => {
    if (disabled) return;
    if (required && inputSelected.length === 0) {
      setError(true);
      setValidElement(index, false);
      setHelperText('Campo obligatorio');
    } else {
      setValueElement(index, inputSelected);
      setError(false);
      setHelperText('');
      setValidElement(index, true);
    }
  }, [inputSelected]);

  return (
    <Box
      sx={{
        fontSize: '16px',
        fontWeight: '500',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {label}
      {!acceso ? (
        <TextField
          sx={{ mt: 1, width: 300 }}
          value={value}
          variant="outlined"
          size="small"
          disabled={!acceso}
        />
      ) : (
        <Box sx={{ mt: 1, width: 300 }}>
          <Autocomplete
            options={options}
            error={error}
            helperText={helperText}
            sx={{ width: 300 }}
            size="small"
            getOptionLabel={(option) => option.label}
            renderInput={(params) => {
              setInputSelected(params.inputProps.value);
              return <TextField {...params} placeholder={placeholder} />;
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
      )}
    </Box>
  );
};

export default List;
