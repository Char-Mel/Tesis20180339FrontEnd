import { Box } from '@mui/material';
import { useEffect } from 'react';

const SubHeader = ({ index, element, setValidElement }) => {
  const { label } = element;

  useEffect(() => {
    setValidElement(index, true);
  }, []);

  return (
    <Box sx={{ py: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
      <Box sx={{ fontSize: '20px', fontWeight: '600' }}>{label}</Box>
    </Box>
  );
};

export default SubHeader;
