import { Box } from '@mui/material';
import { useEffect } from 'react';

const Separator = ({ index, element, setValidElement }) => {
  const { margin } = element;
  useEffect(() => {
    setValidElement(index, true);
  }, []);
  return <Box sx={{ py: parseInt(`${Math.ceil(margin / 2)}`) }} />;
};

export default Separator;
