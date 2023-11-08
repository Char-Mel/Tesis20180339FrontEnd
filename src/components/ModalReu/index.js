import React from 'react';
import { Typography,Avatar, styled} from '@mui/material';

const DynamicConfirmModal = ({ titulo, icono}) => {

  const AvatarDefined = styled(Avatar)(
    ({ theme }) => `
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
  );

  return (
    
    <>
        <AvatarDefined>{icono}</AvatarDefined>

        <Typography align="center" sx={{ py: 4, px: 6 }} variant="h3">
          {titulo}
        </Typography>
      
    </>
  );
};

export default DynamicConfirmModal;
