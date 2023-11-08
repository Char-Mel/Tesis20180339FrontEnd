import { Box } from '@mui/material';
import { backendUrl } from 'src/config';
import defaultImage from '../../assets/default-header.png';
import { useEffect } from 'react';

const Header = ({ index, element, setValidElement }) => {
  const { image, label } = element;

  useEffect(() => {
    setValidElement(index, true);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {image.filename.length ? (
        <img
          src={`${backendUrl}/files/${image.filename}`}
          alt="Default"
          height={80}
        />
      ) : (
        <img src={defaultImage} alt="Default" height={80} />
      )}
      <Box sx={{ fontSize: '30px', fontWeight: '700' }}>{label}</Box>
    </Box>
  );
};

export default Header;
